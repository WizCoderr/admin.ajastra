import { Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { EyeIcon } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';
import { Api, endpoints } from '../../api';
import { useEffect, useState } from 'react';
import { Order } from '../../types/order/orders';

const Dashboard = () => {
    const [categoryCount, setCategoryCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [orderData, setOrders] = useState<Order[]>([]);

    const visitorData = [
        { day: 'Mon', value: 120 },
        { day: 'Tue', value: 180 },
        { day: 'Wed', value: 150 },
        { day: 'Thu', value: 200 },
        { day: 'Fri', value: 250 },
        { day: 'Sat', value: 300 },
        { day: 'Sun', value: 400 },
    ];

    const chartData = orderData.map((order) => {
        const date = new Date(order.createdAt);
        const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return { day, value: order.total };
    });

    const ordersTrendData = orderData.map((order) => {
        const date = new Date(order.createdAt);
        const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return { day, value: 1 };
    });

    const orderCountsByDay = ordersTrendData.reduce((acc, curr) => {
        const existing = acc.find((d) => d.day === curr.day);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ ...curr });
        }
        return acc;
    }, [] as { day: string; value: number }[]);

    const fetchData = async () => {

        await Api.get(endpoints.getAllCategories).then((res) => {
            setCategoryCount(res.data.data.length);

        })
        await Api.get(endpoints.AllProducts).then((res) => {
            setProductCount(res.data.data.length);

        })
        await Api.get(endpoints.getAllOrders).then((res) => {
            setOrders(res.data?.data ?? []); // fallback to empty array if undefined
        
        })
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box className="p-6 bg-gray-50 min-h-screen">
            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                <StatsCard
                    title="Total Sales"
                    value={`₹${chartData.reduce((sum, d) => sum + d.value, 0).toFixed(2)}`}
                    change={
                        chartData.length > 1
                            ? `↑ ${(
                                ((chartData[chartData.length - 1].value -
                                    chartData[chartData.length - 2].value) /
                                    chartData[chartData.length - 2].value) *
                                100
                            ).toFixed(1)}%`
                            : '↑ 0%'
                    }
                    icon={<TrendingUpIcon className="text-green-500 text-sm mr-1" />}
                    iconColor="text-green-500"
                    chartData={chartData}
                />

                <StatsCard
                    title="Total Visitors"
                    value="1,600"
                    change={
                        visitorData.length > 1
                            ? `↑ ${(
                                ((visitorData[visitorData.length - 1].value -
                                    visitorData[visitorData.length - 2].value) /
                                    visitorData[visitorData.length - 2].value) *
                                100
                            ).toFixed(1)}%`
                            : '↑ 0%'
                    }
                    icon={<EyeIcon className="text-blue-500 text-sm mr-1" />}
                    iconColor="text-blue-500"
                    chartData={visitorData}
                />

                <StatsCard
                    title="Total Orders"
                    value={orderData.length.toString()}
                    change={
                        orderCountsByDay.length > 1 && orderCountsByDay[orderCountsByDay.length - 2].value !== 0
                            ? `↑ ${(
                                ((orderCountsByDay[orderCountsByDay.length - 1].value -
                                    orderCountsByDay[orderCountsByDay.length - 2].value) /
                                    orderCountsByDay[orderCountsByDay.length - 2].value) *
                                100
                            ).toFixed(1)}%`
                            : '↑ 0%'
                    }
                    icon={<TrendingUpIcon className="text-green-500 text-sm mr-1" />}
                    iconColor="text-green-500"
                    chartData={orderCountsByDay}
                />

            </Box>

            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                <StatsCard
                    title="Total Collections"
                    value={categoryCount.toString()}
                    change={categoryCount > 1 ? `↑ 100%` : '↑ 0%'}
                    icon={<TrendingUpIcon className="text-green-500 text-sm mr-1" />}
                    iconColor="text-green-500"
                    chartData={[]}
                />

                <StatsCard
                    title="Total Products"
                    value={productCount.toString()}
                    change={productCount > 1 ? `↑ 100%` : '↑ 0%'}
                    icon={<TrendingUpIcon className="text-green-500 text-sm mr-1" />}
                    iconColor="text-green-500"
                    chartData={[]}
                />
            </Box>
        </Box>
    );
};

export default Dashboard;