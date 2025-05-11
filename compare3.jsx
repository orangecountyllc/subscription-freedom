import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Slider, TextField, Grid, Paper
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EarningsComparison = () => {
  const [rides, setRides] = useState(100);
  const [fare, setFare] = useState(35);
  const [insurance, setInsurance] = useState(300);
  const [serviceFee, setServiceFee] = useState(1);
  const [uberFee, setUberFee] = useState(35);

  const totalEarnings = rides * fare;
  const afterFreedom = totalEarnings * (1 - serviceFee / 100) - insurance;
  const afterUber = totalEarnings * (1 - uberFee / 100) - insurance;
  const percentDiff = ((afterFreedom - afterUber) / afterUber) * 100;

  const chartData = {
    labels: ['With Freedom', 'With Uber/Lyft'],
    datasets: [{
      label: 'Weekly Earnings',
      data: [afterFreedom, afterUber],
      backgroundColor: ['#4CAF50', '#FF5733']
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Compare Your Earnings
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Number of Rides per Week: {rides}</Typography>
            <Slider value={rides} min={1} max={1000} onChange={(e, val) => setRides(val)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Average Fare per Ride ($): {fare}</Typography>
            <Slider value={fare} min={10} max={100} onChange={(e, val) => setFare(val)} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Insurance Cost per Month ($)"
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(parseFloat(e.target.value))}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Freedom Service Fee (%): {serviceFee}</Typography>
            <Slider value={serviceFee} min={0} max={10} onChange={(e, val) => setServiceFee(val)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Uber/Lyft Fee (%): {uberFee}</Typography>
            <Slider value={uberFee} min={20} max={50} onChange={(e, val) => setUberFee(val)} />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" align="center">
            Total Earnings (Before Fees): ${totalEarnings - insurance}
          </Typography>
          <Typography align="center" color="green">
            With Freedom: ${afterFreedom.toFixed(2)}
          </Typography>
          <Typography align="center" color="red">
            With Uber/Lyft: ${afterUber.toFixed(2)}
          </Typography>
          <Typography align="center" sx={{ mt: 2 }}>
            <strong>You earn {percentDiff.toFixed(1)}% more with Freedom.</strong>
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography variant="h6" gutterBottom>Compare Earnings Visually</Typography>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </Paper>
    </Container>
  );
};

export default EarningsComparison;