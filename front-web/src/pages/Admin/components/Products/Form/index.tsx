import { makePrivateRequest } from 'core/utils/request';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss'

type FormState = {
    name: string;
    price: string;
    description: string;
    imageUrl: string;
}

const Form = () => {

    const { register, handleSubmit, formState: {errors}  } = useForm<FormState>(); 
    const history = useHistory();

    const onSubmit = (data: FormState) => {
         makePrivateRequest({ url: '/products', method: 'POST', data })
         .then(() => {
             toast.info('Produto salvo com sucesso!')
             history.push('/admin/products')
         })
         .catch(() => {
             toast.error('Erro ao salvar o produto!')
         })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="cadastrar um produto">

                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input 
                                {...register('name', {
                                    required: "Campo obrigadório",
                                    minLength: {value:5, message: "O campo deve ter no minimo 5 caracteres"},
                                    maxLength: {value:60, message: "O campo deve ter no máximo 60 caracteres"}
                                })}
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Nome do Produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div> 
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <input 
                                {...register('price', { required: "Campo obrigadório" })}
                                type="number" 
                                className="form-control input-base" 
                                placeholder="Preço"
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div> 
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <input 
                                {...register('imageUrl', { required: "Campo obrigadório" })}
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Imagem do produto"
                            />
                            {errors.imageUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imageUrl.message}
                                </div> 
                            )}
                        </div>

                    </div>
                    <div className="col-6">
                        <textarea 
                            {...register('description', { required: "Campo obrigadório" })}
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30} 
                            rows={10}
                        />
                        {errors.description && (
                                <div className="invalid-feedback d-block">
                                    {errors.description.message}
                                </div> 
                            )}
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;