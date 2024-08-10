'use client';

import { useState } from "react";
import { Box, Stack, TextField, Button } from "@mui/material";

export default function Home() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Hi! I’m the Delta Airlines AI Support Assistant. How can I help you today?',
  }]);

  const [message, setMessage] = useState('');
  const [ratings, setRatings] = useState({}); // Track ratings for messages

  const sendMessage = async () => {
    // Avoid sending empty messages
    if (message.trim() === '') return;

    const newMessageId = `msg-${Date.now()}`;
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message, messageId: newMessageId },
      { role: 'assistant', content: '', messageId: newMessageId },
    ]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message, messageId: newMessageId }]),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    reader.read().then(function processText({ done, value }) {
      if (done) {
        return result;
      }
      const text = decoder.decode(value || new Uint8Array(), { stream: true });
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          }
        ];
      });
      return reader.read().then(processText);
    });
  };

  const handleFeedback = async (rating, messageId) => {
    await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, messageId }),
    });
    setRatings((prevRatings) => ({ ...prevRatings, [messageId]: rating }));
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid #000"
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {
            messages.map((message, index) => (
              <Box key={index} display="flex" flexDirection="column" alignItems={message.role === 'assistant' ? 'flex-start' : 'flex-end'}>
                <Box
                  bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                  color='white'
                  borderRadius={16}
                  p={2}
                >
                  {message.content}
                </Box>
                {message.role === 'assistant' && message.messageId && (
                  <Stack direction="row" spacing={1} mt={1}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Button
                        key={star}
                        variant="outlined"
                        size="small"
                        onClick={() => handleFeedback(star, message.messageId)}
                        sx={{
                          backgroundColor: ratings[message.messageId] === star ? 'grey.700' : 'transparent',
                          color: ratings[message.messageId] === star ? 'white' : 'inherit',
                          borderColor: 'grey.500',
                        }}
                      >
                        {star}
                      </Button>
                    ))}
                  </Stack>
                )}
              </Box>
            ))
          }
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <TextField
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
