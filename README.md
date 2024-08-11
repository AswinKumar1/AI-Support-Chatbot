# Delta's AI Customer Support Chatbot

## Overview

Delta's AI Customer Support Chatbot is an advanced conversational AI solution designed to provide efficient and effective customer support. Built using Next.js, React, Meta Llama3 which was trained using RAG based on the dataset present in S3 buckets and pinecone, this chatbot aims to enhance user experience by delivering intelligent and responsive support. The project is deployed on EC2, ensuring seamless integration and continuous deployment.

## Features

- **AI-Powered Responses:** Utilizes Llama3 to generate intelligent and context-aware responses to customer inquiries which was trained using RAG.
- **Chat Interface:** A user-friendly chat interface built with React and Next.js for an engaging user experience.
- **Continuous Deployment:** Deployed on AWS EC2 with CI/CD integration for automatic updates and improvements.
- **Feedback Mechanism:** Collects user feedback to continuously improve the chatbot's performance.
- **Multi-Language Support (Bonus):** Supports multiple languages to cater to a diverse user base.

## Project Structure

- `pages/`: Contains the Next.js pages and API routes.
- `components/`: React components used in the chat interface.
- `public/`: Static assets such as images and styles.
- `styles/`: CSS files for styling the application.
- `utils/`: Utility functions and API integration code.
- `scripts/`: Contains boto implementation to collect the user query and generate response from the LLM. 

## Getting Started

To get started with the project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AswinKumar1/Delta-s-AI-customer-support-chatbot.git
   cd Delta-s-AI-customer-support-chatbot
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```
   API_KEY=your_api_key
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000` to see the chatbot in action.

## Deployment

The project is deployed on AWS EC2. 

## Usage

To use the chatbot, simply type your queries into the chat interface, and the AI will respond with relevant and intelligent answers. You can provide feedback on the responses to help improve the chatbot's performance.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Please ensure that your contributions adhere to the project's coding standards and guidelines.

---

Thank you for exploring our version of Delta's AI Customer Support Chatbot!
