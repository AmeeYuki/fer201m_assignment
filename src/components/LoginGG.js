import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function LoginGG() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      {profile ? (
        <div>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Grid item>
              <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
                Welcome, {profile.name}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={handleOpenDialog ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={handleOpenDialog ? "true" : undefined}
                >
                  <Avatar alt={profile.name} src={profile.picture} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleOpenDialog}>
              <Typography sx={{ color: "#333333" }}>
                <AccountBoxIcon /> Profile
              </Typography>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link to="/Dashboard" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "#333333" }}>
                  <DashboardIcon /> Dashboard
                </Typography>
              </Link>
            </MenuItem>
            <hr />
            <MenuItem onClick={logOut}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#EA4335", color: "#FFFFFF" }}
              >
                Log out
              </Button>
            </MenuItem>
          </Menu>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Profile Information</DialogTitle>
            <DialogContent>
              {/* Display profile information here */}
              <Avatar src={profile.picture}></Avatar>

              <Typography>Name: {profile.name}</Typography>
              <Typography>Email: {profile.email}</Typography>
              {/* Add more profile information here */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <Button
          variant="contained"
          onClick={login}
          sx={{ backgroundColor: "#4285F4", color: "#FFFFFF" }}
        >
          Sign in with Google
        </Button>
      )}
    </div>
  );
}
