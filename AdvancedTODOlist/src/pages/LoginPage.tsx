import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../router/routes";
import { Navigate } from "react-router-dom";

// 1. Validation Schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // valid email validation
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email address",
    }),
  password: Joi.string()
    .min(6) // min 6 characters
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
    }),
});

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });
  const { login, user } = useUser();
  const onSubmit = async (data: any) => {
    await login(data.email, data.password);
  };

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 300,
          mt: 4,
        }}
      >
        <TextField
          {...register("email")}
          placeholder="Email"
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />

        <TextField
          {...register("password")}
          placeholder="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />

        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </form>
  );
}

export default LoginPage;
