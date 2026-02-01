import { Octokit } from '@octokit/rest';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, rating, review } = req.body;

    if (!username || !rating || !review) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const owner = 'sushi-dev55-alt';
    const repo = 'Sushi-Launcher-website';
    const path = 'public/reviews.json';

    try {
        // 1. Get current file content (SHA is needed to update)
        const { data: currentFile } = await octokit.repos.getContent({
            owner,
            repo,
            path,
        });

        if (!Array.isArray(currentFile) && currentFile.type === 'file') {
            const content = Buffer.from(currentFile.content, 'base64').toString('utf-8');
            const reviews = JSON.parse(content);

            // 2. Add new review
            const newReview = {
                username,
                rating,
                testimonial: review,
                image: '/discord-logo.png', // Default image as requested
            };

            reviews.unshift(newReview); // Add to top

            // 3. Update file on GitHub
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path,
                message: `Add review from ${username}`,
                content: Buffer.from(JSON.stringify(reviews, null, 2)).toString('base64'),
                sha: currentFile.sha,
            });

            return res.status(200).json({ success: true, message: 'Review submitted successfully!' });
        } else {
            throw new Error("Could not read file type properly or file is directory");
        }

    } catch (error: any) {
        console.error('Error submitting review:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
