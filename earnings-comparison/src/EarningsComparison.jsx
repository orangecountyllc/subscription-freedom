import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Slider,
  TextField,
  Grid,
  Paper,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f4f8'
    },
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#4caf50'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  }
});

export default function EarningsComparison() {
  const [rides, setRides] = useState(100);
  const [fare, setFare] = useState(35);
  const [insurance, setInsurance] = useState(300);
  const [serviceFee, setServiceFee] = useState(1);
  const [uberFee, setUberFee] = useState(35);

  const totalEarnings = rides * fare;
  const earningsFreedom = totalEarnings * (1 - serviceFee / 100) - insurance;
  const earningsUber = totalEarnings * (1 - uberFee / 100) - insurance;
  const percentDifference = ((earningsFreedom - earningsUber) / earningsUber) * 100;

  const data = {
    labels: ['Freedom', 'Uber/Lyft'],
    datasets: [
      {
        label: 'Weekly Earnings ($)',
        data: [earningsFreedom, earningsUber],
        backgroundColor: ['#66bb6a', '#ef5350'],
        borderRadius: 10,
        barThickness: 60,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 14
          }
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: 'linear-gradient(to bottom right, #e3f2fd, #ffffff)',
          minHeight: '100vh',
          py: 6
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={6} sx={{ borderRadius: 4, p: 5 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
              Compare Your Weekly Earnings
            </Typography>

            <Grid container spacing={4} mt={2}>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom fontWeight={500}>
                  Rides per Week: {rides}
                </Typography>
                <Slider
                  value={rides}
                  min={1}
                  max={1000}
                  onChange={(e, val) => setRides(val)}
                  valueLabelDisplay="auto"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography gutterBottom fontWeight={500}>
                  Average Fare ($): {fare}
                </Typography>
                <Slider
                  value={fare}
                  min={10}
                  max={100}
                  onChange={(e, val) => setFare(val)}
                  valueLabelDisplay="auto"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Monthly Insurance Cost ($)"
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(parseFloat(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography gutterBottom fontWeight={500}>
                  Freedom Fee (%): {serviceFee}
                </Typography>
                <Slider
                  value={serviceFee}
                  min={0}
                  max={10}
                  onChange={(e, val) => setServiceFee(val)}
                  valueLabelDisplay="auto"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography gutterBottom fontWeight={500}>
                  Uber/Lyft Fee (%): {uberFee}
                </Typography>
                <Slider
                  value={uberFee}
                  min={20}
                  max={50}
                  onChange={(e, val) => setUberFee(val)}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>

            <Box mt={4} textAlign="center">
              <Typography variant="h6" fontWeight={600}>
                Total Earnings Before Fees: ${(totalEarnings - insurance).toFixed(2)}
              </Typography>
              <Typography variant="body1" mt={1}>
                With Freedom: <strong>${earningsFreedom.toFixed(2)}</strong>
              </Typography>
              <Typography variant="body1">
                With Uber/Lyft: <strong>${earningsUber.toFixed(2)}</strong>
              </Typography>
              <Typography variant="h6" mt={2} color="secondary">
                You earn {percentDifference.toFixed(1)}% more with Freedom.
              </Typography>
            </Box>

            <Box mt={5}>
              <Typography variant="h5" align="center" gutterBottom>
                Visual Comparison
              </Typography>
              <Bar data={data} options={options} />
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}