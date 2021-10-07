import { useForm } from 'react-hook-form'
import '../Card/styles.scss'

export type FormState = {
    name: string;
}

type Props = {
    onCancel: (value: boolean) => void;
    onChangeName: (value: string) => void;
}

const CardForm = ({ onChangeName, onCancel }:Props) => {
    const { register, handleSubmit, formState: {errors} } = useForm<FormState>();

    const onChange = (data: FormState ) => {
        onChangeName(data.name)
    }

    return (

        <form onSubmit={handleSubmit(onChange)}>
            <div className="card-base category-card-container"> 
            <div className="row">
                <div className="col-6">
                <input 
                    {...register('name', {required: "Campo obrigadório"})}
                    className="form-control input-base"
                    placeholder="Adicionar categoria"

                />
                    {errors.name && (
                        <div className="invalid-feedback d-block">
                            Campo obrigatório
                        </div> 
                    )}
                </div>

                <div className="col-6 d-flex align-items-center">
                    <button className="btn btn-outline-secondary btn-block border-radius-10 mr-3">
                        SALVAR
                    </button> 
                    <button 
                        type="button" 
                        className="btn btn-outline-danger btn-block border-radius-10 mb-2"
                        onClick={() => onCancel(false)}
                    >
                        CANCELAR
                    </button>
                </div>
                </div>
            </div>
        </form>
    )

}

export default CardForm;