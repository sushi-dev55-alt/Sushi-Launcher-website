import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
    username: string
    testimonial: string
    rating?: number
    image?: string
}

const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
    ({ username, testimonial, rating = 5, image, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden rounded-2xl border border-pink-500/10 bg-[#12121a]/80 backdrop-blur-md p-6 transition-all hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(255,77,157,0.1)] md:p-8 group",
                    className
                )}
                {...props}
            >
                <div className="absolute right-6 top-6 text-6xl font-serif text-pink-500/10 group-hover:text-pink-500/20 transition-colors">
                    "
                </div>

                <div className="flex flex-col gap-4 justify-between h-full">
                    {rating > 0 && (
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    size={16}
                                    className={cn(
                                        index < rating
                                            ? "fill-pink-500 text-pink-500"
                                            : "fill-gray-800 text-gray-800"
                                    )}
                                />
                            ))}
                        </div>
                    )}

                    <p className="text-pretty text-base text-gray-300 group-hover:text-white transition-colors">
                        {testimonial}
                    </p>

                    <div className="flex items-center gap-4 justify-start mt-2">
                        <div className="flex items-center gap-3">
                            <Avatar className="border border-pink-500/20">
                                <AvatarImage src={image} alt={username} />
                                <AvatarFallback>{username[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <h3 className="font-bold text-white tracking-wide">{username}</h3>
                                <p className="text-xs text-pink-400/80 font-medium">
                                    Verified User
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)
Testimonial.displayName = "Testimonial"

export { Testimonial }
