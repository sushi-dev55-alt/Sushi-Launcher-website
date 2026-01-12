import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Layout } from './components/Layout'
import { Landing } from './pages/Landing'
import { Releases } from './pages/Releases'
import { Credits } from './pages/Credits'
import { Donate } from './pages/Donate'
import * as Preview from './pages/Preview'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/preview" element={<Preview.Preview />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  )
}

export default App
