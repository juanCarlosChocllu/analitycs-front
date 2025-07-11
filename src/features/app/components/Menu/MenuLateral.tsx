import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, LogOut } from "lucide-react";
import { menuItems } from "./utils/menuItems";

export const MenuLateral = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState<number | null>(null);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const toggleMenuOpen = (id: number) => {
    setItemSelected(id);
    setIsMenuOpen(!isMenuOpen);
  };
  const navigarPagina = (link: string) => {
    navigate(link);
    setOpen(false);
    setIsMenuOpen(false);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <div >
        <button
          onClick={toggleDrawer(false)}
          
        >
          <X className="w-6 h-6" />
        </button>
        <h2 >Menu</h2>
      </div>
      <Divider color="gray" variant="fullWidth" className="mb-2" />
      <List>
        {menuItems.map((item) => (
          <>
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                sx={{
                  background: "#263344",
                  borderRadius: "0.75rem",
                  marginY: "0.2rem",
                  "&:hover": { backgroundColor: "#324155" },
                }}
                onChange={() => toggleMenuOpen(item.id)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            {isMenuOpen &&
              itemSelected === item.id &&
              item.items &&
              item.items.map((item) => (
                <ListItem key={item.text} disablePadding className="pl-2 m-1">
                  <ListItemButton
                    sx={{
                      background: "#263344",
                      borderRadius: "0.75rem",
                      "&:hover": { backgroundColor: "#324155" },
                    }}
                    onChange={() => {
                      navigarPagina(item.link);
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
          </>
        ))}
        <ListItem disablePadding className="">
          <ListItemButton
            sx={{
              background: "#263344",
              borderRadius: "0.75rem",
              marginY: "0.2rem",
              "&:hover": { backgroundColor: "#324155" },
            }}
            onChange={() => {
              navigarPagina("/logout");
            }}
          >
            <ListItemIcon>
              <LogOut className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider color="gray" />
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
