# Delta's AI Customer Support Chatbot

## Overview

Delta's AI Customer Support Chatbot is an advanced conversational AI solution designed to provide efficient and effective customer support. Built using Next.js, React, Anthropic's Claude-3-haiku which was trained using RAG based on the dataset objects in S3 buckets and vector embeddings in pinecone, this chatbot aims to enhance user experience by delivering intelligent and responsive support. The project is deployed on EC2, ensuring seamless integration and continuous deployment.

## Features

- **AI-Powered Responses:** Utilizes Claude-3-Haiku to generate Ethical, intelligent, and context-aware responses to customer inquiries which were trained using Reterival-Augumented-Generation.
- **Chat Interface:** A user-friendly chat interface built with React and Next.js for an engaging user experience.
- **Continuous Deployment:** Deployed on AWS EC2 with CI/CD integration for automatic updates and improvements.
- **Feedback Mechanism:** Collects user feedback to continuously improve the chatbot's performance and stores it in a SQLite3 database for further training of the LLM model.
- **Multi-Language Support (Bonus):** Supports multiple languages to cater to a diverse user base.

## Project Structure

- `app/pages.js`: Contains the Next.js pages and API routes.
- `app/`: React components used in the chat interface.
   - `api/chat/route.js`: Contains the backend implementation of the parsing of the input query processing and invoking the python script to query the LLM response from AWS Bedrock.
   - `globals.css`: Contains the styling of the app using Material UI. 
- `public/`: Static assets such as images and styles.
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
   AWS_Session_KEY=your_api_key
   AWS_Secret_KEY=your_api_key
   AWS_Session_Token=your_api_key
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000` to see the chatbot in action.

## Deployment

The project is deployed on AWS EC2. So, give enough IAM roles to connect the S3 with Bedrock and Pinecone vector database. In order to create an LLM Orchestator tool (Knowledge base) refer to this video. 

[Learn by doing AWS Knowledge base]!https://youtu.be/5swKz_vKUsg?si=krEbqSG62Qhj1whY

## Usage

To use the chatbot, simply type your queries into the chat interface, and the AI will respond with relevant and intelligent answers. You can provide feedback on the responses to help improve the chatbot's performance.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Please ensure that your contributions adhere to the project's coding standards and guidelines.

---

Thank you for exploring our version of Delta's AI Customer Support Chatbot!
