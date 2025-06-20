import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Api, endpoints } from '../../api';
import { Upload } from 'lucide-react';

function AddSlider() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!image) {
            alert('Please fill all fields');
            return;
        }
        const fromData = new FormData();
        fromData.append('image', image)
        await Api.post(endpoints.addSlider, fromData).then(() => {
            alert("Data Added Successfully")   
            setImage(null);
        }).catch((e) => {
            alert(`Error happened: ${e}`)
        })
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 4 }}>
            <Typography variant="h5" gutterBottom>Add New Slider</Typography>

            <Button
                variant="contained"
                component="label"
                startIcon={<Upload/>}
                sx={{ mt: 2 }}
            >
                Upload Image
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </Button>

            {preview && (
                <Box mt={2}>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            padding: '3px',
                            objectFit: 'cover',
                            border: '2px solid #000',
                        }}
                    />
                </Box>
            )}

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{ mt: 3 }}
            >
                Submit
            </Button>
        </Box>
    );
}
export { AddSlider }