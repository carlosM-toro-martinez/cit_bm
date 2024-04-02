import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormComponentStyles from './FormComponent.styles';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function FormComponent(props) {
    const formRef = useRef(null);
    const { categorie, setLoading, change } = props;
    const [name, setName] = useState('');
    const [idCategorie, setIdCategorie] = useState();

    useEffect(() => {
        if (categorie) {
            formRef.current.reset();
            setIdCategorie(categorie?.id_category);
            setName(categorie.name);
        } else {
            setIdCategorie('');
            setName('');
        }
    }, [categorie])

    const scrollTo = async () => {
        setIdCategorie('');
        setName('');
        const formComponent = document.getElementById('buttonAdd');
        formComponent.scrollIntoView({ behavior: 'smooth' });
    };

    const createCategorie = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const token = localStorage.getItem('token');
            setLoading(true);
            const response = await axios.post(`${window.location.origin}/api/categories`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            scrollTo();
        } catch (error) {
            console.error('Error al crear el curso:', error);
        }
    };

    const updateCategorie = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const token = localStorage.getItem('token');
            setLoading(true);
            const response = await axios.post(`${window.location.origin}/api/categories/${idCategorie}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            scrollTo();
        } catch (error) {
            console.error('Error al actualizar el curso:', error);
        }
    };
    return (
        <FormComponentStyles>
            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <p> {categorie ? 'Actualizar Categoria' : 'Crear Nueva Categoria'}</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mt-5 mt-lg-5 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                            <form onSubmit={categorie ? updateCategorie : createCategorie} className="php-email-form" ref={formRef}>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text" name="name" className="form-control" id="name" required
                                            value={name}
                                            onChange={e => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
                                </div>
                                <div className="text-center">
                                    {!change ? <button type="submit">{categorie ? 'Actualizar Categoria' : 'Crear Categoria'}</button> :
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
        </FormComponentStyles>
    )
}

export default FormComponent;