import {
    Box,
    Typography,
    Select,
    MenuItem,
    Card,
    CardContent,
    Avatar,
    Stack,
    FormControl,
    InputLabel,
    Chip,
} from "@mui/material";
import { useState } from "react";

const orders = [
    {
        id: "#390561",
        customer: "Michelle Black",
        status: "Paid",
        total: 780.0,
        date: "Jan 8",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: "#663334",
        customer: "Janice Chandler",
        status: "Delivered",
        total: 1250.0,
        date: "Jan 6",
        avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    },
];

export default function OrderPage() {
    const [status, setStatus] = useState("Delivered");
    const [amount, setAmount] = useState("$100 - $1500");

    return (
        <Box p={4}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                Orders
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="Delivered">Delivered</MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Amount</InputLabel>
                    <Select
                        value={amount}
                        label="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                    >
                        <MenuItem value="$100 - $1500">$100 - $1500</MenuItem>
                        <MenuItem value="$1500+">$1500+</MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            <Card variant="outlined">
                <CardContent>
                    {/* Header */}
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

                    {/* Rows */}
                    {orders.map((order) => (
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            key={order.id}
                            sx={{ py: 2, borderBottom: "1px solid #e0e0e0" }}
                        >
                            <Box width="20%">{order.id}</Box>
                            <Box width="30%">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Avatar src={order.avatar} alt={order.customer} />
                                    <Typography>{order.customer}</Typography>
                                </Stack>
                            </Box>
                            <Box width="15%">
                                <Chip
                                    label={order.status}
                                    color={
                                        order.status === "Paid"
                                            ? "primary"
                                            : order.status === "Completed"
                                                ? "success"
                                                : "default"
                                    }
                                    variant="outlined"
                                />
                            </Box>
                            <Box width="15%">${order.total.toFixed(2)}</Box>
                            <Box width="15%">{order.date}</Box>
                        </Stack>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
}
