import React from 'react'
import usercard from '../../components/userCard/usercard'
import { Box } from '@mui/material'
export default function CustomersPage() {
    const UserCard = usercard;
    return (
        <Box>
            <UserCard/>
        </Box>
    )
}
