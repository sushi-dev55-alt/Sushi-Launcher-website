import { useState, useEffect } from 'react'
import { Testimonial } from '@/components/ui/testimonial-card'
import { GradientButton } from '@/components/ui/gradient-button'
import { MessageSquare, Star, X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Review {
    username: string
    testimonial: string
    rating: number
    image: string
}

export function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        rating: 5,
        review: ''
    })

    useEffect(() => {
        // Fetch reviews from the public JSON file
        fetch('/reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error("Failed to load reviews:", err))
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.username || !formData.review) return

        // In a real app, this would POST to a backend
        // For now, we simulate success and show the user what happened

        // Construct the new review object
        const newReview: Review = {
            username: formData.username,
            rating: formData.rating,
            image: "/discord-logo.png",
            testimonial: formData.review
        }

        // Optimistically update UI
        setReviews([newReview, ...reviews])
        setIsSubmitted(true)

        // Reset form after delay
        setTimeout(() => {
            setIsFormOpen(false)
            setIsSubmitted(false)
            setFormData({ username: '', rating: 5, review: '' })
        }, 2000)
    }

    return (
        <div className="container mx-auto px-4 py-20 max-w-6xl">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="font-display font-black text-5xl mb-4 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">Community Reviews</h1>
                <p className="text-gray-400 text-lg mb-8">See what others are saying about Sushi Launcher</p>

                <GradientButton
                    title="Submit a Review"
                    icon={<MessageSquare className="w-5 h-5" />}
                    onClick={() => setIsFormOpen(true)}
                    gradientFrom="#ff4d9d"
                    gradientTo="#ff8dc7"
                    className="mx-auto w-[200px]"
                />
            </div>

            {/* Submit Review Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-[#12121a] border border-pink-500/20 rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(255,77,157,0.15)] animate-in zoom-in-95 duration-300 overflow-hidden">

                        {/* Background Glow */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in">
                                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Review Submitted!</h2>
                                <p className="text-gray-400">Thanks for your feedback, {formData.username}!</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="font-display font-bold text-2xl mb-1 text-white">Write a Review</h2>
                                <p className="text-sm text-gray-500 mb-6">Share your experience with the community</p>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Discord Username</label>
                                        <div className="relative group">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-500 transition-colors">@</span>
                                            <input
                                                type="text"
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
                                                placeholder="username"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Rating</label>
                                        <div className="flex items-center justify-between bg-[#0a0a0f] border border-white/10 rounded-xl p-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, rating: star })}
                                                    className="focus:outline-none transition-transform hover:scale-110 p-1"
                                                >
                                                    <Star
                                                        className={cn(
                                                            "w-7 h-7 transition-all duration-200",
                                                            star <= formData.rating
                                                                ? "fill-pink-500 text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                                                                : "fill-transparent text-gray-700"
                                                        )}
                                                    />
                                                </button>
                                            ))}
                                            <span className="text-sm font-bold text-pink-500 ml-2 min-w-[30px] text-right">{formData.rating}/5</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Your Review</label>
                                        <textarea
                                            value={formData.review}
                                            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                            className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all min-h-[120px] resize-none"
                                            placeholder="What do you like about Sushi Launcher?"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 group"
                                    >
                                        Submit Review
                                        <MessageSquare className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-white/5 py-2 rounded-lg">
                                        <img src="/discord-logo.png" className="w-5 h-5 rounded-full" />
                                        <span>Reviews display the default Discord avatar</span>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, i) => (
                    <Testimonial
                        key={i}
                        {...review}
                    />
                ))}
            </div>
        </div>
    )
}
