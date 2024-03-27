import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FormComponent from './FormTeamComponent';
import { Button } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { IoAddCircle } from 'react-icons/io5';

function TeamComponent() {
    const [team, setTeam] = useState([]);
    const [updateTeam, setUpdateTeam] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTeam = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/team`);
                setTeam(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        };

        getTeam();
    }, [loading]);


    const scrollTo = async (data, create) => {
        if (create) {
            setUpdateTeam(null);
        } else {
            setUpdateTeam(data);
        }
        const formComponent = document.getElementById('form');
        formComponent.scrollIntoView({ behavior: 'smooth' });
    };

    const deleteTeam = async (id) => {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(`${window.location.origin}/api/team/${id}`, {
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
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Mail</th>
                            <th>Position</th>
                            <th>Date change</th>
                            <th>U & D</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map((team, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{team.name}</td>
                                <td>{team.last_name}</td>
                                <td>{team.mail}</td>
                                <td>{team.position}</td>
                                <td>{team.updated_at}</td>
                                <td>
                                    <div style={{ height: '100%', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: '2rem' }}>
                                        <Button onClick={() => scrollTo(team)}> <FaPencilAlt /></Button>
                                        <Button onClick={() => deleteTeam(team.id_team)}><MdDeleteForever /></Button>
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
                        <IoAddCircle size={50} />
                    </Button>
                </div>
            </div>
            <div id='form' >
                <FormComponent team={updateTeam} setLoading={setLoading} />
            </div>
        </>
    )
}

export default TeamComponent;