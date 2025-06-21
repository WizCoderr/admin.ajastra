import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    setToken,
    endpoints,
    Api,
    setRole
} from '../api/index';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function Login() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Validate all fields
        if (!username || !email || !phoneNumber || !password) {
            alert("All fields are required");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Validate phone number (basic validation)
        if (phoneNumber.length < 10) {
            alert("Please enter a valid phone number");
            return;
        }

        setLoading(true);
        try {
            const res = await Api.post(endpoints.adminRegister, {
                fullname: username,
                phoneNumber: phoneNumber,
                email: email,
                password,
            });
            console.log(res.data.data.token)
            setToken(res.data.data.token);
            setRole(res.data.data.user.role);
            toast.success(res.data.message)
            navigate('/dashboard');
        } catch (e) {
            setLoading(false);
            console.error(`Error: ${e}`);
            toast.error(`Error: ${e || 'Something went wrong'}`);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                width: '100%',
                minHeight: isMobile ? 'auto' : '100vh',
                bgcolor: '#fefefe',
            }}
        >

            {/* Right Form */}
            <Box
                sx={{
                    flex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'linear-gradient(45deg, white, rgb(254,239,231))',
                    py: isMobile ? 6 : 0,
                    px: 4,
                }}
                color={theme.palette.text.primary}
            >
                <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>

                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="body2" mr={1}>
                            Login as Admin
                        </Typography>
                    </Box>

                    <TextField
                        label="Full Name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                        disabled={loading}
                        sx={{
                            mt: 2,
                            backgroundColor: '#000',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: '#222',
                            },
                        }}
                    >
                        {loading ? 'Logging in...' : `Login as Admin`}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
