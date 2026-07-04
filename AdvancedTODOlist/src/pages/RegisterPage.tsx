import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useUser } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../router/routes";

const userSchema = Joi.object({
  displayName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 2 characters",
    "any.required": "Username is required",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(userSchema),
  });

  const { signup, user } = useUser();

  const onSubmit = (data: any) => {
    signup(data);
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
          {...register("displayName")}
          placeholder="Username"
          fullWidth
          error={!!errors.displayName}
          helperText={errors.displayName?.message as string}
        />

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
          Sign up
        </Button>
      </Box>
    </form>
  );
}

export default RegisterPage;
