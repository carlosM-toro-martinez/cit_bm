import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormComponentStyles from './FormComponent.styles';

function FormComponent(props) {
    const formRef = useRef(null);
    const { categorie, setLoading } = props;
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

    const createCategorie = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${window.location.origin}/api/categories`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(true);
            console.log(response);
        } catch (error) {
            console.error('Error al crear el curso:', error);
        }
    };

    const updateCategorie = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(`${window.location.origin}/api/categories/${idCategorie}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(true);
            console.log(response);

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
                                <div className="text-center"><button type="submit">{categorie ? 'Actualizar Categoria' : 'Crear Categoria'}</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </FormComponentStyles>
    )
}

export default FormComponent;