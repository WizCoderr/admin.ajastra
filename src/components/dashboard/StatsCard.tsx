import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ReactElement;
    iconColor: string;
    chartData: { day: string; value: number }[]; // <-- Accepting chart data here
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, iconColor, chartData }) => (
    <Card className="relative overflow-hidden">
        <CardContent>
            <Typography color="textSecondary" gutterBottom className="text-sm">
                {title}
            </Typography>
            <Typography variant="h4" component="div" className="font-bold mb-2">
                {value}
            </Typography>
            <Box className="flex items-center">
                {icon}
                <Typography className={`${iconColor} text-sm`}>{change}</Typography>
            </Box>
            <Box className="absolute -bottom-4 -right-4 w-28 h-20">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="day" hide />
                        <Tooltip
                            contentStyle={{ fontSize: 12 }}
                            formatter={(value) => [`₹${value}`, 'Sales']}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </CardContent>
    </Card>
);

export default StatsCard;
