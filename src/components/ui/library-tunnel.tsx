import { useEffect, useRef } from 'react'
import {
    AdditiveBlending,
    DoubleSide,
    InstancedBufferAttribute,
    InstancedBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    TextureLoader,
    TorusGeometry,
    Vector2,
    WebGLRenderer,
} from 'three'

// 200 game covers packed into one image: 20 columns x 10 rows, 160x240 px each.
// Phones load the half-size copy.
const ATLAS_URL = '/library-atlas.webp'
const ATLAS_URL_SMALL = '/library-atlas-mobile.webp'
const ATLAS_COLS = 20
const ATLAS_ROWS = 10
const ATLAS_COUNT = ATLAS_COLS * ATLAS_ROWS

const TILE_W = 1
const TILE_H = 1.5
const GAP = 0.14
const RING_COUNT = 6
const MAX_BOOST = 30
const WARP_BOOST = 26

const vertexShader = /* glsl */ `
uniform float uTravel;
uniform float uTime;
uniform float uLength;
uniform float uRadius;
uniform float uStretch;
uniform vec2 uBend;

attribute float aAngle;
attribute float aZ;
attribute float aTile;
attribute float aSeed;

varying vec2 vUv;
varying float vDepth;
varying float vTile;
varying float vSeed;
varying float vPop;

void main() {
    float z = mod(aZ + uTravel, uLength) - uLength + 4.0;

    // A few covers slide out of the wall and glow, like a game being selected
    float pop = 0.0;
    if (aSeed > 0.95) {
        float cycle = fract(uTime * 0.07 + aSeed * 37.0);
        pop = smoothstep(0.0, 0.06, cycle) * (1.0 - smoothstep(0.16, 0.26, cycle));
    }

    float c = cos(aAngle);
    float s = sin(aAngle);
    float flip = c < 0.0 ? -1.0 : 1.0; // keep covers upright on both side walls
    vec3 up = vec3(-s, c, 0.0) * flip;
    vec3 right = vec3(0.0, 0.0, flip);
    float r = uRadius - pop * 0.55;
    float grow = 1.0 + pop * 0.15;

    vec3 p = vec3(c * r, s * r, z)
        + right * position.x * ${TILE_W.toFixed(2)} * grow * (1.0 + uStretch)
        + up * position.y * ${TILE_H.toFixed(2)} * grow;

    float d = max(0.0, -p.z);
    p.xy += uBend * d * d * 0.0032;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    vUv = uv;
    vTile = aTile;
    vSeed = aSeed;
    vPop = pop;
    gl_Position = projectionMatrix * mv;
}
`

const fragmentShader = /* glsl */ `
uniform sampler2D uAtlas;
uniform float uReady;
uniform float uTime;
uniform vec2 uMouse;
uniform float uSpot;
uniform float uMouseActive;
uniform float uFogNear;
uniform float uFogFar;
uniform float uDim;

varying vec2 vUv;
varying float vDepth;
varying float vTile;
varying float vSeed;
varying float vPop;

const vec2 GRID = vec2(${ATLAS_COLS.toFixed(1)}, ${ATLAS_ROWS.toFixed(1)});
const vec3 PINK = vec3(1.0, 0.302, 0.616);
const vec3 GROUND = vec3(0.039, 0.039, 0.059);

float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
    vec2 p = (vUv - 0.5) * vec2(1.0, 1.5);
    float sd = roundedBox(p, vec2(0.5, 0.75), 0.07);
    if (sd > 0.0) discard;

    // vTile arrives interpolated (e.g. 39.9999 instead of 40), which made covers in the
    // first atlas column flicker between two images. Round it before picking the cell.
    float tile = floor(vTile + 0.5);
    float row = floor((tile + 0.5) / GRID.x);
    vec2 cell = vec2(tile - row * GRID.x, row);
    vec2 inner = vUv * 0.96 + 0.02;
    vec2 auv = vec2((cell.x + inner.x) / GRID.x, 1.0 - (cell.y + 1.0 - inner.y) / GRID.y);
    vec3 art = texture2D(uAtlas, auv).rgb;
    float lum = dot(art, vec3(0.299, 0.587, 0.114));
    art = mix(vec3(lum), art, 0.8) * vec3(1.0, 0.84, 0.94);

    // Loading skeleton until the cover image arrives
    float shimmer = 0.5 + 0.5 * sin(uTime * 2.4 + vSeed * 40.0);
    vec3 skeleton = vec3(0.075, 0.063, 0.094) + PINK * 0.05 * shimmer;
    vec3 col = mix(skeleton, art * 0.6, uReady);

    float md = length(gl_FragCoord.xy - uMouse) / uSpot;
    float spot = exp(-md * md) * uMouseActive;
    col *= 1.0 + spot * 1.2 + vPop * 0.55;

    float edge = smoothstep(-0.03, -0.004, sd);
    float frame = clamp(0.22 + vPop * 1.2 + spot * 0.8, 0.0, 1.0);
    col = mix(col, PINK * (1.0 + vPop * 0.6), edge * frame);

    float fog = smoothstep(uFogNear, uFogFar, vDepth);
    col = mix(col, GROUND, fog);
    gl_FragColor = vec4(mix(GROUND, col, uDim), 1.0);
}
`

const VIGNETTE = [
    'radial-gradient(ellipse 50% 42% at 50% 45%, rgba(10,10,15,0.62) 0%, rgba(10,10,15,0.25) 55%, rgba(10,10,15,0) 100%)',
    'linear-gradient(to bottom, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0) 16%, rgba(10,10,15,0) 78%, rgba(10,10,15,0.75) 100%)',
].join(',')

const mod = (a: number, n: number) => ((a % n) + n) % n
const smoothstep = (e0: number, e1: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)
}

interface LibraryTunnelProps {
    /** Dimmer and slower, for pages where the content needs the attention */
    dimmed?: boolean
}

export function LibraryTunnel({ dimmed = false }: LibraryTunnelProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const dimRef = useRef(dimmed)

    useEffect(() => {
        dimRef.current = dimmed
    }, [dimmed])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const small = window.innerWidth < 768

        let renderer: WebGLRenderer
        try {
            renderer = new WebGLRenderer({ antialias: !small, powerPreference: 'high-performance' })
        } catch {
            return // no WebGL: the plain dark background stays
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.5))
        renderer.setClearColor(0x0a0a0f, 1)
        renderer.domElement.className = 'absolute inset-0 block w-full h-full'
        container.prepend(renderer.domElement)

        const scene = new Scene()
        const camera = new PerspectiveCamera(70, 1, 0.1, 120)

        const radius = small ? 3.6 : 4.6
        const fogNear = small ? 6 : 8
        const fogFar = small ? 36 : 46
        const perRing = Math.floor((Math.PI * 2 * radius) / (TILE_H + GAP))
        const rowStep = TILE_W + GAP
        const rows = Math.round((small ? 48 : 64) / rowStep)
        const length = rows * rowStep

        let seed = 1337
        const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
        const shuffled = () => {
            const deck = Array.from({ length: ATLAS_COUNT }, (_, i) => i)
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(rand() * (i + 1))
                const swap = deck[i]
                deck[i] = deck[j]
                deck[j] = swap
            }
            return deck
        }

        // Deal covers from a shuffled deck so the same game never shows up within a few rings
        const recent: number[] = []
        let deck: number[] = []
        const nextTile = () => {
            for (let tries = 0; tries < ATLAS_COUNT; tries++) {
                if (deck.length === 0) deck = shuffled()
                const tile = deck.pop() as number
                if (!recent.includes(tile)) {
                    recent.push(tile)
                    if (recent.length > perRing * 4) recent.shift()
                    return tile
                }
                deck.unshift(tile)
            }
            return Math.floor(rand() * ATLAS_COUNT)
        }

        // Tunnel walls: one instanced draw call for every cover
        const angles: number[] = []
        const zs: number[] = []
        const tiles: number[] = []
        const seeds: number[] = []
        for (let row = 0; row < rows; row++) {
            const offset = row % 2 ? Math.PI / perRing : 0
            for (let i = 0; i < perRing; i++) {
                if (rand() < 0.05) continue
                angles.push((i / perRing) * Math.PI * 2 + offset)
                zs.push(row * rowStep)
                tiles.push(nextTile())
                seeds.push(rand())
            }
        }

        const plane = new PlaneGeometry(1, 1)
        const geometry = new InstancedBufferGeometry()
        geometry.setIndex(plane.getIndex())
        geometry.setAttribute('position', plane.getAttribute('position'))
        geometry.setAttribute('uv', plane.getAttribute('uv'))
        geometry.setAttribute('aAngle', new InstancedBufferAttribute(new Float32Array(angles), 1))
        geometry.setAttribute('aZ', new InstancedBufferAttribute(new Float32Array(zs), 1))
        geometry.setAttribute('aTile', new InstancedBufferAttribute(new Float32Array(tiles), 1))
        geometry.setAttribute('aSeed', new InstancedBufferAttribute(new Float32Array(seeds), 1))
        geometry.instanceCount = angles.length

        let disposed = false
        let readyTarget = 0
        let needsRender = true

        const texture = new TextureLoader().load(small ? ATLAS_URL_SMALL : ATLAS_URL, () => {
            if (disposed) return
            readyTarget = 1
            needsRender = true
        })
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())

        const uniforms = {
            uAtlas: { value: texture },
            uReady: { value: 0 },
            uTime: { value: 0 },
            uTravel: { value: 0 },
            uLength: { value: length },
            uRadius: { value: radius },
            uStretch: { value: 0 },
            uBend: { value: new Vector2() },
            uMouse: { value: new Vector2(-9999, -9999) },
            uSpot: { value: 200 },
            uMouseActive: { value: 0 },
            uFogNear: { value: fogNear },
            uFogFar: { value: fogFar },
            uDim: { value: dimRef.current ? 0.4 : 1 },
        }

        const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, side: DoubleSide })
        const tunnel = new Mesh(geometry, material)
        tunnel.frustumCulled = false
        scene.add(tunnel)

        // Neon rings rushing past
        const ringCore = new TorusGeometry(radius - 0.3, 0.028, 6, 128)
        const ringHalo = new TorusGeometry(radius - 0.3, 0.2, 8, 128)
        const rings = Array.from({ length: RING_COUNT }, (_, i) => {
            const coreMat = new MeshBasicMaterial({ color: 0xff4d9d, transparent: true, blending: AdditiveBlending, depthWrite: false })
            const haloMat = new MeshBasicMaterial({ color: 0xff4d9d, transparent: true, blending: AdditiveBlending, depthWrite: false })
            const core = new Mesh(ringCore, coreMat)
            const halo = new Mesh(ringHalo, haloMat)
            scene.add(core, halo)
            return { core, halo, coreMat, haloMat, base: (i / RING_COUNT) * length }
        })

        // Input
        const pointer = { x: -9999, y: -9999, nx: 0, ny: 0, lastMove: -Infinity }
        const bend = new Vector2()
        let boost = 0
        let warpHover = false
        let travel = 0
        let time = 0
        let lastScroll = window.scrollY
        let viewH = 1

        const onPointerMove = (e: PointerEvent) => {
            pointer.x = e.clientX
            pointer.y = e.clientY
            pointer.nx = (e.clientX / window.innerWidth) * 2 - 1
            pointer.ny = (e.clientY / window.innerHeight) * 2 - 1
            pointer.lastMove = performance.now()
            needsRender = true
        }
        // Any element marked data-warp (the hero Download button) sends the tunnel to warp speed
        const onPointerOver = (e: PointerEvent) => {
            warpHover = e.target instanceof Element && e.target.closest('[data-warp]') !== null
        }
        const onPointerLeavePage = () => {
            warpHover = false
        }
        const onScroll = () => {
            const y = window.scrollY
            boost = Math.min(MAX_BOOST, boost + Math.abs(y - lastScroll) * 0.12)
            lastScroll = y
        }
        const onPointerDown = () => {
            boost = Math.min(MAX_BOOST, boost + 14)
        }

        const resize = () => {
            const w = container.clientWidth || window.innerWidth
            const h = container.clientHeight || window.innerHeight
            viewH = h
            renderer.setSize(w, h, false)
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            uniforms.uSpot.value = (small ? 140 : 210) * renderer.getPixelRatio()
            needsRender = true
        }
        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(container)

        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('pointerover', onPointerOver, { passive: true })
        window.addEventListener('pointerdown', onPointerDown, { passive: true })
        window.addEventListener('scroll', onScroll, { passive: true })
        document.documentElement.addEventListener('pointerleave', onPointerLeavePage)

        let raf = 0
        let last = performance.now()

        const tick = (now: number) => {
            raf = requestAnimationFrame(tick)
            const dt = Math.min(0.05, (now - last) / 1000)
            last = now
            const k = 1 - Math.pow(0.001, dt) // frame-rate independent easing

            const dimTarget = dimRef.current ? 0.4 : 1
            const mouseActive = now - pointer.lastMove < 2500 ? 1 : 0
            const settling =
                Math.abs(uniforms.uDim.value - dimTarget) > 0.002 ||
                Math.abs(uniforms.uReady.value - readyTarget) > 0.002 ||
                Math.abs(uniforms.uMouseActive.value - mouseActive) > 0.002

            uniforms.uDim.value += (dimTarget - uniforms.uDim.value) * k * 0.5
            uniforms.uReady.value += (readyTarget - uniforms.uReady.value) * k * 0.35
            uniforms.uMouseActive.value += (mouseActive - uniforms.uMouseActive.value) * k * 0.4
            const pr = renderer.getPixelRatio()
            uniforms.uMouse.value.set(pointer.x * pr, (viewH - pointer.y) * pr)

            if (!reduceMotion) {
                time += dt
                boost += ((warpHover ? WARP_BOOST : 0) - boost) * k * 0.25
                // Wrapped so the number never grows large enough to lose precision on long visits
                travel = mod(travel + ((dimRef.current ? 0.9 : 2.4) + boost) * dt, length)

                // Steer toward the cursor; drift on its own when nobody is pointing
                const tx = mouseActive ? pointer.nx : Math.sin(time * 0.23) * 0.35
                const ty = mouseActive ? -pointer.ny : Math.cos(time * 0.17) * 0.25
                bend.x += (tx - bend.x) * k * 0.12
                bend.y += (ty - bend.y) * k * 0.12

                camera.rotation.set(bend.y * 0.04, -bend.x * 0.06, Math.sin(time * 0.11) * 0.04)
                camera.fov += (70 + Math.min(boost, MAX_BOOST) * 0.6 - camera.fov) * k * 0.3
                camera.updateProjectionMatrix()

                uniforms.uTime.value = time
                uniforms.uTravel.value = travel
                // Kept below the gap between rows so stretched covers never overlap
                uniforms.uStretch.value = Math.min(0.12, boost * 0.006)
                uniforms.uBend.value.copy(bend)
                needsRender = true
            }

            if (!needsRender && !settling) return
            needsRender = false

            for (const ring of rings) {
                const z = mod(ring.base + travel, length) - length + 4
                const depth = -z
                const d = Math.max(0, depth)
                // Only show a ring once it's wider than the hero text, so it never cuts through the copy
                const fade = (1 - smoothstep(radius * 1.4, radius * 1.85, depth)) * smoothstep(0.5, 3, depth)
                const x = bend.x * d * d * 0.0032
                const y = bend.y * d * d * 0.0032
                ring.core.position.set(x, y, z)
                ring.halo.position.set(x, y, z)
                ring.coreMat.opacity = 0.95 * fade * uniforms.uDim.value
                ring.haloMat.opacity = 0.1 * fade * uniforms.uDim.value
            }

            renderer.render(scene, camera)
        }
        raf = requestAnimationFrame(tick)

        return () => {
            disposed = true
            cancelAnimationFrame(raf)
            ro.disconnect()
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerover', onPointerOver)
            window.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('scroll', onScroll)
            document.documentElement.removeEventListener('pointerleave', onPointerLeavePage)
            geometry.dispose()
            plane.dispose()
            material.dispose()
            texture.dispose()
            ringCore.dispose()
            ringHalo.dispose()
            rings.forEach((ring) => {
                ring.coreMat.dispose()
                ring.haloMat.dispose()
            })
            renderer.forceContextLoss()
            renderer.dispose()
            renderer.domElement.remove()
        }
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-[#0a0a0f]">
            <div className="absolute inset-0" style={{ background: VIGNETTE }} />
        </div>
    )
}
