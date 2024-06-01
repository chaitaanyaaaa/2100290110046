import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProducts();
            setProducts(data);
            setFilteredProducts(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = products;
        if (filters.category) {
            filtered = filtered.filter(product => product.category === filters.category);
        }
        if (filters.company) {
            filtered = filtered.filter(product => product.company === filters.company);
        }
        if (filters.rating) {
            filtered = filtered.filter(product => product.rating >= filters.rating);
        }
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(product => product.price >= min && product.price <= max);
        }
        if (filters.availability) {
            filtered = filtered.filter(product => product.availability === (filters.availability === 'inStock'));
        }
        setFilteredProducts(filtered);
    }, [filters, products]);

    return (
        <div className="all-products">
            <Filter onFilterChange={setFilters} />
            <div className="product-list">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
