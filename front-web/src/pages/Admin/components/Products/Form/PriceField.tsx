import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import { Control, Controller } from 'react-hook-form';
import { FormState } from './';

type Props = {
    control: Control<FormState>
}

const PriceField = ({ control }: Props) => (
    <Controller 
        name="price"
        defaultValue=""
        control={control}
        rules={{ required: "Campo obrigadório" }}
        render={({ field : {value, onChange} }) => (
            <CurrencyInput 
                placeholder="Preço"
                className="form-control input-base"
                value={value}
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                onValueChange={onChange}
            />
        )}
    />
)

export default PriceField;