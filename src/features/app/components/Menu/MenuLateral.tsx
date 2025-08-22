import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, LogOut } from "lucide-react";
import { menuItems } from "./utils/menuItems";
import { AutenticacionContext } from "../../context/AuntenticacionProvider";
import type { MenuItem } from "../../interfaces/menu";

export const MenuLateral = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState<number | null>(null);
  const {rol} =useContext(AutenticacionContext)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const toggleMenuOpen = (id: number) => {
    setItemSelected(id);
    setIsMenuOpen(!isMenuOpen);
  };
  const navigarPagina = (link: string) => {
    console.log(link);
    
    const isExternal = link.startsWith("https");
    if (isExternal) {
       window.location.href = link;
    } else {
      navigate(link);
    }
    setOpen(false);
    setIsMenuOpen(false);
  };
 const menu = filterMenuByRole(menuItems, rol);

  
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      className=" bg-gray-800 h-full text-white w-64 p-4 transform-none"
    >
      <div className="flex justify-start items-center gap-4">
        <button
          onClick={toggleDrawer(false)}
          className="text-white hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold pb-2">Menu</h2>
      </div>
      <Divider color="gray" variant="fullWidth" className="mb-2" />
      <List>
        {menu.map((item) => (
          <>
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                sx={{
                  background: "#263344",
                  borderRadius: "0.75rem",
                  marginY: "0.2rem",
                  "&:hover": { backgroundColor: "#324155" },
                }}
                onClick={() => toggleMenuOpen(item.id)}
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
                    onClick={() => {
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

function filterMenuByRole(menuItems: MenuItem[], rol: string): MenuItem[] {
  return menuItems
    .map((menuItem) => {
      const hasMenuAccess = !menuItem.roles || menuItem.roles.includes(rol);
      if (!hasMenuAccess) return null;


      const filteredSubItems = menuItem.items?.filter(
        (subItem) => !subItem.roles || subItem.roles.includes(rol)
      ) || [];

   
      return {
        ...menuItem,
        items: filteredSubItems,
      };
    })
    .filter((menuItem): menuItem is MenuItem => menuItem !== null);
}