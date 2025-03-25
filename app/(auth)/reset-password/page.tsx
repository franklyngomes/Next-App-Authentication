"use client";
// export const runtime = 'edge';
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../../theme/AppTheme";
import ColorModeSelect from "../../../theme/ColorModeSelect";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormLabel from "@mui/material/FormLabel";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { ResetPasswordQuery } from "@/customHooks/query/authQuery";
import { IResetPassword } from "@/interface/interface";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));
const schema = yup.object({
  user_id: yup.string(),
  password: yup
    .string()
    .required("Set your password")
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
});

export default function ResetPassword() {
  const [show, setShow] = React.useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [userId, setUserId] = React.useState<string>("");
  const { mutateAsync } = ResetPasswordQuery();
  const [clientReady, setIsClientReady] = React.useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleChange = () => {
    setShow(!show);
  };

  const onSubmit = async (Data: yup.InferType<typeof schema>) => {
    if (Data.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return null;
    } else {
      setPasswordError("");
    }
    const requestData : IResetPassword = {
      user_id: Data.user_id ?? "",
      password: Data.password
    }
    const response = await mutateAsync(requestData);
      reset();
      router.push("/signin");
      toast.success(response?.message);
  };

  React.useEffect(() => {
    setIsClientReady(true);
    const id = localStorage.getItem("user_id");
    if (id) {
      setUserId(id);
    }
  }, []);
  if (!clientReady) {
    return null;
  }
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SignInContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="user_id">User Id</FormLabel>
              <TextField
                fullWidth
                id="user_id"
                {...register("user_id")}
                name="text"
                defaultValue={userId}
                variant="outlined"
                disabled
              />
              {errors.user_id && (
                <p style={{ color: "red", margin: "0", padding: "5px" }}>
                  {errors.user_id.message}
                </p>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                fullWidth
                {...register("password")}
                name="password"
                placeholder="Password"
                type={show ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                variant="outlined"
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Confirm Password</FormLabel>
              <TextField
                fullWidth
                name="confirm_password"
                placeholder="Password"
                type={show ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                variant="outlined"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={show} onChange={handleChange} />}
              label="Show Password"
            />
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
