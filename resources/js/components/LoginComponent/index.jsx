import React from 'react';
import axios from 'axios';
import LoginComponentStyles from './LoginComponent.styles';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await axios.post(`${window.location.origin}/api/login`, formData);
            const token = response?.data?.token;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            navigate('/register');

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
                                <div className="text-center"><button type="submit">Iniciar Sesion</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </LoginComponentStyles>
    )
}

export default LoginComponent