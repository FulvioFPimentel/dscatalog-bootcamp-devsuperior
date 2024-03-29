import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';
import { Category, ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import Card from '../Card'
import CardLoader from '../loaders/ProductCardLoader'
import './styles.scss'

const List = () => {
    const[productsResponse, setProductResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();
    const history = useHistory();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPages: 4,
            direction: 'DESC',
            name,
            categoryId: category?.id,
            orderBy: 'id'
        }

        setIsLoading(true);
        makeRequest({ url: '/products', params})
            .then(response => setProductResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })

    },[activePage, name, category])
    
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name)
    };

    const handleChangeCategory = (category: Category ) => {
        setActivePage(0);
        setCategory(category);
    };

    const clearFilters = () => {
        setActivePage(0);
        setCategory(undefined);
        setName('');
    }

    const onRemove = (productId: number) => {
        
        const confirm = window.confirm('Deseja realmente excluir este produto?')
        
        if (confirm) {
            makePrivateRequest({ url: `/products/${productId}`,  method: 'DELETE' })
                .then(() =>  {
                    toast.info('Producto removido com sucesso!');
                    getProducts();
                })
                .catch(() => {
                    toast.error('Erro ao remover o produto!')
                })
        }
    }

    return (
        <div className="admin-products-list" >

            <div className="admin-products-add" >
 
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                    ADICIONAR
                </button>

                <div className="admin-products-filters">
                    <ProductFilters 
                        name={name}
                        category={category}
                        handleChangeName={handleChangeName}
                        handleChangeCategory={handleChangeCategory}
                        clearFilters={clearFilters}
                    />
                </div>
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />

                    ))
                )}
                {productsResponse && (
                    <Pagination 
                        totalPages={productsResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                />)}
            </div>
        </div>
    ) 
}

export default List;