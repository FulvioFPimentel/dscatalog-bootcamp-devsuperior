import React from 'react';
import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styles.scss';
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();

    useEffect (() => {
        const currentUserData = getAccessTokenDecoded();
            setCurrentUser(currentUserData.user_name);
    }, [location]);

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault(); // interromper o comportamento padrão do href
        logout();
    } 

    return (
        <nav className="row bg-primary main-nav">
            <div className="col-3">
                <Link to="/" className="nav-logo-text">
                    <h4>DS Catalog</h4>
                </Link>
            </div>
            <div className="col-6">
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" exact className="nav-link">
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className="nav-link">
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin" className="nav-link">
                            ADMIN
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-3 text-right">
                
                {currentUser && (
                    <>
                        {currentUser}
                        <a 
                            href="#logout" 
                            className="nav-link active d-inline"
                            onClick={handleLogout}
                            > 
                               LOGOUT
                        </a>
                    </>
                )}
                {!currentUser && (
                    <Link to="/auth/login" className="nav-link active">
                        LOGIN
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
