import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormComponentStyles from './FormComponent.styles';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function FormComponent(props) {
    const formRef = useRef(null);
    const { team, setLoading, change } = props;
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [position, setPosition] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (team) {
            formRef.current.reset();
            setName(team.name);
            setLastName(team.last_name);
            setMail(team.mail);
            setPosition(team.position);
            setImage(null);
            setImagePreview(null);
        } else {
            setName('');
            setLastName('');
            setMail('');
            setPosition('');
            setImage(null);
            setImagePreview(null);
        }
    }, [team]);

    const scrollTo = async () => {
        setName('');
        setLastName('');
        setMail('');
        setPosition('');
        setImage(null);
        setImagePreview(null);
        const formComponent = document.getElementById('buttonAdd');
        formComponent.scrollIntoView({ behavior: 'smooth' });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const createTeamMember = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const token = localStorage.getItem('token');
            setLoading(true);
            const response = await axios.post(`${window.location.origin}/api/team`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            scrollTo();
        } catch (error) {
            console.error('Error al crear el miembro del equipo:', error);
        }
    };

    const updateTeamMember = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const token = localStorage.getItem('token');
            setLoading(true);
            const response = await axios.post(`${window.location.origin}/api/team/${team.id_team}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            scrollTo();
        } catch (error) {
            console.error('Error al actualizar el miembro del equipo:', error);
        }
    };
    return (
        <FormComponentStyles>
            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <p>{team ? 'Actualizar Miembro del Equipo' : 'Crear Nuevo Miembro del Equipo'}</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mt-5 mt-lg-5 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                            <form onSubmit={team ? updateTeamMember : createTeamMember} className="php-email-form" ref={formRef}>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="name">Nombre</label>
                                        <input
                                            type="text" name="name" className="form-control" id="name" required
                                            value={name}
                                            onChange={e => setName(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="last_name">Apellido</label>
                                        <input
                                            type="text" name="last_name" className="form-control" id="last_name" required
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mail">Correo Electrónico</label>
                                        <input
                                            type="email" name="mail" className="form-control" id="mail" required
                                            value={mail}
                                            onChange={e => setMail(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="position">Cargo</label>
                                        <input
                                            type="text" name="position" className="form-control" id="position" required
                                            value={position}
                                            onChange={e => setPosition(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        {imagePreview && !team && (
                                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                        )}
                                        {!imagePreview && team && (
                                            <img src={team.image} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                        )}
                                        {team && imagePreview ? (
                                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                        ) :
                                            null
                                        }
                                        <label htmlFor="image">Imagen</label>
                                        <input type="file" name="image" className="form-control" id="image" accept="image/*" required
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
                                </div>
                                <div className="text-center">
                                    {!change ? <button type="submit">{team ? 'Actualizar Miembro del Equipo' : 'Crear Miembro del Equipo'}</button> :
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