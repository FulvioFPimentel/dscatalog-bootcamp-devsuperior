import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss'

type FormeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

type FormState = {
    name: string,
    price: string,
    category: string
    description: string
}

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '',
        description: ''
    });

    const handleOnChange = (event: FormeEvent) => {
        
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data=> ({ ...data, [name]: value}));
    }
 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://ae01.alicdn.com/kf/HTB1dF_NlScqBKNjSZFgq6x_kXXa9/3d-vr-vidro-fone-de-ouvido-esta-o-exibi-o-para-oculus-rift-jogo-controlador-suporte.jpg_Q90.jpg_.webp',
            categories: [{ id: formData.category}]
        }

        makePrivateRequest({ url: '/products', method: 'POST', data: payload })
        .then(() => {
            setFormData({ name: '', category: '', price: '', description: '' })
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">

                <div className="row">
                    <div className="col-6">
                    <input 
                        value={formData.name}
                        name="name"
                        type="text" 
                        className="form-control mb-5" 
                        onChange={handleOnChange}
                        placeholder="Nome do Produto"
                    />
                    <select 
                        value={formData.category}
                        className="form-control mb-5" 
                        name="category"
                        onChange={handleOnChange}>
                        <option value="1">Livros</option>
                        <option value="3">Computadores</option>
                        <option value="2">Eletrônicos</option>
                    </select>
                    <input 
                        value={formData.price}
                        name="price"
                        type="text" 
                        className="form-control" 
                        onChange={handleOnChange}
                        placeholder="Preço"
                    />
                    </div>
                    <div className="col-6">
                        <textarea 
                            name="description" 
                            value={formData.description}
                            onChange={handleOnChange}
                            className="form-control"
                            cols={30} 
                            rows={10}
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;