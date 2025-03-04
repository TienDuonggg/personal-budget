import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ width: drawerWidth, "& .MuiDrawer-paper": { width: drawerWidth } }}
      >
        <List>
          <ListItem sx={{ cursor: "pointer" }} component={Link} to="/" onClick={() => setOpen(false)}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem sx={{ cursor: "pointer" }} component={Link} to="/envelopes" onClick={() => setOpen(false)}>
            <ListItemText primary="Envelopes" />
          </ListItem>
          <ListItem sx={{ cursor: "pointer" }} component={Link} to="/statistics" onClick={() => setOpen(false)}>
            <ListItemText primary="Statistics" />
          </ListItem>
          <ListItem sx={{ cursor: "pointer" }} component={Link} to="/settings" onClick={() => setOpen(false)}>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Navbar */}
      <AppBar position="fixed" sx={{ width: "100%" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Personal Budget
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Nội dung chính */}
      <main style={{ flexGrow: 1, padding: "80px 20px" }}>{children}</main>
    </div>
  );
}
