import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ProductsResponse } from '../../core/types/Product';
import { makeRequest } from '../../core/utils/request';
import ProductCard from './components/ProductCard';
import './styles.scss'

const Catalog = () => {
    const[productsResponse, setProductResponse] = useState<ProductsResponse>();

    console.log(productsResponse);

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPages: 12
        }

        makeRequest({ url: '/products', params})
        .then(response => setProductResponse(response.data));

    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de produto
            </h1>
            <div className="catalog-products">
                {productsResponse?.content.map(product => (
                <Link to={`/products/${product.id}`} key={product.id}>
                    <ProductCard product={product}/>
                </Link>
                ))}
            </div>
    
        </div>
    )
}

export default Catalog;