import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button, Spinner } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function MesaggesComponent() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(true);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/messages`);
                setMessages(response.data);
                setLoading(false);
                setChange(false);
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        };

        getMessages();
    }, [change]);


    const deleteMessages = async (id) => {
        try {
            const token = localStorage.getItem('token');
            setChange(true);

            await axios.delete(`${window.location.origin}/api/messages/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Error al eliminar el mensaje:', error);
        }
    };

    return (
        <>
            <div style={{ padding: '5rem' }}>
                {!loading ? <>
                    <Table bordered style={{ borderColor: '#eb5d1e' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Case</th>
                                <th>Message</th>
                                <th>Name visitor</th>
                                <th>Email visitor</th>
                                <th>Date update</th>
                                <th>Daleted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{message.case}</td>
                                    <td>{message.message}</td>
                                    <td>{message.visitor.name}</td>
                                    <td>{message.visitor.mail}</td>
                                    <td>{message.updated_at}</td>
                                    <td>
                                        <div style={{ height: '100%', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                            <Button onClick={() => deleteMessages(message.id_message)}><MdDeleteForever /></Button>
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
            </div>
        </>
    );
}

export default MesaggesComponent;