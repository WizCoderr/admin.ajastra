import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Api, endpoints } from '../../api';

interface ISlider {
    id: string;
    image: string; // previously `image`
    mediaType: 'image' | 'video';
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
                            className="rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                        >
                            <Box className="h-48 overflow-hidden bg-black ">
                                {slider.mediaType === 'image' ? (
                                    <Box className="w-full h-[180px] flex items-center justify-center p-4">
                                        <img
                                            src={slider.image}
                                            alt=''
                                            className="w-32 h-32 object-cover rounded-full border-2 border-gray-200 shadow"
                                        />
                                    </Box>
                                ) : (
                                    <Box className="w-full h-[180px] flex items-center justify-center p-4">
                                        <video
                                            src={slider.image}
                                            controls
                                            className="w-32 h-32 object-cover border-2 border-gray-200 shadow"
                                        />
                                    </Box>
                                )}
                            </Box>
                            <Box className="p-4">
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
