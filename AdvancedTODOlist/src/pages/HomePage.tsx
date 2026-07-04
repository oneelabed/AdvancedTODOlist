import { useEffect, useState, memo } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import useBoards from "../hooks/useBoards";
import BoardFormDialog from "../components/BoardFormDialog";
import ROUTES from "../router/routes";
import type { Board } from "../types/Board";

function HomePage() {
  const [isBoardDialogOpen, setIsBoardDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { boards, isLoading, handleGetBoards, handleAddBoard } = useBoards();

  useEffect(() => {
    handleGetBoards();
  }, [handleGetBoards]);

  const handleOpenAddBoard = () => {
    setIsBoardDialogOpen(true);
  };

  const handleBoardSave = (data: Board | Pick<Board, "title">) => {
    handleAddBoard(data);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <DashboardIcon color="primary" sx={{ fontSize: 36 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            My Boards
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddBoard}
          size="large"
          sx={{ borderRadius: 2, px: 3 }}
        >
          New Board
        </Button>
      </Box>

      {boards.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            border: 2,
            borderStyle: "dashed",
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No active boards. Create a new board to get started!
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpenAddBoard}
            sx={{ mt: 2 }}
          >
            Create First Board
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {boards.map((board) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={board.id}>
              <Card
                sx={{
                  height: 140,
                  display: "flex",
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(ROUTES.BOARD_PAGE + board.id)}
                  sx={{ display: "flex", alignItems: "flex-start", p: 3 }}
                >
                  <CardContent sx={{ p: 0, width: "100%" }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: "medium" }} noWrap>
                      {board.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Click to enter task management
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {isBoardDialogOpen && (
        <BoardFormDialog
          open={isBoardDialogOpen}
          onClose={() => setIsBoardDialogOpen(false)}
          handleSave={handleBoardSave}
        />
      )}
    </Container>
  );
}

export default memo(HomePage);
