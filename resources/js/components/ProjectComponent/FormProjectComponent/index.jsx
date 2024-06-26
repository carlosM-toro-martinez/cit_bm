import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormComponentStyles from './FormComponent.styles';
import { Button, DropdownButton } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { IoAddCircle } from 'react-icons/io5';

function FormComponent(props) {
    const formRef = useRef(null);
    const { project, setLoading, change } = props;
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [idProject, setIdProject] = useState();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedId, setSelectedId] = useState('');

    const handleSelectChange = (event) => {
        setSelectedId(event.target.value);
    };

    useEffect(() => {
        if (project) {
            formRef.current.reset();
            setIdProject(project.id_proyect);
            setTitle(project.title);
            setDescription(project.description);
            setSelectedId(project.id_category);
            setImage(null);
            setImagePreview(null);
        } else {
            formRef.current.reset();
            setIdProject('');
            setTitle('');
            setDescription('');
            setSelectedId('');
            setImage(null);
            setImagePreview(null);
        }
        const getCategorie = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/categories`);
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        };

        getCategorie();
    }, [project])

    const scrollTo = async () => {
        setIdProject('');
        setTitle('');
        setDescription('');
        setSelectedId('');
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
    const createProject = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const token = localStorage.getItem('token');
            setLoading(true);
            const response = await axios.post(`${window.location.origin}/api/projects`, formData, {
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

    const updateProject = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const token = localStorage.getItem('token');
            setLoading(true);
            const response = await axios.post(`${window.location.origin}/api/projects/${idProject}`, formData, {
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
                    <div className="section-title" id='projectTitle'>
                        <p> {project ? 'Actualizar Proyecto' : 'Crear Nuevo Proyecto'}</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mt-5 mt-lg-5 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                            <form onSubmit={project ? updateProject : createProject} className="php-email-form" ref={formRef}>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        {imagePreview && !project && (
                                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                        )}
                                        {!imagePreview && project && (
                                            <img src={project.image} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                        )}
                                        {project && imagePreview ? (
                                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                        ) :
                                            null
                                        }
                                        <label htmlFor="image">Imagen</label>
                                        <input type="file" name="image" className="form-control" id="image" accept="image/*" requireds
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="name">Titulo</label>
                                        <input
                                            type="text" name="title" className="form-control" id="title" required
                                            value={title}
                                            onChange={e => setTitle(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            type="text" name="description" className="form-control" id="description" required
                                            value={description}
                                            onChange={e => setDescription(e.target.value)} />
                                    </div>
                                    <select className="form-select" aria-label="Default select example" onChange={handleSelectChange} required>
                                        <option selected>Seleccione la categoria</option>
                                        {categories ? categories.map((categorie) => (
                                            <option key={categorie.id_category} value={categorie.id_category}>{categorie.name}</option>

                                        )) : null}
                                    </select>
                                    <input type="hidden" value={selectedId} name='id_category' id='id_category' />
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
                                </div>
                                <div className="text-center">
                                    {!change ? <button type="submit" >{project ? 'Actualizar Proyecto' : 'Crear Proyecto'}</button> :
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