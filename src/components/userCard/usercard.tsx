import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import { Api, endpoints } from '../../api';
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
            toast.success("Users fetched Successfully");
            setUserData(Array.isArray(users) ? users : []);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error(`Error is ${error}`);
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
                    <Card
                        key={user.id}
                        sx={{
                            backgroundColor: '#111',
                            color: '#fff',
                            borderRadius: '16px',
                            width: 200,
                            textAlign: 'center',
                            paddingY: 2,
                        }}
                    >
                        <CardContent>
                            <Avatar
                                src=''
                                sx={{
                                    width: 64,
                                    height: 64,
                                    marginX: 'auto',
                                    marginBottom: 2,
                                }}
                            />
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                {user.fullName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#aaa' }}>
                                {user.email}
                            </Typography>
                            <br />
                            <Typography variant="body2" sx={{ color: '#aaa' }}>
                                {user.address || 'No Address Provided'}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </div>
    );
}
