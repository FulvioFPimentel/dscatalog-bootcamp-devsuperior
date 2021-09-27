import { Category } from 'core/types/Product';
import { makePrivateRequest } from 'core/utils/request';
import { useState } from 'react';
import { toast } from 'react-toastify';
import './styles.scss'

type Props = {
    category: Category;
    onRemove: (categoryId: number) => void;
}

const Card = ({category, onRemove}:Props) => {

    const [ categoryChangeName, setCategoryChangeName] = useState('')

    const handleChangename = (name: string) => {
        setCategoryChangeName(name);
    }

    const onChangeUpdate = (data: string) => {
        console.log(data)
        const payload = {
            name: data
        }
        console.log(payload)

        makePrivateRequest({ url: `/categories/${category.id}`, method: 'PUT', data: payload })
            .then(() => {
                toast.info('Categoria salvo com sucesso!')
                category.name = categoryChangeName
                setCategoryChangeName('')

            })
            .catch(() => toast.error('Erro ao salvar a categoria!'))
    }
    
    return (
        <div className="card-base category-card-container"> 
            <div className="row">
                <div className="col-6">
                    <h5 className="category-card-name-admin">
                        {(categoryChangeName) && 
                            <input 
                                name={category.name}
                                type="text"
                                key={category.id}
                                className="form-control input-base category-name-input" 
                                value={categoryChangeName}
                                onChange={event => handleChangename(event.target.value)}
                            /> 
                        }
                        {(categoryChangeName === '') && category.name}
                    </h5>
                </div>
                <div className="col-6 d-flex align-items-center">
                    
                    {(categoryChangeName === '') && 
                        <>
                            <button 
                                type="button"
                                className="btn btn-outline-secondary btn-block border-radius-10 mr-3"
                                onClick={() => setCategoryChangeName(category.name)}
                            >
                                EDITAR
                            </button> 
                            <button 
                                type="button" 
                                className="btn btn-outline-danger btn-block border-radius-10 mb-2"
                                onClick={() => onRemove(category.id)}
                            >
                                EXCLUIR
                            </button>
                        </>
                    } 
                     {(categoryChangeName) && 
                        <>
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary btn-block border-radius-10 mr-3"
                                onClick={() => onChangeUpdate(categoryChangeName)}
                                >
                                SALVAR
                            </button> 
                            <button 
                                type="button" 
                                className="btn btn-outline-danger btn-block border-radius-10 mb-2"
                                onClick={() => setCategoryChangeName('')}
                            >
                                CANCELAR
                            </button>
                        </>
                     }

                </div>
            </div>
            
        </div>

    )
}

export default Card;