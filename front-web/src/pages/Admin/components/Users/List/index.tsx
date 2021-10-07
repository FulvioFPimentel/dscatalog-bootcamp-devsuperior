import Pagination from 'core/components/Pagination';
import { UsersResponse } from 'core/types/Product';
import history from 'core/utils/history';
import { makePrivateRequest } from 'core/utils/request';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../Card';

const List = () => {

    const [usersResponse, setUsersResponse] = useState<UsersResponse>();
    const [activePage, setActivePage] = useState(0);

    const getUsers = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPages: 4,
            direction: 'DESC',
            orderBy: 'id'
        }

        makePrivateRequest({ url: '/users', params})
        .then(response => setUsersResponse(response.data))
    },[activePage])

   useEffect(() => {
    getUsers();
   },[getUsers])

   const handleCreate = () => {
       history.push('/admin/users/create')
   }

   const onRemoveUser = (usersId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este usuário?')

    if(confirm){
        makePrivateRequest({ url: `/users/${usersId}`, method: 'DELETE'})
            .then(() => {
                toast.info('Usuário removido com sucesso!')
                getUsers();
            })
            .catch(() => {
                toast.error('Erro ao remover o usuário!')
            })

        }
   }

    return (
        <div className="admin-products-list">
            <div className="d-flex justify-content-between" >
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            </div>
            <div className="admin-list-container">

                {usersResponse?.content.map(user => (
                    <Card 
                    user={user} 
                    key={user.id}
                    onRemove={onRemoveUser}
                    />
                ))}
            </div>

            {usersResponse && (
                    <Pagination 
                        totalPages={usersResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                />)}

        </div>
    )
}

export default List;