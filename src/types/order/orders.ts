export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    categoryId: string;
    sizes: string[];
    colors: string[];
    material: string;
    fit: 'SLIM' | 'REGULAR';
    brand: string;
    inStock: boolean;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
    address?: Address | null;
    password?: string;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
    createdAt: string;
    product?: Product;
}

export interface Order {
    id: string;
    userId: string;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    status:
        | 'PENDING'
        | 'PROCESSING'
        | 'SHIPPED'
        | 'DELIVERED'
        | 'CANCELLED'
        | 'REFUNDED';
    shippingAddress: Address;
    billingAddress: Address;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
    user: User;
}
