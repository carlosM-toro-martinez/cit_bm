import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginComponentStyles from './LoginComponent.styles';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function LoginComponent() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if (isLoggedIn) {
            navigate('/register');
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            setLoading(true);
            const response = await axios.post(`${window.location.origin}/api/login`, formData);
            const token = response?.data?.token;
            const user = response?.data?.user;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('userName', user?.name);
                localStorage.setItem('userEmail', user?.email);
                setLoading(false);
                navigate('/register');
            } else {
                alert("Invalid username or password");
                setLoading(false);
            }


        } catch (error) {
            console.error('Error al iniciar sesion:', error);
        }
    };

    return (
        <LoginComponentStyles>
            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <p>Inicio De Sesion</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mt-5 mt-lg-5 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                            <form onSubmit={handleSubmit} className="php-email-form">
                                <div className="row">
                                    {/* <div className="form-group col-md-12">
                                        <label htmlFor="name">Su Nombre</label>
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Tu Nombre" required />
                                    </div> */}
                                    <div className="form-group col-md-12 mt-3 mt-md-0">
                                        <label htmlFor="email">Tu Email</label>
                                        <input type="mail" className="form-control" name="email" id="email" placeholder="Tu Email" required />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="password">Tu Contraseña</label>
                                        <input type="password" name="password" className="form-control" id="password" placeholder="Tu Nombre" required />
                                    </div>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
                                </div>
                                <div className="text-center">
                                    {!loading ? <button type="submit">Iniciar Sesion</button> :
                                        <button type="submit" disabled>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Loading...</span>
                                        </button>}

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </LoginComponentStyles>
    )
}

export default LoginComponent