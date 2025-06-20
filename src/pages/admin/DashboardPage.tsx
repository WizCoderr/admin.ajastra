import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    CheckCircleOutline,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Dashboard: React.FC = () => {
    // Sample data for the line chart
    const chartData = [
        { name: 'Jan', 2018: 45, 2019: 38 },
        { name: 'Feb', 2018: 52, 2019: 42 },
        { name: 'March', 2018: 48, 2019: 35 },
        { name: 'April', 2018: 58, 2019: 40 },
        { name: 'May', 2018: 50, 2019: 48 },
        { name: 'June', 2018: 42, 2019: 38 },
        { name: 'July', 2018: 55, 2019: 45 },
        { name: 'Aug', 2018: 60, 2019: 52 },
    ];

    // Sample data for recent orders
    const recentOrders = [
        { id: 1, product: 'Jordan 13', customer: 'Michael Jordan', orderNo: '23941432', total: '£22.98', status: 'Delivered' },
        { id: 2, product: 'Adidas Superstar', customer: 'Dennis Nedman', orderNo: '12986372', total: '£84.64', status: 'Processing' },
        { id: 3, product: 'Nike Air Force 1', customer: 'Patrick Ewing', orderNo: '87640397', total: '£45.99', status: 'Order Placed' },
        { id: 4, product: 'Nike Air Max 90', customer: 'Lebron James', orderNo: '76234985', total: '£47.22', status: 'Processing' },
        { id: 5, product: 'Adidas Yeezy', customer: 'Anthony Davis', orderNo: '12037745', total: '£86.99', status: 'Delivered' },
    ];

    // Sample data for activity feed
    const activities = [
        { id: 1, user: 'Peter', action: 'reviewed Nike Air Force 1', time: '3 hours ago', avatar: '/api/placeholder/40/40' },
        { id: 2, user: 'Peter', action: 'requested review on Adidas Superstar', time: '8 hours ago', avatar: '/api/placeholder/40/40' },
        { id: 3, user: 'Jane', action: 'added 9 new products', time: '1 day ago', avatar: '/api/placeholder/40/40' },
        { id: 4, user: 'John', action: 'added 3 new products', time: '7 hours ago', avatar: '/api/placeholder/40/40' },
        { id: 5, user: 'Jane', action: 'added 4 new products', time: '8 hours ago', avatar: '/api/placeholder/40/40' },
    ];

    // Sample data for tasks
    const tasks = [
        { id: 1, task: 'Add new collection', completed: true },
        { id: 2, task: 'Remove Adidas Stan Smith Product', completed: false },
        { id: 3, task: 'Review New Products', completed: false },
        { id: 4, task: 'Check Reviews', completed: false },
        { id: 5, task: 'Generate new reports', completed: false },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'success';
            case 'Processing':
                return 'warning';
            case 'Order Placed':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Box className="p-6 bg-gray-50 min-h-screen">
            {/* Stats Cards */}
            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="relative overflow-hidden">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom className="text-sm">
                            Total Sales
                        </Typography>
                        <Typography variant="h4" component="div" className="font-bold mb-2">
                            £69,534
                        </Typography>
                        <Box className="flex items-center">
                            <TrendingUp className="text-green-500 text-sm mr-1" />
                            <Typography className="text-green-500 text-sm">7%</Typography>
                        </Box>
                        <Box className="absolute -bottom-4 -right-4 w-24 h-24">
                            <svg viewBox="0 0 100 50" className="w-full h-full text-green-500 opacity-20">
                                <path d="M 0,40 Q 25,20 50,30 T 100,25" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </Box>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom className="text-sm">
                            Total Expenses
                        </Typography>
                        <Typography variant="h4" component="div" className="font-bold mb-2">
                            £11,233
                        </Typography>
                        <Box className="flex items-center">
                            <TrendingDown className="text-red-500 text-sm mr-1" />
                            <Typography className="text-red-500 text-sm">26%</Typography>
                        </Box>
                        <Box className="absolute -bottom-4 -right-4 w-24 h-24">
                            <svg viewBox="0 0 100 50" className="w-full h-full text-red-500 opacity-20">
                                <path d="M 0,25 Q 25,40 50,30 T 100,40" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </Box>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom className="text-sm">
                            Total Visitors
                        </Typography>
                        <Typography variant="h4" component="div" className="font-bold mb-2">
                            155K
                        </Typography>
                        <Box className="flex items-center">
                            <TrendingUp className="text-green-500 text-sm mr-1" />
                            <Typography className="text-green-500 text-sm">25%</Typography>
                        </Box>
                        <Box className="absolute -bottom-4 -right-4 w-24 h-24">
                            <svg viewBox="0 0 100 50" className="w-full h-full text-green-500 opacity-20">
                                <path d="M 0,40 Q 25,20 50,30 T 100,25" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </Box>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom className="text-sm">
                            Total Orders
                        </Typography>
                        <Typography variant="h4" component="div" className="font-bold mb-2">
                            4234
                        </Typography>
                        <Box className="flex items-center">
                            <TrendingUp className="text-green-500 text-sm mr-1" />
                            <Typography className="text-green-500 text-sm">16%</Typography>
                        </Box>
                        <Box className="absolute -bottom-4 -right-4 w-24 h-24">
                            <svg viewBox="0 0 100 50" className="w-full h-full text-gray-300">
                                <rect x="10" y="30" width="10" height="20" fill="currentColor" />
                                <rect x="25" y="20" width="10" height="30" fill="currentColor" />
                                <rect x="40" y="25" width="10" height="25" fill="currentColor" />
                                <rect x="55" y="15" width="10" height="35" fill="currentColor" />
                                <rect x="70" y="22" width="10" height="28" fill="currentColor" />
                                <rect x="85" y="18" width="10" height="32" fill="currentColor" />
                            </svg>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Charts and Activity Section */}
            <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Recent Report Chart */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom className="font-semibold">
                            Recent Report
                        </Typography>
                        <Box className="h-64 mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="2018" stroke="#10b981" strokeWidth={2} />
                                    <Line type="monotone" dataKey="2019" stroke="#3b82f6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card className="h-full">
                    <CardContent>
                        <Typography variant="h6" gutterBottom className="font-semibold">
                            Activity Feed
                        </Typography>
                        <List>
                            {activities.map((activity) => (
                                <ListItem key={activity.id} className="px-0">
                                    <ListItemAvatar>
                                        <Avatar src={activity.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2">
                                                <span className="font-semibold">{activity.user}</span> {activity.action}
                                            </Typography>
                                        }
                                        secondary={activity.time}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>

            {/* Orders and Tasks Section */}
            <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders - Takes 2 columns */}
                <Box className="lg:col-span-2">
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom className="font-semibold">
                                Recent Orders
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell>Order No.</TableCell>
                                            <TableCell>Total</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentOrders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell>
                                                    <Box className="flex items-center">
                                                        <Box className="w-10 h-10 bg-gray-200 rounded mr-3" />
                                                        <Typography variant="body2">{order.product}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{order.customer}</TableCell>
                                                <TableCell>{order.orderNo}</TableCell>
                                                <TableCell className="font-semibold">{order.total}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={order.status}
                                                        color={getStatusColor(order.status)}
                                                        size="small"
                                                        variant={order.status === 'Delivered' ? 'filled' : 'outlined'}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>

                {/* Tasks - Takes 1 column */}
                <Box>
                    <Card className="h-full">
                        <CardContent>
                            <Typography variant="h6" gutterBottom className="font-semibold">
                                Tasks
                            </Typography>
                            <List>
                                {tasks.map((task) => (
                                    <ListItem key={task.id} className="px-0">
                                        <Checkbox
                                            checked={task.completed}
                                            color="primary"
                                            icon={<Box className="w-5 h-5 border-2 border-gray-300 rounded" />}
                                            checkedIcon={<CheckCircleOutline className="text-green-500" />}
                                        />
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body2"
                                                    className={task.completed ? 'line-through text-gray-500' : ''}
                                                >
                                                    {task.task}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;