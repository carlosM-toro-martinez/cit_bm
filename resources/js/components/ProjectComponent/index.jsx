import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FormComponent from './/FormProjectComponent';
import { Button } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function ProjectComponent() {
    const [projects, setProjects] = useState([]);
    const [updateProjects, setUpdateProjects] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/allprojects`);
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        };

        getProjects();
    }, [loading]);


    const scrollTo = async (data, create) => {
        if (create) {
            setUpdateProjects(null);
        } else {
            setUpdateProjects(data);
        }
        const formComponent = document.getElementById('form');
        formComponent.scrollIntoView({ behavior: 'smooth' });
    };

    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem('token');

            console.log(id);
            await axios.delete(`${window.location.origin}/api/projects/${id}`, {
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
                            <th>date change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{project.title}</td>
                                <td>{project.updated_at}</td>
                                <td >

                                    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        <Button onClick={() => scrollTo(project)}> <FaPencilAlt /></Button>
                                        <Button onClick={() => deleteProject(project.id_proyect)}><MdDeleteForever /></Button>
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
                <FormComponent project={updateProjects} setLoading={setLoading} />
            </div>
        </>
    );
}

export default ProjectComponent