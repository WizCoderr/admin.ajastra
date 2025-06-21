import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Button,
    IconButton,
    AppBar,
    Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
    BarChart,
    People,
    Logout,
    GridView,
    ControlPointDuplicateOutlined,
    ProductionQuantityLimits,
    Tune
} from "@mui/icons-material";
import { Api, endpoints, removeToken } from "../api";

const drawerWidth = 240;

const navItems = [
    { label: "Dashboard", icon: <BarChart />, path: "/dashboard" },
    { label: "Slider", icon: <Tune />, path: "/slider" },
    { label: "Orders", icon: <GridView />, path: "/orders" },
    { label: "Customers", icon: <People />, path: "/customers" },
    { label: "Categories", icon: <ControlPointDuplicateOutlined />, path: "/categories" },
    { label: "Products", icon: <ProductionQuantityLimits />, path: "/products" },
    { label: "AllProducts", icon: <ProductionQuantityLimits />, path: "/allProducts" },
];

export default function AdminLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/') {
            navigate('/dashboard', { replace: true });
        }
    });

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    // Improved active path checking to handle exact matches better
    const isActive = (path: string) => {
        if (location.pathname === '/' || location.pathname === '/') {
            return path === '/dashboard';
        }
        return location.pathname === path;
    };

    const handleNavigation = (path: string) => {
        console.log(path)
        navigate(path);
        setMobileOpen(false);
    };
    const handleLogOut = async () => {
        await Api.post(endpoints.adminLogout).then((res) => {
            alert(res.data.message)
            removeToken()
            handleNavigation('/login')
        })
    }

    const drawer = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" fontWeight="bold" mb={3} mt={1} ml={1}>
                Ajasrabyitika Dashboard
            </Typography>
            <List>
                {navItems.map((item) => {
                    const selected = isActive(item.path);
                    return (
                        <ListItem disablePadding key={item.label}>
                            <ListItemButton
                                sx={{
                                    mb: 1,
                                    borderRadius: 1,
                                    bgcolor: selected ? "white" : "transparent",
                                    color: selected ? "#0f172a" : "white",
                                    "&:hover": {
                                        bgcolor: selected ? "white" : "#1e293b",
                                    },
                                }}
                                onClick={() => handleNavigation(item.path)}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: selected ? "#0f172a" : "white",
                                        minWidth: "35px",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Box mt="auto">
                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />
                <Button
                    startIcon={<Logout />}
                    sx={{ color: "#ef4444", "&:hover": { color: "#dc2626" } }}
                    fullWidth
                    onClick={() => handleLogOut()}
                >
                    LOG OUT
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f9fafb" }}>
            {/* Mobile AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    display: { sm: "none" },
                    bgcolor: "#0f172a",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                elevation={0}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Ajasrabyitika</Typography>
                </Toolbar>
            </AppBar>

            {/* Desktop Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        bgcolor: "#0f172a",
                        color: "white",
                        p: 2,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>

            {/* Mobile Sidebar */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        bgcolor: "#0f172a",
                        color: "white",
                        p: 2,
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Main Content with Outlet */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    overflowY: "auto",
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: { xs: 7, sm: 0 },
                    minHeight: "100vh", // Ensure minimum height
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}