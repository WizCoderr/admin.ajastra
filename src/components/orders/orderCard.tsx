import {Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
    id: string;
    customer: string;
    email: string;
    status: string;
    total: number;
    date: string;
    itemCount: number;
    onClick?: () => void;
}

const OrderRow: React.FC<Props> = ({
    id,
    customer,
    email,
    status,
    total,
    date,
    onClick,
}) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
                py: 2,
                borderBottom: "1px solid #e0e0e0",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f9f9f9" },
            }}
            onClick={onClick}
        >
            <Box width="20%">
                <Typography variant="body2">{id.slice(-6)}</Typography>
            </Box>

            <Box width="30%">
                <Stack spacing={0.5}>
                    <Typography variant="body2" fontWeight={500}>{customer}</Typography>
                    <Typography variant="caption" color="textSecondary">{email}</Typography>
                </Stack>
            </Box>

            <Box width="15%">
                <Chip
                    label={status}
                    color={
                        status === "PAID"
                            ? "primary"
                            : status === "DELIVERED"
                                ? "success"
                                : status === "CANCELLED"
                                    ? "error"
                                    : "default"
                    }
                    variant="outlined"
                    size="small"
                />
            </Box>

            <Box width="15%">
                <Typography variant="body2">₹{total}</Typography>
            </Box>

            <Box width="15%">
                <Typography variant="body2" color="textSecondary">{new Date(date).toLocaleDateString()}</Typography>
            </Box>
        </Stack>
    );
};

export default OrderRow;
