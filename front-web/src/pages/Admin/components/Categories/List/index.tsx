import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useCallback, useEffect, useState } from 'react';
import { CategoriesResponse } from 'core/types/Product';
import Card from '../Card'
import Pagination from 'core/components/Pagination';
import { toast } from 'react-toastify';
import CardForm from '../CardForm';

const List = () => {
    const [ categoryResponse, setCategoryResponse ] = useState<CategoriesResponse>();
    const [ activePage, setActivePage] = useState(0);
    const [ categoryCreate, setCategoryCreate] = useState(false);

    const getCategory = useCallback(() => {

        const params = {
            page: activePage,
            linesPerPages: 5,
            direction: 'DESC',
            orderBy:'id'
        }

        makeRequest({ url: '/categories', params})
        .then(response => setCategoryResponse(response.data))

    }, [activePage])

    useEffect(() => {
        getCategory();
    },[getCategory])

    const Create = () => {
        setCategoryCreate(true)
    }

    const onRemove = (categoryId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este categoria?')

        if (confirm){

            makePrivateRequest({ url: `/categories/${categoryId}`,  method: 'DELETE' })
                .then(() =>  {
                    toast.info('Categoria removido com sucesso!');
                    getCategory();
                })
                .catch(() => {
                    toast.error('Antes de excluir uma categoria, verifique se o mesmo não está associado a nenhum produto')
                })
        }
    }

    const onChangeCategory = (data: string) => {
        const payload = {
            name: data
        }
        makePrivateRequest({ url: '/categories', method: 'POST', data: payload})
            .then(() =>  {
                toast.info('Categoria salva com sucesso!');
                setCategoryCreate(false)
                getCategory();
            })
            .catch(() => {
                toast.error('Erro ao salvar a categoria!')
            })

    }

    return (
        <div className="admin-categories-list">
            <div>
                <button className="btn btn-primary btn-lg" onClick={Create}>
                    ADICIONAR
                </button>
            </div>
            <div className="admin-list-container">

            {categoryCreate && (
                <CardForm 
                    onCancel={setCategoryCreate}
                    onChangeName={onChangeCategory}
                />
            )}
            
            {categoryResponse?.content.map(category => 
                    <Card 
                        category={category}
                        key={category.id}
                        onRemove={onRemove}
                    />
                )}
            {categoryResponse && (
                <Pagination 
                    totalPages={categoryResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}
            </div>
        </div>

    )
}

export default List;