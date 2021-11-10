import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, View, Text, ImageSourcePropType } from 'react-native';
import { ProductCard, SearchInput } from '../components';
import { api } from '../services';
import { theme } from '../styles';

interface ProductsData {
    id: number,
    name: string,
    imgUrl: ImageSourcePropType,
    price: Number,
    route: {params: {id: Number}}
}

const Catalog: React.FC<ProductsData> = () => {
    const [ search, setSearch ] = useState("");
    const [ products, setProducts ] = useState<ProductsData[]>([]);
    const [ loading, setLoading ] = useState(false);

    async function fillProducts() { 
        setLoading(true);
        const  res = await api.get(`/products?page=0&linesPerPages=12&direction=ASC&orderBy=name`);
        setProducts(res.data.content);
        setLoading(false);
    }
   
    useEffect(() => {
        fillProducts();
    }, [])

    const data = search.length > 0 ?
    products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())) : products;

    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            <SearchInput 
                placeholder="Nome do produto" 
                search={search}
                setSearch={setSearch}
            />

            {loading ? (
                    <ActivityIndicator size="large" color="#9E9E9E" />
                ) :
                data.map((product) => (
                    <ProductCard {...product} key={product.id}/>
            ))}

        </ScrollView>
    )
};

export default Catalog;