import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Avatar,
} from "@mui/material";
import { Order, Product } from "../../types/order/orders";
import { Api, endpoints } from "../../api";

interface Props {
    open: boolean;
    onClose: () => void;
    order: Order | null;
}

const OrderDetailsDialog: React.FC<Props> = ({ open, onClose, order }) => {
    const [products, setProducts] = useState<Record<string, Product>>({});

    useEffect(() => {
        const fetchProducts = async () => {
            if (!order) return;

            const fetchedProducts: Record<string, Product> = {};
            await Promise.all(
                order.items.map(async (item) => {
                    try {
                        const res = await Api.get(endpoints.getProductById(item.productId));
                        fetchedProducts[item.productId] = res.data.data;
                    } catch (err) {
                        console.error(`Error fetching product ${item.productId}:`, err);
                    }
                })
            );
            setProducts(fetchedProducts);
        };

        if (open && order) {
            fetchProducts();
        }
    }, [order, open]);

    if (!order) return null;

    const { shippingAddress, billingAddress, items, total, subtotal, tax, shipping } = order;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
                {/* Addresses */}
                <Box display="flex" justifyContent="space-between" gap={4} flexWrap="wrap" mb={2}>
                    <Box flex={1}>
                        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
                        <Typography variant="body2">{shippingAddress.street}</Typography>
                        <Typography variant="body2">{shippingAddress.city}, {shippingAddress.state}</Typography>
                        <Typography variant="body2">{shippingAddress.postalCode}, {shippingAddress.country}</Typography>
                    </Box>
                    <Box flex={1}>
                        <Typography variant="h6" gutterBottom>Billing Address</Typography>
                        <Typography variant="body2">{billingAddress.street}</Typography>
                        <Typography variant="body2">{billingAddress.city}, {billingAddress.state}</Typography>
                        <Typography variant="body2">{billingAddress.postalCode}, {billingAddress.country}</Typography>
                    </Box>
                </Box>

                <Divider />

                {/* Product Items */}
                <Typography variant="h6" mt={3} mb={1}>Products</Typography>
                <List>
                    {items.map((item) => {
                        const product = products[item.productId];
                        const productName = product?.name || "Unknown Product";
                        const image = product?.images?.[0] || "";

                        return (
                            <ListItem key={item.id} alignItems="flex-start">
                                <Avatar
                                    src={image}
                                    variant="rounded"
                                    sx={{ width: 56, height: 56, mr: 2 }}
                                />
                                <ListItemText
                                    primary={`${productName} ×${item.quantity}`}
                                    secondary={
                                        <>
                                            <Typography variant="body2">Size: {item.size}</Typography>
                                            <Typography variant="body2">Color: {item.color}</Typography>
                                            <Typography variant="body2">
                                                ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        );
                    })}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Order Summary */}
                <Box textAlign="right">
                    <Typography variant="body2">Subtotal: ₹{subtotal}</Typography>
                    <Typography variant="body2">Tax (18%): ₹{tax}</Typography>
                    <Typography variant="body2">Shipping: ₹{shipping}</Typography>
                    <Typography variant="h6">Total: ₹{total}</Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailsDialog;
