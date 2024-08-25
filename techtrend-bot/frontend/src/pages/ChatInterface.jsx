// src/pages/ChatInterface.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, TextField, Button, List, ListItem, ListItemText, Paper, Box } from '@mui/material';
import { sendMessage } from '../store/slices/chatSlice';

const ChatInterface = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    dispatch(sendMessage(input));
    setInput('');
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper sx={{ height: '60vh', overflowY: 'auto', marginBottom: 2, padding: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ margin: '8px 0' }}>
              <ListItemText primary={`${msg.role}: ${msg.content}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          variant="outlined"
          disabled={loading}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={loading}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default ChatInterface;