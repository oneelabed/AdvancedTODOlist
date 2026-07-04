import { Typography, Box, TextField, Button, Paper } from "@mui/material";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const ContactPage = () => {
  const [status, setStatus] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("Message sent successfully!");
  };

  return (
    <Box sx={{ maxWidth: "600px", mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ mb: 4, fontWeight: 500 }}
      >
        Contact Us
      </Typography>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <TextField fullWidth label="Full Name" variant="outlined" required />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                required
              />
            </Grid>
            <Grid size={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                endIcon={<SendIcon />}
                sx={{ py: 1.5, fontSize: "1.1rem" }}
              >
                Send Message
              </Button>
            </Grid>
            {status && (
              <Grid size={12}>
                <Typography color="success.main" align="center">
                  {status}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ContactPage;
