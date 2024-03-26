import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FormComponent from './FormContactComponent';
import { Button } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

function ContactComponent() {
    const [contact, setContact] = useState([]);
    const [updateContact, setUpdateContact] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getContact = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/contacts`);
                setContact(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el contacto:', error);
            }
        };

        getContact();
    }, [loading]);


    const scrollTo = async (data, create) => {
        if (create) {
            setUpdateContact(null);
        } else {
            setUpdateContact(data);
        }
        const formComponent = document.getElementById('form');
        formComponent.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div style={{ padding: '1rem 8rem 8rem 8rem' }}>
                {!loading ? <Table bordered style={{ borderColor: '#eb5d1e' }}>
                    <thead>
                        <tr>
                            <th>Attributes</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contact.map((contact, index) => (
                            <>
                                <tr>
                                    <th>Coordinates</th>
                                    <td>{contact.coordinates}</td>
                                </tr>
                                <tr>
                                    <th>Ubication</th>
                                    <td>{contact.ubication}</td>
                                </tr>
                                <tr>
                                    <th>Mail</th>
                                    <td>{contact.mail}</td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>{contact.phone_number}</td>
                                </tr>
                                <tr>
                                    <th>Facebook</th>
                                    <td>{contact.facebook}</td>
                                </tr>
                                <tr>
                                    <th>Instagram</th>
                                    <td>{contact.instagram}</td>
                                </tr>
                                <tr>
                                    <th>Tiktok</th>
                                    <td>{contact.tiktok}</td>
                                </tr>
                                <tr>
                                    <th>X</th>
                                    <td>{contact.x}</td>
                                </tr>
                                <tr>
                                    <th>date change</th>
                                    <td>{contact.updated_at}</td>
                                </tr>
                                <tr>
                                    <th>Update & Delete</th>
                                    <td style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 30 }}>
                                        <Button onClick={() => scrollTo(contact)}> <FaPencilAlt /></Button>
                                        {/* <Button onClick={() => deleteContact(contact.id_contact)}><MdDeleteForever /></Button> */}
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </Table> : <p>Cargando...</p>}
                {/* <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button
                        style={{ backgroundColor: '#eb5d1e' }}
                        onClick={() => scrollTo(null, true)}
                    >
                        <IoAddCircle size={50} />
                    </Button>

                </div> */}
            </div>
            <div id='form' >
                <FormComponent contact={contact} setLoading={setLoading} loading={loading} />
            </div>
        </>
    );
}

export default ContactComponent;