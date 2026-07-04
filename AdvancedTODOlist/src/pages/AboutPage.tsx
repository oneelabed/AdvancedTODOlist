import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const AboutPage: React.FC = () => {
  const cards = [
    {
      title: "Interactive Kanban Board",
      description: "Manage your tasks visually across custom columns (e.g. To Do, In Progress, Done). Add columns dynamically to match your project pipeline.",
      icon: <DashboardIcon sx={{ color: "primary.main", fontSize: 32 }} />,
    },
    {
      title: "Drag & Drop Simplicity",
      description: "Drag and drop tasks smoothly between stages using dnd-kit, or move them quickly via the dropdown menu on each task card.",
      icon: <TouchAppIcon sx={{ color: "success.main", fontSize: 32 }} />,
    },
    {
      title: "Personalized Focus",
      description: "Instantly filter task boards to see tasks assigned to you ('My Tasks') or tasks you've bookmarked with the Star indicator ('Saved Tasks').",
      icon: <FilterAltIcon sx={{ color: "warning.main", fontSize: 32 }} />,
    },
    {
      title: "Real-Time Cloud Sync",
      description: "Powered by Firebase Auth & Firestore. Task creations, shifts, assignments, and saves are securely synced in real-time.",
      icon: <CloudSyncIcon sx={{ color: "info.main", fontSize: 32 }} />,
    },
  ];

  const techStack = ["React", "TypeScript", "Material UI (MUI)", "Firebase Firestore", "Firebase Auth", "Redux Toolkit"];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Header Banner */}
      <Paper
        elevation={0}
        sx={{
          p: 6,
          mb: 6,
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          color: "white",
          borderRadius: 4,
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.15)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
          <TaskAltIcon sx={{ fontSize: 48, mr: 1.5 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
            Advanced TODO List
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 700, mx: "auto", fontWeight: "normal" }}>
          A secure, cloud-synced, and highly interactive project planning application designed to organize your workflow and boost productivity.
        </Typography>
      </Paper>

      {/* Main Narrative Explanation */}
      <Box sx={{ mb: 6, px: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Our Vision & Mission
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.7, mb: 2 }}>
          The core philosophy behind this application is focused on reducing friction and clutter in project planning. By providing a clean visual hierarchy, team members can collaborate, log in, create custom workspace boards, and divide tasks into highly organized pipelines.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.7, mb: 2 }}>
          Whether you are tracking personal study milestones, structuring team assignments, or keeping checklists for daily duties, this Single Page Application acts as your single source of truth—keeping your tasks organized and updating seamlessly across devices.
        </Typography>
      </Box>

      {/* Features Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, px: 2 }}>
          Core Features
        </Typography>
        <Grid container spacing={3}>
          {cards.map((card, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 3, display: "flex", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "background.default", width: 56, height: 56 }}>
                    {card.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {card.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tech Stack Chips */}
      <Box sx={{ px: 2, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Built with Modern Web Technologies
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5 }}>
          {techStack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              variant="outlined"
              color="primary"
              sx={{ px: 2, py: 2.2, fontSize: "0.95rem", fontWeight: "medium", borderRadius: 3 }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage;
