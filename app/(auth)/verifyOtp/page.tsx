"use client";
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
import { VerifyOtpQuery } from "@/customHooks/query/authQuery";
import toast from "react-hot-toast";

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
  otp: yup.number().required("OTP is required"),
});

export default function VerfiyOtp() {
  const { mutate, data, mutateAsync } = VerifyOtpQuery();
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

  const onSubmit = async (Data: yup.InferType<typeof schema>) => {
    const response = await mutateAsync(Data);
    if (response?.status === 200 || response?.status === true) {
      reset();
      router.push("/signin");
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
    console.log(response);
  };
  React.useEffect(() => {
    setIsClientReady(true);
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
            Email verification
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
                {...register("otp")}
                name="otp"
                placeholder="Enter OTP"
                type="number"
                id="otp"
                variant="outlined"
              />
              {errors.otp && (
                <p style={{ color: "red" }}>{errors.otp.message}</p>
              )}
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Verify
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
