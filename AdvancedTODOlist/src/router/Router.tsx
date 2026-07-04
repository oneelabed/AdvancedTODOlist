import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ROUTES from "./routes";
import TaskPage from "../pages/TaskPage";
import BoardPage from "../pages/BoardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ExamplePage from "../pages/ExamplePage";
import PageNotFound from "../pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";

function Router() {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.BOARD_PAGE + ":boardId"}
        element={
          <ProtectedRoute>
            <BoardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.TASK_PAGE + ":id"}
        element={
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={"/sandbox"} element={<ExamplePage />} />
      <Route path={"/*"} element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
