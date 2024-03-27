import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormComponentStyles from './FormComponent.styles';
import axios from 'axios';

function FormComponent(props) {
    const formRef = useRef(null);
    const { course, setLoading } = props;
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [idCourse, setIdCourse] = useState();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (course) {
            formRef.current.reset();
            setIdCourse(course.id_courses);
            setTitle(course.title);
            setText(course.text);
            setImage(null);
            setImagePreview(null);
        } else {
            setIdCourse('');
            setTitle('');
            setText('');
            setImage(null);
            setImagePreview(null);
        }
    }, [course])

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
    const createCourse = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${window.location.origin}/api/courses`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(true);
        } catch (error) {
            console.error('Error al crear el curso:', error);
        }
    };

    const updateCourse = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // formData.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(`${window.location.origin}/api/courses/${idCourse}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(true);

        } catch (error) {
            console.error('Error al actualizar el curso:', error);
        }
    };
    return (
        <FormComponentStyles>
            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <p> {course ? 'Actualizar Curso' : 'Crear Nuevo Curso'}</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mt-5 mt-lg-5 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                            <form onSubmit={course ? updateCourse : createCourse} className="php-email-form" ref={formRef}>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="name">Titulo</label>
                                        <input
                                            type="text" name="title" className="form-control" id="title" required
                                            value={title}
                                            onChange={e => setTitle(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        {imagePreview && !course && (
                                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                        )}
                                        {!imagePreview && course && (
                                            <img src={course.image} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                        )}
                                        {course && imagePreview ? (
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
                                        <label htmlFor="name">Descripcion</label>
                                        <input type="textArea" name="text" className="form-control" id="text" required
                                            value={text}
                                            onChange={e => setText(e.target.value)} />
                                    </div>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
                                </div>
                                <div className="text-center"><button type="submit">{course ? 'Actualizar Curso' : 'Crear Curso'}</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </FormComponentStyles>
    )
}

export default FormComponent;