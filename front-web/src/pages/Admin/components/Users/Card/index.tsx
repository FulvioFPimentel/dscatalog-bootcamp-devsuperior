import { User } from 'core/types/Product';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'

type Props = {
    user: User;
    onRemove: (usersId: number) => void;
}

const Card = ({ user, onRemove }:Props) => {
    return (
        <div className="card-base users-card-container">
            <div className="row">
                <div className="col-3">
                        <h5 className="users-card-name-admin">{user.firstName} {user.lastName} </h5>
                    <h6 className="users-card-email-admin">{user.email}</h6>
                </div>
                <div className="col-3">
                    {user.roles.map(role => {
                        if (role.authority === "ROLE_OPERATOR"){
                            return <h6 className="role-context mb-1">Operador</h6>
                        }
                        return <h6 className="role-context mb-1">Administrador</h6>
                        
                    })}
                </div>
                <div className="col-6 d-flex align-items-center">
                    <Link
                        to={`/admin/users/${user.id}`}
                        type="button"
                        className="btn btn-outline-secondary btn-block border-radius-10 mr-3"

                    >
                        EDITAR
                    </Link>  
                    <button 
                        type="button" 
                        className="btn btn-outline-danger btn-block border-radius-10 mb-2"
                        onClick={() => onRemove(user.id)}
                    >
                        EXCLUIR
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Card;