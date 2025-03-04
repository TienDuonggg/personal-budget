import { useState } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";

// Dummy data
const initialEnvelopes = [
  { id: 1, name: "Rent", balance: 1200 },
  { id: 2, name: "Groceries", balance: 300 },
  { id: 3, name: "Entertainment", balance: 150 },
];

export default function Envelopes() {
  const [envelopes, setEnvelopes] = useState(initialEnvelopes);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3, padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Envelopes
      </Typography>
      <Grid container spacing={3}>
        {envelopes.map((env) => (
          <Grid item xs={12} sm={4} key={env.id}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">{env.name}</Typography>
              <Typography variant="body1">Balance: ${env.balance}</Typography>
              <Button variant="outlined" sx={{ marginTop: 1 }}>Edit</Button>
              <Button variant="contained" color="error" sx={{ marginLeft: 1, marginTop: 1 }}>Delete</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
