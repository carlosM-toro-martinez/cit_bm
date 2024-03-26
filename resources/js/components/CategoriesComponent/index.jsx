import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FormComponent from './FormCategoriesComponent';
import { Button } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function CategoriesComponent() {
    const [categories, setCategories] = useState([]);
    const [updateCategories, setUpdateCategories] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/categories`);
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        };

        getCourses();
    }, [loading]);


    const scrollTo = async (data, create) => {
        if (create) {
            setUpdateCategories(null);
        } else {
            setUpdateCategories(data);
        }
        const formComponent = document.getElementById('form');
        formComponent.scrollIntoView({ behavior: 'smooth' });
    };

    const deleteCourse = async (id) => {
        try {
            const token = localStorage.getItem('token');

            console.log(id);
            await axios.delete(`${window.location.origin}/api/categories/${id}`, {
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
                            <th>name</th>
                            <th>date change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((categorie, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{categorie.name}</td>
                                <td>{categorie.updated_at}</td>
                                <td>
                                    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                        <Button onClick={() => scrollTo(categorie)}> <FaPencilAlt /></Button>
                                        <Button onClick={() => deleteCourse(categorie.id_category)}><MdDeleteForever /></Button>
                                    </div>
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
                <FormComponent categorie={updateCategories} setLoading={setLoading} />
            </div>
        </>
    );
}

export default CategoriesComponent;