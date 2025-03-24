"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { DeleteQuery, ListQuery } from "@/customHooks/query/cmsQuery";
import { CircularProgress } from "@mui/material";
import {Button} from "@mui/material";
import toast from "react-hot-toast";
import Link from "next/link";
import { AxiosError } from "axios";
import { Product } from "@/interface/interface";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function List() {
  const {data} = ListQuery() as {data:  Product[]}
  const {mutateAsync} = DeleteQuery()

  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };
  const handleDelete = async (id: string) => {
    try{
      const response = await mutateAsync(id)
      if(response?.status === 200){
        toast.success(response?.data?.message)
      }else{
        toast.error(response?.data?.message || "Failed to delete item")
      }
    }catch(error){
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }

  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          All Products
        </Typography>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
      </Box>
      <Grid container spacing={2} columns={12}>
        {
          data? data.map((item) => (
        <Grid size={{ xs: 12, md: 6 }} key={item._id}>
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? "Mui-focused" : ""}
          >
            <CardMedia
              component="img"
              alt="Service"
              src="https://picsum.photos/800/450?random"
              sx={{
                aspectRatio: "16 / 9",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            />
            <StyledCardContent>
            <Chip
            size="medium"
            label={item.category}
            sx={{
              maxWidth: "100px"
            }}
            />
              <Typography gutterBottom variant="h6" component="div">
                {item.name}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
                sx={{marginBottom: "20px"}}
              >
                {item.description}
              </StyledTypography>
              <Box sx={{display: "flex", gap: '20px'}}>
                <Link href={`/update/${item._id}`} style={{textDecoration: 'none', color: "inherit"}}>
              <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  >
                  Update
                </Button>
                    </Link>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(item._id)}
                  >
                  Delete
                </Button>
                  </Box>
            </StyledCardContent>
          </StyledCard>
        </Grid>
                  )) :<CircularProgress size={20}/>
                }
      </Grid>
    </Box>
  );
}
