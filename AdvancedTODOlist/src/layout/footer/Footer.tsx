import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/routes";

function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            onClick={() => {
              navigate(ROUTES.HOME);
            }}
          />
          <BottomNavigationAction
            label="Contact"
            icon={<EmailIcon />}
            onClick={() => {
              navigate(ROUTES.CONTACT);
            }}
          />
          <BottomNavigationAction
            label="About"
            icon={<InfoIcon />}
            onClick={() => {
              navigate(ROUTES.ABOUT);
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
export default Footer;
