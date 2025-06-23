import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Typography, FormControlLabel, Checkbox, MenuItem,
    Box, ToggleButton, ToggleButtonGroup, CircularProgress, Alert
} from '@mui/material';
import { Api, endpoints } from '../../api';
import { toast } from 'react-toastify';

interface Category {
    id: string;
    name: string;
}


const AddProduct: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageError, setImageError] = useState('');

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        material: '',
        fit: 'REGULAR',
        brand: '',
        sizes: '',
        colors: '',
        inStock: true,
        featured: false,
        categoryId: '',
        images: [] as string[], // cloudinary URLs
    });

    const fetchCategories = async () => {
        try {
            const res = await Api.get(endpoints.getAllCategories);
            setCategories(res.data.data);
        } catch (e: any) {
            toast.error(e.message || 'Error fetching categories');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setProduct({ ...product, [name]: checked });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageError('');
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const maxSize = 5 * 1024 * 1024;
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

            const oversized = files.filter(f => f.size > maxSize);
            if (oversized.length > 0) {
                setImageError(`Files too large: ${oversized.map(f => f.name).join(', ')}`);
                return;
            }

            const invalid = files.filter(f => !validTypes.includes(f.type));
            if (invalid.length > 0) {
                setImageError(`Invalid types: ${invalid.map(f => f.name).join(', ')}`);
                return;
            }

            if (files.length > 5) {
                setImageError('Maximum 5 images allowed');
                return;
            }

            setImageFiles(files);
            product.images.forEach(url => URL.revokeObjectURL(url));
            setProduct({ ...product, images: files.map(f => URL.createObjectURL(f)) });
        }
    };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.name.trim() || !product.description.trim()) {
        toast.error('Please fill in all fields');
        return;
    }

    if (imageFiles.length === 0) {
        toast.error('Please upload at least one image');
        return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
        const cloudinaryUrls: string[] = [];

        // Step 1: Upload each image to Cloudinary asynchronously
        for (let i = 0; i < imageFiles.length; i++) {
            const formData = new FormData();
            formData.append("file", imageFiles[i]);
            formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET || '');

            const cloudinaryRes = await fetch(process.env.REACT_APP_CLOUDINARY_URL || '', {
                method: 'POST',
                body: formData,
            });

            const cloudinaryData = await cloudinaryRes.json();
            console.log(`Image ${i + 1}:`, cloudinaryData);

            if (!cloudinaryData.secure_url) {
                toast.error(`Failed to upload image ${i + 1}`);
                return;
            }

            cloudinaryUrls.push(cloudinaryData.secure_url);
            setUploadProgress(Math.round(((i + 1) / imageFiles.length) * 100));
        }

        // Step 2: Submit final product data
        const payload = {
            ...product,
            images: cloudinaryUrls, // array of Cloudinary URLs
        };

        console.log("Final Payload:", payload);

        const apiRes = await Api.post(endpoints.addProduct(product.categoryId), payload);

        if (apiRes.status === 200 || apiRes.status === 201) {
            toast.success("✅ Product Added Successfully");

            // Cleanup and reset
            product.images.forEach(url => URL.revokeObjectURL(url));
            setProduct({
                name: '',
                description: '',
                price: '',
                material: '',
                fit: 'REGULAR',
                brand: '',
                sizes: '',
                colors: '',
                inStock: true,
                featured: false,
                categoryId: '',
                images: [],
            });
            setImageFiles([]);
            setUploadProgress(0);

            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } else {
            toast.error("❌ Failed to add product");
        }

    } catch (err: any) {
        console.error("Error uploading product:", err);
        toast.error(err?.message || "Something went wrong");
    } finally {
        setLoading(false);
        setUploadProgress(0);
    }
};

    useEffect(() => {
        return () => {
            product.images.forEach(url => URL.revokeObjectURL(url));
        };
    });

    return (
        <Box className="p-8 rounded-xl">
            <Typography variant="h5" className="mb-6 font-semibold text-center">
                Add New Product
            </Typography>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <TextField name="name" label="Product Name" value={product.name} onChange={handleChange} fullWidth required disabled={loading} />
                <TextField name="description" label="Description" value={product.description} onChange={handleChange} fullWidth multiline rows={3} required disabled={loading} />

                <Box className="flex flex-col md:flex-row gap-4">
                    <TextField name="price" label="Price (₹)" type="number" value={product.price} onChange={handleChange} fullWidth required disabled={loading} />
                    <TextField select name="categoryId" label="Category" value={product.categoryId} onChange={handleChange} fullWidth required disabled={loading}>
                        {categories.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
                    </TextField>
                </Box>

                <Box className="flex flex-col md:flex-row gap-4">
                    <TextField name="brand" label="Brand" value={product.brand} onChange={handleChange} fullWidth required disabled={loading} />
                    <TextField name="material" label="Material" value={product.material} onChange={handleChange} fullWidth required disabled={loading} />
                </Box>

                <Box className="flex flex-col md:flex-row gap-4">
                    <TextField name="sizes" label="Sizes (comma-separated)" value={product.sizes} onChange={handleChange} fullWidth required disabled={loading} />
                    <TextField name="colors" label="Colors (comma-separated)" value={product.colors} onChange={handleChange} fullWidth required disabled={loading} />
                </Box>

                <Box>
                    <Typography variant="body2" className="mb-1">Fit</Typography>
                    <ToggleButtonGroup value={product.fit} exclusive onChange={(e, val) => val && setProduct({ ...product, fit: val })} fullWidth>
                        <ToggleButton value="SLIM">SLIM</ToggleButton>
                        <ToggleButton value="REGULAR">REGULAR</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box className="flex gap-4">
                    <FormControlLabel control={<Checkbox checked={product.inStock} onChange={handleCheckboxChange} name="inStock" />} label="In Stock" />
                    <FormControlLabel control={<Checkbox checked={product.featured} onChange={handleCheckboxChange} name="featured" />} label="Featured" />
                </Box>

                <Box>
                    <Typography variant="body2">Upload Product Images (Max 5)</Typography>
                    <input type="file" multiple accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleImageUpload} disabled={loading} />
                    {imageError && <Alert severity="error" className="mt-2">{imageError}</Alert>}

                    <Box className="flex gap-2 mt-3 flex-wrap">
                        {product.images.map((url, idx) => (
                            <div key={idx} className="relative">
                                <img src={url} alt={`Preview ${idx + 1}`} className="w-20 h-20 object-cover rounded-md border" />
                                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">{idx + 1}</span>
                            </div>
                        ))}
                    </Box>
                </Box>

                {uploadProgress > 0 && uploadProgress < 100 && (
                    <Box>
                        <Typography variant="body2" className="mb-1">Uploading... {uploadProgress}%</Typography>
                        <Box className="w-full bg-gray-200 rounded-full h-2">
                            <Box className="bg-blue-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }} />
                        </Box>
                    </Box>
                )}

                <Button type="submit" variant="contained" disabled={loading || imageFiles.length === 0} startIcon={loading ? <CircularProgress size={20} /> : null}>
                    {loading ? 'Uploading...' : 'Add Product'}
                </Button>
            </form>
        </Box>
    );
};

export default AddProduct;
