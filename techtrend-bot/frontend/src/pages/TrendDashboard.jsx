// frontend/src/pages/TrendDashboard.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchTrends } from '../store/slices/trendSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  chart: {
    height: 300,
    marginBottom: theme.spacing(4),
  },
}));

const TrendDashboard = () => {
  const classes = useStyles();
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
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Tech Trends Dashboard
      </Typography>
      <div className={classes.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="relevanceScore" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
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