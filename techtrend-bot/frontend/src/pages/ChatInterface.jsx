// frontend/src/pages/ChatInterface.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, TextField, Button, List, ListItem, ListItemText, Paper, makeStyles } from '@material-ui/core';
import { sendMessage } from '../store/slices/chatSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  messageList: {
    height: '60vh',
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
  },
  messageItem: {
    margin: theme.spacing(1, 0),
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

const ChatInterface = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    dispatch(sendMessage(input));
    setInput('');
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.messageList}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} className={classes.messageItem}>
              <ListItemText primary={`${msg.role}: ${msg.content}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          variant="outlined"
          disabled={loading}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={loading}>
          Send
        </Button>
      </div>
    </Container>
  );
};

export default ChatInterface;