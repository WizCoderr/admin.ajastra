import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
} from '@mui/material';
import { useState } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    material: string;
    fit: string;
    brand: string;
    inStock: boolean;
    featured: boolean;
}

interface Category {
    id: string;
    name: string;
    image: string;
    description: string;
    products: Product[];
}

interface Props {
    categories: Category[];
}

export default function CategoryList({ categories }: Props) {
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

    const toggleProducts = (categoryId: string) => {
        setOpenCategoryId(prev => (prev === categoryId ? null : categoryId));
    };

    return (
        <Box className="p-6">
            <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        className="rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                    >
                        {/* Image */}
                        <Box className="w-full h-[180px] flex items-center justify-center p-4">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-32 h-32 object-cover rounded-full border-2 border-gray-200 shadow"
                            />
                        </Box>

                        {/* Info */}
                        <CardContent className="text-center px-4 pb-4">
                            <Typography variant="h6" className="font-semibold">
                                {category.name}
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 mb-1">
                                {category.description}
                            </Typography>
                            <Typography variant="body2" className="text-gray-500 mb-3">
                                {category.products.length} Products
                            </Typography>

                            {/* Show Products Button */}
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => toggleProducts(category.id)}
                            >
                                {openCategoryId === category.id ? 'Hide Products' : 'Show Products'}
                            </Button>

                            {/* Product Listing */}
                            {openCategoryId === category.id && (
                                <Box className="mt-4 space-y-2">
                                    {category.products.length === 0 ? (
                                        <Typography variant="body2" className="text-gray-500">
                                            No products available.
                                        </Typography>
                                    ) : (
                                        category.products.map((product) => (
                                            <Box
                                                key={product.id}
                                                className="p-2 border border-gray-200 rounded-lg flex gap-4 items-center"
                                            >
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <Box>
                                                    <Typography className="font-semibold">{product.name}</Typography>
                                                    <Typography className="text-sm text-gray-500">
                                                        ₹{product.price}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
