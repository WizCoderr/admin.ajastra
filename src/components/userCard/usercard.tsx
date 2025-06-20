import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Api, endpoints } from '../../api';
import  'react-toastify'
import { toast } from 'react-toastify';
interface User {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    role: string;
    address: string | null;
}

export default function UserCard() {
    const [userData, setUserData] = useState<User[]>([]);

    async function fetchUsers() {
        try {
            const res = await Api.get(endpoints.getAllUsers);
            const users = res.data.data;
            toast.success("Users fetched Successfully")
            setUserData(Array.isArray(users) ? users : []);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error(`Error is ${error}`)
            setUserData([]);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <Box display="flex" flexWrap="wrap" gap={3}>
                {userData.map((user) => (
                    <Box
                        key={user.id}
                        width={{ xs: '100%', sm: '48%', md: '31%' }}
                        mb={3}
                    >
                        <Card className="w-full shadow-md rounded-2xl text-black">
                            <CardContent>
                                <Box className="flex items-center gap-4 mb-4">
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" className="text-black">
                                            {user.fullName}
                                        </Typography>
                                        <Typography variant="body2" className="text-black">
                                            {user.email}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="space-y-1">
                                    <Typography className="text-sm text-black ">
                                        <strong>Phone:</strong> {user.phone}
                                    </Typography>
                                    <Typography className="text-sm text-black">
                                        <strong>Role:</strong> {user.role}
                                    </Typography>
                                    <Typography className="text-sm text-black">
                                        <strong>Address:</strong> {user.address || 'Not provided'}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </div>
    );
}
