import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    IconButton,
    Divider,
    Stack,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import StarIcon from '@mui/icons-material/Star';
import Inventory2Icon from '@mui/icons-material/Inventory2';

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    sizes: string[];
    colors: string[];
    material: string;
    fit: string;
    brand: string;
    inStock: boolean;
    featured: boolean;

    onClick?: () => void;
}

export default function ProductCard({
    name,
    description,
    price,
    images,
    category,
    sizes,
    colors,
    material,
    fit,
    brand,
    inStock,
    featured,
    onClick,
}: ProductCardProps) {
    return (
        <Card className="rounded-2xl shadow-md p-4 flex flex-col gap-3 w-full max-w-3xl">
            <div className="flex justify-between items-start">
                <div className="flex gap-4 items-start">
                    {/* Product Image */}
                    <Avatar
                        src={images?.[0] || ''}
                        alt={name}
                        variant="rounded"
                        sx={{ width: 80, height: 80 }}
                        className="border"
                    />

                    {/* Product Info */}
                    <div>
                        <Typography variant="h6" className="text-gray-800">{name}</Typography>
                        <Typography variant="body2" className="text-gray-600">{description}</Typography>
                        <Typography variant="caption" className="text-gray-500">{category}</Typography>
                    </div>
                </div>

                {/* Status + Action */}
                <div className="flex items-center gap-2">
                    {featured && (
                        <Tooltip title="Featured">
                            <StarIcon className="text-yellow-500" />
                        </Tooltip>
                    )}
                    {!inStock && (
                        <Tooltip title="Out of Stock">
                            <Inventory2Icon className="text-red-500" />
                        </Tooltip>
                    )}
                    <IconButton onClick={onClick}>
                        <CheckBoxIcon className="text-blue-600" />
                    </IconButton>
                </div>
            </div>

            <Divider />

            {/* Details Section */}
            <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                    <span><strong>Price:</strong> ₹{price.toFixed(2)}</span>
                    <span><strong>Material:</strong> {material}</span>
                    <span><strong>Fit:</strong> {fit}</span>
                    <span><strong>Brand:</strong> {brand}</span>
                </div>

                {/* Sizes */}
                <div className="mt-2">
                    <Typography variant="caption" className="text-gray-500">Sizes</Typography>
                    <Stack direction="row" spacing={1} className="mt-1">
                        {sizes.map((size, idx) => (
                            <Chip key={idx} label={size} size="small" />
                        ))}
                    </Stack>
                </div>

                {/* Colors */}
                <div className="mt-2">
                    <Typography variant="caption" className="text-gray-500">Colors</Typography>
                    <Stack direction="row" spacing={1} className="mt-1">
                        {colors.map((color, idx) => (
                            <Chip
                                key={idx}
                                label={color}
                                size="small"
                                style={{
                                    backgroundColor: color,
                                    color: '#fff',
                                }}
                            />
                        ))}
                    </Stack>
                </div>
            </CardContent>
        </Card>
    );
}
