"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../../theme/AppTheme";
import ColorModeSelect from "../../../theme/ColorModeSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormLabel from "@mui/material/FormLabel";
import { SigninQuery } from "@/customHooks/query/authQuery";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { AxiosError } from "axios";

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
  email: yup.string().email().required("Email is required"),
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

export default function SignIn() {
  const [show, setShow] = React.useState<boolean>(false);
  const [clientReady, setIsClientReady] = React.useState<boolean>(false);
  const { mutateAsync } = SigninQuery();
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

  React.useEffect(() => {
    setIsClientReady(true);
  }, []);

  if (!clientReady) {
    return null;
  }

  const onSubmit = async (fields: yup.InferType<typeof schema>) => {
    try {
      const response = await mutateAsync(fields);
      if (response?.status == true) {
        reset();
        toast.success(response?.message);
        router.push("/home");
      } else {
        toast.error(response?.response?.data?.message || "Login Failed");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

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
            Sign in
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                fullWidth
                id="email"
                {...register("email")}
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
              />
              {errors.email && (
                <p style={{ color: "red", margin: "0", padding: "5px" }}>
                  {errors.email.message}
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
            <FormControlLabel
              control={<Checkbox checked={show} onChange={handleChange} />}
              label="Show Password"
            />
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
            <Link
              style={{
                alignSelf: "center",
                textDecoration: "none",
                color: "white",
              }}
              href="/reset-password"
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
