import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import FormComponent from './FormAdminComponent';

function AdminComponent() {
    const [courses, setCourses] = useState([]);
    const [updateCourses, setUpdateCourses] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/courses`);
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        };

        getCourses();
    }, [loading]);


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

            console.log(id);
            await axios.delete(`${window.location.origin}/api/courses/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(true);
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
        }
    };

    return (
        <>
            <div style={{ padding: '5rem' }}>
                {!loading ? <Table bordered style={{ borderColor: '#eb5d1e' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Text</th>
                            <th>date change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{course.title}</td>
                                <td>{course.text}</td>
                                <td>{course.updated_at}</td>
                                <td style={{ height: '100%', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: '2rem' }} >
                                    <Button onClick={() => scrollTo(course)}> <FaPencilAlt /></Button>
                                    <Button onClick={() => deleteCourse(course.id_courses)}><MdDeleteForever /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table> : <p>Cargando...</p>}
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button
                        style={{ backgroundColor: '#eb5d1e', fontSize: '1rem' }}
                        onClick={() => scrollTo(null, true)}
                    >
                        {/* <p style={{ backgroundColor: '#eb5d1e', fontSize: '1rem', padding: '0' }}>+</p> */}
                        +
                    </Button>
                </div>
            </div>
            <div id='form' >
                <FormComponent course={updateCourses} setLoading={setLoading} />
            </div>
        </>
    );
}

export default AdminComponent;