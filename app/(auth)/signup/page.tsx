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
import { SignupQuery } from "@/customHooks/query/authQuery";
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
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%", // Make sure it covers the entire viewport
  position: "relative", // Ensure the ::before pseudo-element is positioned relative to this container
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    height: "100%",
    content: '""',
    display: "block",
    position: "absolute", // Make sure the pseudo-element is absolutely positioned
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Ensure it stretches the entire viewport
    zIndex: -1, // Place it behind the content
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));
const schema = yup.object({
  name: yup.string().required("First name is required").min(3).max(20),
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

export default function SignUp() {
  const [show, setShow] = React.useState<boolean>(false);
  const [clientReady, setIsClientReady] = React.useState<boolean>(false);
  const router = useRouter();
  const { data, mutateAsync } = SignupQuery();
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
    try {
      const response = await mutateAsync(Data);
      if (response?.status === true) {
        reset();
        router.push("/verifyOtp");
        toast.success(response?.message);
      } else {
        toast.error(response?.message || "Signing up failed");
      }
      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  React.useEffect(() => {
    setIsClientReady(true);
  }, []);

  if (!clientReady) {
    return null;
  }
  return (
    <AppTheme>
      <CssBaseline />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card variant="outlined" sx={{ overflow: "visible" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            suppressHydrationWarning
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box>
              <TextField
                autoComplete="Name"
                {...register("name")}
                name="name"
                fullWidth
                id="name"
                placeholder="Name"
              />
              {errors.name && (
                <p style={{ color: "red", margin: "0", padding: "5px" }}>
                  {errors.name.message}
                </p>
              )}
            </Box>
            <Box>
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
            </Box>
            <FormControl>
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
              <FormControlLabel
                control={<Checkbox checked={show} onChange={handleChange} />}
                label="Show Password"
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                href="/signin"
                style={{
                  alignSelf: "center",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
