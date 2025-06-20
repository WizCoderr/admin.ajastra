import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/products/seeProducts'
import { Api, endpoints } from '../../api';

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

export default function AllProductPage() {
    const [products, setProducts] = useState<ProductCardProps[]>([]);

    const fetchProducts = async () => {
        try {
            const res = await Api.get(endpoints.AllProducts);
            setProducts(res.data.data);
        } catch (error) {
            // handle error if needed
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>All Products</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {products.map((product, idx) => (
                    <ProductCard key={idx} {...product} />
                ))}
            </div>
        </div>
    );
}
