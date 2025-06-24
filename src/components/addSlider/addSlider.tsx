import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Api, endpoints } from '../../api';
import { Upload } from 'lucide-react';

function AddSlider() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<'image' | 'video' | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const type = selectedFile.type.startsWith('image')
                ? 'image'
                : selectedFile.type.startsWith('video')
                ? 'video'
                : null;

            if (!type) {
                alert('Only image or video files are allowed.');
                return;
            }

            setFile(selectedFile);
            setFileType(type);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async () => {
        if (!file || !fileType) {
            alert('Please upload an image or video.');
            return;
        }

        try {
            // 1. Upload to Cloudinary
            const cloudFormData = new FormData();
            cloudFormData.append('file', file);
            cloudFormData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET||'');

            const cloudRes = await fetch(process.env.REACT_APP_CLOUDINARY_URL|| '', {
                method: 'POST',
                body: cloudFormData,
            });

            const cloudData = await cloudRes.json();

            if (!cloudData.secure_url) {
                throw new Error('Failed to upload to Cloudinary');
            }

            // 2. Submit URL to your backend
            const backendPayload = {
                mediaUrl: cloudData.secure_url,
                mediaType: fileType,
            };

            await Api.post(endpoints.addSlider, backendPayload);
            alert("Media added successfully");

            setFile(null);
            setPreview(null);
            setFileType(null);
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 4 }}>
            <Typography variant="h5" gutterBottom>Add New Slider</Typography>

            <Button
                variant="contained"
                component="label"
                startIcon={<Upload />}
                sx={{ mt: 2 }}
            >
                Upload Image or Video
                <input
                    type="file"
                    hidden
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                />
            </Button>

            {preview && (
                <Box mt={2}>
                    {fileType === 'image' ? (
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid #000',
                            }}
                        />
                    ) : (
                        <video
                            src={preview}
                            controls
                            style={{ width: '100%', maxHeight: 300, border: '2px solid #000' }}
                        />
                    )}
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

export { AddSlider };
