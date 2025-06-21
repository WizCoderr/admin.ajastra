import {
    Box,
    Typography,
    Select,
    MenuItem,
    Card,
    CardContent,
    Stack,
    FormControl,
    InputLabel,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Order } from "../../types/order/orders";
import OrderRow from "../../components/orders/orderCard";
import OrderDetailsDialog from "../../components/orders/OrderDetailsDialog";
import { Api, endpoints } from "../../api";

export default function OrderPage() {
    const [status, setStatus] = useState("All");
    const [amount, setAmount] = useState("All");
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await Api.get(endpoints.getAllOrders);
                if (res.data && Array.isArray(res.data.data)) {
                    setOrders(res.data.data);
                    console.log(res.data.data)
                } else {
                    setOrders([]);
                    setError("No orders data found");
                }
            } catch (e) {
                console.error("Error fetching orders:", e);
                setError("Error fetching orders");
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleOpenDialog = (order: Order) => {
        setSelectedOrder(order);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedOrder(null);
    };

    const filteredOrders = orders.filter((order) => {
        const statusMatch = status === "All" || order.status === status.toUpperCase();

        let amountMatch = true;
        if (amount === "₹100 - ₹1500") {
            amountMatch = order.total >= 100 && order.total <= 1500;
        } else if (amount === "₹1500+") {
            amountMatch = order.total > 1500;
        }

        return statusMatch && amountMatch;
    });

    if (loading) {
        return (
            <Box p={4} display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                Orders ({orders.length})
            </Typography>

            {orders.length > 0 ? (
                <>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                                <MenuItem value="All">All Status</MenuItem>
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="PAID">Paid</MenuItem>
                                <MenuItem value="DELIVERED">Delivered</MenuItem>
                                <MenuItem value="COMPLETED">Completed</MenuItem>
                                <MenuItem value="CANCELLED">Cancelled</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Amount</InputLabel>
                            <Select value={amount} label="Amount" onChange={(e) => setAmount(e.target.value)}>
                                <MenuItem value="All">All Amounts</MenuItem>
                                <MenuItem value="₹100 - ₹1500">₹100 - ₹1500</MenuItem>
                                <MenuItem value="₹1500+">₹1500+</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    <Card variant="outlined">
                        <CardContent>
                            {/* Table header */}
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ fontWeight: "bold", pb: 1, borderBottom: "1px solid #e0e0e0" }}
                            >
                                <Box width="20%">Order</Box>
                                <Box width="30%">Customer</Box>
                                <Box width="15%">Status</Box>
                                <Box width="15%">Total</Box>
                                <Box width="15%">Date</Box>
                            </Stack>

                            {/* Table rows */}
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <Box key={order.id} onClick={() => handleOpenDialog(order)} sx={{ cursor: "pointer" }}>
                                        <OrderRow
                                            id={order.id}
                                            customer={order.user.fullName}
                                            email={order.user.email}
                                            status={order.status}
                                            total={order.total}
                                            date={order.createdAt}
                                            itemCount={order.items.reduce((sum, item) => sum + item.quantity, 0)}
                                        />
                                    </Box>
                                ))
                            ) : (
                                <Box p={4} textAlign="center">
                                    <Typography variant="body2" color="text.secondary">
                                        No orders found matching the selected filters.
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>

                    {selectedOrder && (
                        <OrderDetailsDialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            order={selectedOrder} />
                    )}
                </>
            ) : (
                <Box p={4} textAlign="center">
                    <Typography variant="body1" color="text.secondary">
                        No Orders
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
