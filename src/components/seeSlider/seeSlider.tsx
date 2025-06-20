import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Api, endpoints } from '../../api';

interface ISlider {
    id: string;
    image: string;
}

export default function SeeSlider() {
    const [sliders, setSliders] = useState<ISlider[]>([]);

    const getSliders = async () => {
        try {
            const res = await Api.get(endpoints.getSlider);
            setSliders(res.data.data);
        } catch (error) {
            console.error("Error fetching sliders:", error);
        }
    };

    const handleDelete = async (id: string) => {
        console.log(id)
        const confirmDelete = window.confirm("Are you sure you want to delete this slider?");
        if (!confirmDelete) return;

        try {
            await Api.delete(endpoints.deleteSlider(id));
            setSliders((prev) => prev.filter((s) => s.id !== id));
        } catch (error) {
            console.error("Failed to delete slider:", error);
        }
    };

    useEffect(() => {
        getSliders();
    }, []);

    return (
        <Box className="py-10 min-h-screen bg-gray-100 overflow-x-hidden">
            <Typography variant="h4" className="text-center text-gray-900 mb-8">Manage Sliders</Typography>
            <Box className="flex flex-wrap gap-6 justify-center">
                {sliders.length === 0 ? (
                    <Typography className="text-gray-600">No sliders available.</Typography>
                ) : (
                    sliders.map((slider) => (
                        <Box
                            key={slider.id}
                            className="w-[300px] bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden"
                        >
                            <Box
                                className="h-48 bg-cover "
                                style={{ backgroundImage: `url(${slider.image})` }}
                            />
                            <Box className="p-4">
                                <img src={slider.image} alt={slider.id}/>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={() => handleDelete(slider.id)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    );
}
