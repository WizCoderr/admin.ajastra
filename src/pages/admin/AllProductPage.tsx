import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/products/seeProducts'
import { Api, endpoints } from '../../api';


interface ProductCardProps {
    id: string;
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
}

export default function AllProductPage() {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const updateStock = async (product: ProductCardProps) => {
        try {
            const updatedProduct = {
                ...product,
                inStock: !product.inStock,
            };

            await Api.put(endpoints.updateStock(product.id), {
                inStock: updatedProduct.inStock,
            });

            // Update the product in the local state
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                    p.id === product.id ? { ...p, inStock: updatedProduct.inStock } : p
                )
            );

            alert(`Product "${product.name}" is now marked as ${updatedProduct.inStock ? 'In Stock' : 'Out of Stock'}`);
        } catch (error) {
            console.error('Failed to update stock:', error);
            alert('Failed to update product stock');
        }
    };

    const updateFeatured = async(product:ProductCardProps)=>{
        try {
            const updatedProduct = {
                ...product,
                featured: !product.featured,
            };

            await Api.put(endpoints.updateFeatured(product.id), {
                featured: updatedProduct.featured,
            });

            // Update the product in the local state
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                    p.id === product.id ? { ...p, featured: updatedProduct.featured } : p
                )
            );

            alert(`Product "${product.name}" is now marked as ${updatedProduct.featured ? 'Featured' : 'Normal Product'}`);
        } catch (error) {
            console.error('Failed to update stock:', error);
            alert('Failed to update product featured');
        }
    };

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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {products.map((product, idx) => (
                    <ProductCard key={idx} {...product} handleStock={() => { updateStock(product) }} handleFeatured={()=>{updateFeatured(product)}}/>
                ))}
            </div>
        </div>
    );
}
