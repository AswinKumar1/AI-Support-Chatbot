import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `Welcome to Headstarter AI Support!

Hello! I'm here to assist you with any questions or issues you may have about Headstarter AI, where you can sharpen your skills with AI-powered mock technical interviews. Whether you need help with navigating the platform, understanding how to use our features, or troubleshooting any problems, I'm here to help.

Here’s how I can assist you:

Platform Navigation: Guidance on finding and using different features.
Mock Interviews: Help with starting, understanding, or rescheduling your practice interviews.
Technical Issues: Troubleshooting common problems or reporting issues.
Account Support: Assistance with account management, including login issues and profile updates.
Subscription & Billing: Information on plans, payments, and billing questions.
General Inquiries: Any other questions you might have about using Headstarter AI effectively.
Just let me know what you need help with, and I'll do my best to provide the information or solutions you’re looking for. If I can’t solve your issue directly, I’ll make sure to connect you with a human expert from our support team.

How can I assist you today?`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            ...data,
        ],
        model: 'gpt-3.5-turbo',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }
            catch (err){
                controller.error(error)
            } 
            finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}
