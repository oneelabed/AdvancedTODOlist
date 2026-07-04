import { Navigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ROUTES from "./routes";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
