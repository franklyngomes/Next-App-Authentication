"use client";
import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../theme/ColorModeIconDropdown";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { UserQuery } from "@/customHooks/query/authQuery";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [isClient, setIsClient] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>("");
  const router = useRouter();
  const cookie = new Cookies()
  const { data } = UserQuery();

  React.useEffect(() => {
    if (data) {
      setUserName(data?.data?.name);
    }
    setIsClient(true);
  }, [data]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  if (!isClient) {
    return null;
  }

  const handleLogout = () => {
    cookie.remove("user_token")
    router.push("/signin");
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              gap: "20px",
              px: 0,
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="primary"
            >
              Auth2.0
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small">
                <Link
                  href="/home"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Link>
              </Button>
              <Button variant="text" color="info" size="small">
                <Link
                  href="/create"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Create
                </Link>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Avatar
              alt="User"
              src="https://picsum.photos/800/450?random=2"
              sx={{ width: 24, height: 24 }}
            />
            <Typography variant="body1" color="primary">
              {userName}
            </Typography>
            <Button
              color="primary"
              variant="text"
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Box sx={{display: "flex", justifyContent: "start", gap: "15px", marginBottom: "15px",alignItems: "center"}}>
                  <Avatar
                    alt="User"
                    src="https://picsum.photos/800/450?random=2"
                    sx={{ width: 24, height: 24 }}
                    />
                  <Typography variant="body1" color="primary">
                    {userName}
                  </Typography>
                    </Box>
                <MenuItem>
                  <Link
                    href="/home"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/create"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Create
                  </Link>
                </MenuItem>
                <Box sx={{display: "flex", justifyContent: "space-between",alignItems: "center"}}>
                  <Button
                    color="primary"
                    variant="text"
                    size="medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
