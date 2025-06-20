import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Box,
    ToggleButton,
    ToggleButtonGroup,
    CircularProgress,
    Alert
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
        images: [] as string[],
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageError, setImageError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setProduct({ ...product, [name]: type === 'number' ? parseFloat(value) : value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setProduct({ ...product, [name]: checked });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageError('');
        
        if (e.target.files) {
            const files = Array.from(e.target.files);
            
            // Validate file size (e.g., max 5MB per file)
            const maxSize = 5 * 1024 * 1024; // 5MB
            const oversizedFiles = files.filter(file => file.size > maxSize);
            
            if (oversizedFiles.length > 0) {
                setImageError(`Files too large: ${oversizedFiles.map(f => f.name).join(', ')}. Max size is 5MB per file.`);
                return;
            }
            
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            const invalidFiles = files.filter(file => !validTypes.includes(file.type));
            
            if (invalidFiles.length > 0) {
                setImageError(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}. Only JPEG, PNG, and WebP are allowed.`);
                return;
            }
            
            // Limit number of images (e.g., max 5)
            if (files.length > 5) {
                setImageError('Maximum 5 images allowed');
                return;
            }
            
            setImageFiles(files);
            const urls = files.map(file => URL.createObjectURL(file));
            
            // Clean up old URLs to prevent memory leaks
            product.images.forEach(url => URL.revokeObjectURL(url));
            
            setProduct({ ...product, images: urls });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate images
        if (imageFiles.length === 0) {
            toast.error('Please upload at least one product image');
            return;
        }

        setLoading(true);
        setUploadProgress(0);

        const formData = new FormData();

        // Append basic fields
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price.toString());
        formData.append("material", product.material);
        formData.append("fit", product.fit);
        formData.append("brand", product.brand);
        formData.append("inStock", product.inStock.toString());
        formData.append("featured", product.featured.toString());
        formData.append("categoryId", product.categoryId);

        // Send sizes and colors as comma-separated strings (backend will parse them)
        formData.append("sizes", product.sizes);
        formData.append("colors", product.colors);

        // Append multiple images
        imageFiles.forEach((file) => {
            formData.append("images", file);
        });

        try {
            const res = await Api.post(
                endpoints.addProduct(product.categoryId),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / (progressEvent.total || 1)
                        );
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            if (res.status === 200 || res.status === 201) {
                toast.success("✅ Product Added Successfully");
                
                // Clean up URLs
                product.images.forEach(url => URL.revokeObjectURL(url));
                
                // Reset form
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
                
                // Reset file input
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            }
        } catch (e: any) {
            console.error("Upload failed", e);
            const errorMessage = e?.response?.data?.message || e?.response?.data?.error || e.message || "Unknown error";
            toast.error(`❌ Error: ${errorMessage}`);
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    // Clean up URLs when component unmounts
    useEffect(() => {
        return () => {
            product.images.forEach(url => URL.revokeObjectURL(url));
        };
    });

    return (
        <div className="">
            <Box className="p-8 rounded-xl">
                <Typography variant="h5" className="mb-6 font-semibold text-center">
                    Add New Product
                </Typography>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Product Name"
                        value={product.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={loading}
                    />

                    <TextField
                        name="description"
                        label="Description"
                        value={product.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        required
                        disabled={loading}
                    />

                    <div className="flex flex-col md:flex-row gap-4">
                        <TextField
                            name="price"
                            label="Price (₹)"
                            type="number"
                            value={product.price}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                            inputProps={{ min: 0, step: 0.01 }}
                        />
                        <TextField
                            select
                            name="categoryId"
                            label="Category"
                            value={product.categoryId}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <TextField
                            name="brand"
                            label="Brand"
                            value={product.brand}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                        />
                        <TextField
                            name="material"
                            label="Material"
                            value={product.material}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <TextField
                            name="sizes"
                            label="Sizes (comma-separated, e.g., S, M, L)"
                            value={product.sizes}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                            placeholder="S, M, L, XL"
                        />
                        <TextField
                            name="colors"
                            label="Colors (comma-separated, e.g., Red, Blue)"
                            value={product.colors}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                            placeholder="Red, Blue, Green"
                        />
                    </div>

                    <div className="mb-4">
                        <Typography variant="body2" className="mb-1 font-medium">
                            Fit
                        </Typography>
                        <ToggleButtonGroup
                            value={product.fit}
                            exclusive
                            onChange={(e, newFit) => {
                                if (newFit !== null) {
                                    setProduct({ ...product, fit: newFit });
                                }
                            }}
                            fullWidth
                            color="primary"
                            disabled={loading}
                        >
                            <ToggleButton value="SLIM">SLIM</ToggleButton>
                            <ToggleButton value="REGULAR">REGULAR</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <div className="flex gap-4">
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={product.inStock} 
                                    onChange={handleCheckboxChange} 
                                    name="inStock" 
                                    disabled={loading}
                                />
                            }
                            label="In Stock"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={product.featured} 
                                    onChange={handleCheckboxChange} 
                                    name="featured" 
                                    disabled={loading}
                                />
                            }
                            label="Featured"
                        />
                    </div>

                    <div>
                        <Typography variant="body2" className="mb-1">
                            Upload Product Images (Max 5 images, 5MB each)
                        </Typography>
                        <input 
                            className='text-black text-justify rounded-2xl p-2 font-semibold cursor-pointer w-full border-2 border-gray-300 hover:border-gray-400' 
                            type="file" 
                            multiple 
                            accept="image/jpeg,image/jpg,image/png,image/webp" 
                            onChange={handleImageUpload}
                            disabled={loading}
                        />
                        
                        {imageError && (
                            <Alert severity="error" className="mt-2">
                                {imageError}
                            </Alert>
                        )}
                        
                        <div className="flex gap-2 mt-3 flex-wrap">
                            {product.images.map((url, idx) => (
                                <div key={idx} className="relative">
                                    <img
                                        src={url}
                                        alt={`Preview ${idx + 1}`}
                                        className="w-20 h-20 object-cover rounded-md border"
                                    />
                                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                        {idx + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <Box className="w-full">
                            <Typography variant="body2" className="mb-1">
                                Uploading... {uploadProgress}%
                            </Typography>
                            <Box className="w-full bg-gray-200 rounded-full h-2">
                                <Box 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </Box>
                        </Box>
                    )}

                    <Button 
                        variant="contained" 
                        type="submit" 
                        className="!bg-green-600 hover:!bg-green-700"
                        disabled={loading || imageFiles.length === 0}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? 'Uploading...' : 'Add Product'}
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default AddProduct;