import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FormComponent from './FormCoursesComponent';
import { Button, Spinner } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { IoAddCircle } from 'react-icons/io5';

function CoursesComponent() {
    const [courses, setCourses] = useState([]);
    const [updateCourses, setUpdateCourses] = useState();
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(true);
    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/courses`);
                setCourses(response.data);
                setLoading(false);
                setChange(false);
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        };

        getCourses();
    }, [change]);


    const scrollTo = async (data, create) => {
        if (create) {
            setUpdateCourses(null);
        } else {
            setUpdateCourses(data);
        }
        const formComponent = document.getElementById('form');
        formComponent.scrollIntoView({ behavior: 'smooth' });
    };

    const deleteCourse = async (id) => {
        try {
            const token = localStorage.getItem('token');
            setChange(true);
            await axios.delete(`${window.location.origin}/api/courses/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
        }
    };

    return (
        <>
            <div style={{ padding: '5rem' }} id='buttonAdd'>
                {!loading ? <>
                    <Table bordered style={{ borderColor: '#eb5d1e' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Text</th>
                                <th>date change</th>
                                <th>D & U</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{course.title}</td>
                                    <td>{course.text}</td>
                                    <td>{course.updated_at}</td>
                                    <td>
                                        <div style={{ height: '100%', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: '2rem' }} >
                                            <Button onClick={() => scrollTo(course)}> <FaPencilAlt /></Button>
                                            <Button onClick={() => deleteCourse(course.id_courses)}><MdDeleteForever /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {change ?
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }} >
                            <Spinner animation="grow" variant="dark" />
                        </div>
                        : null}
                </> : <p>Cargando...</p>}
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button
                        style={{ backgroundColor: '#eb5d1e', fontSize: '1rem' }}
                        onClick={() => scrollTo(null, true)}
                    >
                        {/* <p style={{ backgroundColor: '#eb5d1e', fontSize: '1rem', padding: '0' }}>+</p> */}
                        <IoAddCircle size={50} />
                    </Button>
                </div>
            </div>
            <div id='form' >
                <FormComponent course={updateCourses} setLoading={setChange} change={change} />
            </div>
        </>
    );
}

export default CoursesComponent;
