import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import sqlite3 from 'sqlite3';

const execPromise = promisify(exec);

// Connect to SQLite database
const db = new sqlite3.Database('chatbot.db');

// Initialize the database table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS ratings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            messageId TEXT,
            rating INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

export async function POST(req) {
    try {
        const data = await req.json();
        // console.log('Received data:', data);

        // Handle feedback submission if the request contains rating and messageId
        if (data.rating && data.messageId) {
            const stmt = db.prepare("INSERT INTO ratings (messageId, rating) VALUES (?, ?)");
            stmt.run(data.messageId, data.rating);
            stmt.finalize();

            // console.log('Feedback recorded:', { messageId: data.messageId, rating: data.rating });
            return new NextResponse('Thank you for your feedback!', { status: 200 });
        }

        // Process user input
        const userMessages = data.filter(message => message.role === 'user');
        const userInput = userMessages[userMessages.length - 1]?.content || '';

        // console.log(`User input: ${userInput}`);

        // Escape quotes and other special characters in userInput
        const escapedInput = JSON.stringify(userInput);

        // Execute the Python script with the user input
        const pythonScriptPath = '/home/ec2-user/AI-Support-Chatbot/scripts/boto_implementation.py';
        const command = `python3 ${pythonScriptPath} ${escapedInput}`;

        // console.log(`Executing command: ${command}`);

        // Run the Python script
        const { stdout, stderr } = await execPromise(command);

        if (stderr) {
            throw new Error(stderr);
        }

        // console.log("Python script stdout:", stdout);

        // Try to parse the JSON response from the Python script
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return new NextResponse('Error parsing response from Python script', { status: 500 });
        }

        // Check if the response contains an error
        if (parsedResponse.error) {
            return new NextResponse(`Error from Python script: ${parsedResponse.error}`, { status: 500 });
        }

        const responseText = parsedResponse.content[0]?.text || "No response available";

        // Generate a unique messageId for the feedback system (e.g., using a timestamp)
        const messageId = `msg-${Date.now()}`;

        // Return the response and prompt the user for feedback
        const feedbackPrompt = `${responseText}\n.Please rate the response on a scale of 1 to 5 stars.\n`;

        return new NextResponse(feedbackPrompt, { status: 200 });
    } catch (error) {
        console.error('Error invoking Bedrock model:', error);
        return new NextResponse(`Error invoking Bedrock model: ${error.message}`, { status: 500 });
    }
}
