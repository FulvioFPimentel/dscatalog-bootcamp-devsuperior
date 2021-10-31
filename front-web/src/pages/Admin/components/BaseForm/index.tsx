import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
}

type LocationState = {
    from:string; 
 }

const BaseForm = ({ title, children }: Props) => {
    const history = useHistory();
    let location = useLocation<LocationState>();
    const path = useParams();
    const paramsValue = String(Object.keys(path)) === 'productId';

    

    const { from } = location.state || { from: { pathname: `/admin/${paramsValue ? 'products' : 'users'}` } };

    const handleCancel = () => {
        history.push(from);
    }
    
    return (
        <div className="admin-base-form card-base">
            <h1 className="base-form-title">
                {title}
            </h1>
            {children}
            <div className="base-form-actions">
                <button 
                    className="btn btn-outline-danger border-radius-10"
                    onClick={handleCancel}
                >
                    CANCELAR
                </button>
                <button className="btn btn-primary border-radius-10 btn-save">
                    SALVAR
                </button>
            </div>
        </div>
    )
}

export default BaseForm;