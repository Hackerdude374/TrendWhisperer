import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ChatInterface from './pages/ChatInterface';
import TrendDashboard from './pages/TrendDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/trends" element={<TrendDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;