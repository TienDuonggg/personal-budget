import { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

// Dummy data for envelopes
const initialEnvelopes = [
  { id: 1, name: "Rent", balance: 1200 },
  { id: 2, name: "Groceries", balance: 300 },
  { id: 3, name: "Entertainment", balance: 150 },
];

export default function Dashboard() {
  const [envelopes] = useState(initialEnvelopes);

  // Tính tổng số dư
  const totalBalance = envelopes.reduce((sum, env) => sum + env.balance, 0);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Tổng số dư */}
      <Paper sx={{ padding: 3, textAlign: "center", marginBottom: 3 }}>
        <Typography variant="h6">Total Balance</Typography>
        <Typography variant="h4" color="primary">${totalBalance}</Typography>
      </Paper>

      {/* Danh sách phong bì */}
      <Typography variant="h5" gutterBottom>
        Envelopes Overview
      </Typography>
      <Grid container spacing={3}>
        {envelopes.map((env) => (
          <Grid item xs={12} sm={4} key={env.id}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">{env.name}</Typography>
              <Typography variant="body1">Balance: ${env.balance}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
