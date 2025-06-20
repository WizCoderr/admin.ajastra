import React, { useState } from 'react';
import {
    Dialog,
    TextField,
    Button,
    Box,
    Avatar,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { Api, endpoints } from '../../api';

export default function AddCategoryPopup({ open = true, onClose = () => { } }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!name.trim() || !description.trim()) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const form = new FormData();
            form.append("name", name);
            if (image) {
                form.append("category_img", image);
            } else {
                toast("Please select an image.");
                return;
            } form.append("description", description)
            console.log('Category data:', { name, description, image });
            await Api.post(endpoints.addCategory,form).then((res)=>{
                toast.success("Category Added Successfully")
                console.log("Category Added Successfully")
            }).catch((e)=>{
                toast.error("Error in adding category");
                console.log(`Error: ${e}`)
            })
            setName('');
            setDescription('');
            setImage(null);
            setPreview('');
            onClose();
        } catch (e) {
            alert('Something went wrong');
            console.error(e);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                className: 'bg-gray-900 rounded-2xl p-8 border border-gray-700',
            }}
            BackdropProps={{
                className: 'bg-black bg-opacity-80',
            }}
        >
            {/* Close Button */}
            <IconButton
                onClick={onClose}
                className="!absolute !top-4 !right-4 text-gray-400 hover:text-white"
            >
                <CloseIcon />
            </IconButton>

            {/* Form Content */}
            <Box className="space-y-6">
                <Typography
                    variant="h6"
                    className="text-black font-semibold text-center"
                >
                    Add New Category
                </Typography>

                <TextField
                    fullWidth
                    placeholder="Category Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    fullWidth
                    placeholder="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Box className="flex items-center justify-between flex-wrap gap-4 mt-4">
                    <Box className="flex flex-col items-center gap-2">
                        <Avatar
                            src={preview}
                            className="w-20 h-20 bg-gray-700 border-2 border-gray-600"
                        />
                        <label className="cursor-pointer px-4 py-1.5 text-md border border-gray-600 rounded-xl text-black  hover:text-white hover:bg-black transition">
                            Upload
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                hidden
                            />
                        </label>
                    </Box>

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        className="!bg-blue-600 hover:!bg-blue-700 text-white px-6 py-2 rounded-xl normal-case"
                    >
                        Add Category
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}
