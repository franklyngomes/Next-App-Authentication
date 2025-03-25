"use client";
export const runtime = 'edge';
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
import AppTheme from "../../../../theme/AppTheme";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AppAppBar from "@/app/components/AppBar";
import Footer from "@/app/components/Footer";
import { useParams } from "next/navigation";
import { SingleItemQuery, UpdateQuery } from "@/customHooks/query/cmsQuery";
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

const Container = styled(Stack)(({ theme }) => ({
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
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required").max(160),
  category: yup.string().required("Category is required").max(15)
});

export default  function Update() {
  const params = useParams();
  const slug =  params?.slug as string; 
  const {data} = SingleItemQuery(slug);
  const {mutateAsync} = UpdateQuery();
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
    const formData = new FormData();
    formData.append("name", Data.name);
    formData.append("price", Data.price.toString());
    formData.append("description", Data.description);
    formData.append("category", Data.category);
    try {
      const response = await mutateAsync({id: slug, formData});
      if (response?.status === 200) {
        reset();
        toast.success(response?.data?.message);
        router.push('/home')
      } else {
        toast.error(response?.data?.message || "Product updation failed");
      }
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

  React.useEffect(() => {
  if (data?.data?.product) {
    reset({
      name: data.data.product.name,
      price: data.data.product.price,
      description: data.data.product.description,
      category: data.data.product.category
    });
  }
}, [data, reset]);

  if (!clientReady && ! slug) {
    return null;
  }
  return (
    <AppTheme>
      <CssBaseline />
      <Container
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
        }}
      >
        <AppAppBar/>
        <Card variant="outlined" sx={{ overflow: "visible" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            suppressHydrationWarning
          >
            Update
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
                defaultValue={data?.data?.product?.name}
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
                id="price"
                {...register("price")}
                defaultValue={data?.data?.product?.price}
                placeholder="Price"
                name="price"
                variant="outlined"
              />
              {errors.price && (
                <p style={{ color: "red", margin: "0", padding: "5px" }}>
                  {errors.price.message}
                </p>
              )}
            </Box>
            <FormControl>
              <TextField
                fullWidth
                {...register("description")}
                name="description"
                placeholder="Description"
                defaultValue={data?.data?.product?.description}
                type="text"
                multiline
                id="description"
                variant="outlined"
              />
              {errors.description && (
                <p style={{ color: "red" }}>{errors.description.message}</p>
              )}
            </FormControl>
            <FormControl>
              <TextField
                fullWidth
                {...register("category")}
                name="category"
                placeholder="Category"
                defaultValue={data?.data?.product?.category}
                type="text"
                id="text"
                variant="outlined"
              />
              {errors.category && (
                <p style={{ color: "red" }}>{errors.category.message}</p>
              )}
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Update
            </Button>
          </Box>
        </Card>
      </Container>
        <Footer/>
    </AppTheme>
  );
}
