// src/pages/TrendDashboard.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchTrends } from '../store/slices/trendSlice';

const TrendDashboard = () => {
  const dispatch = useDispatch();
  const { trends, loading } = useSelector((state) => state.trend);

  useEffect(() => {
    dispatch(fetchTrends());
  }, [dispatch]);

  const chartData = trends.map(trend => ({
    name: trend.title.slice(0, 20) + '...',
    relevanceScore: trend.relevanceScore
  })).slice(0, 10);

  if (loading) {
    return <Typography>Loading trends...</Typography>;
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tech Trends Dashboard
      </Typography>
      <Box sx={{ height: 300, marginBottom: 4 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="relevanceScore" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <List>
        {trends.map((trend) => (
          <ListItem key={trend._id} button component="a" href={trend.url} target="_blank">
            <ListItemText 
              primary={trend.title}
              secondary={`Source: ${trend.source} | Relevance: ${trend.relevanceScore.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TrendDashboard;