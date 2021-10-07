import BaseForm from '../../BaseForm';
import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form';
import { Role } from 'core/types/Product';
import { useEffect } from 'react';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import history from 'core/utils/history';
import { useParams } from 'react-router';

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
}

type ParamsType = {
    usersId: string;
}

const options: Role[] = [
    { id: 1, authority: 'Operador' },
    { id: 2, authority: 'Administrador' }
  ]

const Form = () => {

    const { register, handleSubmit, formState: {errors}, control, setValue} = useForm<FormState>();
    const { usersId } = useParams<ParamsType>();

    const isEditing = usersId !== 'create';
    const formTitle = isEditing ? `Editar Usuário` : 'Cadastrar um Usuário'

    useEffect(() => {
        if(isEditing){
            makePrivateRequest({ url: `/users/${usersId}`})
            .then(response => {
                setValue('firstName', response.data.firstName)
                setValue('lastName', response.data.lastName)
                setValue('email', response.data.email)
                setValue('roles', options)
            })
        }

    }, [setValue, isEditing, usersId])

      const onSubmit = (data: FormState) => {

            makePrivateRequest({ 
                    url:  isEditing ? `/users/${usersId}` : '/users', 
                    method: isEditing ? 'PUT' : 'POST', 
                    data 
                    })
            .then(() => {
                toast.info('Usuário salvo con sucesso!')
                history.push('/admin/users')
            })
            .catch(() => {
                toast.error('Erro ao salvar um novo usuário!')
            })

      }

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <BaseForm title={formTitle}>
                    <div className="row margin-bottom-30">
                        <div className="col-6">
                            <input 
                                type="text"
                                className="form-control input-base"
                                placeholder='Nome'
                                {...register('firstName', {required:'Campo obrigatorio!'})}
                            />
                            {errors.firstName && (
                                <div className="invalid-feedback d-block">
                                    {errors.firstName.message}
                                </div>
                            )}
                        </div>
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control input-base"
                                placeholder='Sobrenome'
                                {...register('lastName')}
                            />
                            {errors.lastName && (
                                <div className="invalid-feedback d-block">
                                    {errors.lastName.message}
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="margin-bottom-30">
                        <input 
                            type="email"
                            className="form-control input-base"
                            placeholder='Email'
                            {...register('email')}
                        />
                        {errors.email && (
                            <div className="invalid-feedback d-block">
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-6 margin-bottom-30">  

                            <Controller 
                                control={control}
                                name="roles"
                                rules={{ required: true}}
                                render={({ field: {value, onChange}}) => (
                                    <Select 
                                        value={value}
                                        onChange={onChange}
                                        options={options} 
                                        getOptionLabel={(option: Role) => option.authority}
                                        getOptionValue={(option: Role) => String(option.id)}
                                        classNamePrefix="categories-select"
                                        defaultValue={null}
                                        placeholder="Funções"
                                        inputId="roles"
                                        isMulti
                                    />
                                )}
                            />   
                            {errors.roles && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório
                                </div> 
                            )}

                        </div>
                    </div>


                    <div className="row margin-bottom-30">
                        <div className="col-6">
                            <input 
                                type="password"
                                className="form-control input-base"
                                placeholder='Digite aqui a Senha'
                                {...register('password')}
                            />
                        {errors.password && (
                            <div className="invalid-feedback d-block">
                                {errors.password.message}
                            </div>
                        )}
                            
                        </div>
                        <div className="col-6">
                            <input 
                                type="password"
                                className="form-control input-base"
                                placeholder='Repita aqui a Senha'
                            />
                        </div>
                    </div>

                </BaseForm>
            </form>
    )
}

export default Form;