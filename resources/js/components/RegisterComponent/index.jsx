import React, { useEffect, useState } from 'react';
import NavbarComponent from '../NavbarComponent';
import RegisterComponentStyles from './RegisterComponent.styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Button, Spinner, Table } from 'react-bootstrap';
import { IoAddCircle } from 'react-icons/io5';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

function RegisterComponent() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(`${window.location.origin}/api/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setUsers(response.data);
                setLoading(false);
                setChange(false);
                setName('');
                setEmail('');
                setPassword('');
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        getUsers();
    }, [change]);

    const scrollTo = async (data, create) => {
        const formComponent = document.getElementById('form');
        formComponent.scrollIntoView({ behavior: 'smooth' });
    };

    const onSaveUser = async () => {
        setName('');
        setEmail('');
        setPassword('');
        return (
            <Alert variant="success" onClose={() => setShow(true)} dismissible>
                <Alert.Heading>Administrador agregado correctamente!</Alert.Heading>
            </Alert>
        );
    };

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(`${window.location.origin}/api/register`, formData, config);
            onSaveUser();
            setLoading(false);
            navigate('/register');

        } catch (error) {
            console.error('Error al registrar usuario:', error);
            return (
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Error en el registro!</Alert.Heading>
                </Alert>
            );
        }
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            setChange(true);
            await axios.delete(`${window.location.origin}/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>date change</th>
                                <th>D</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.updated_at}</td>
                                    <td>
                                        <div style={{ height: '100%', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5 }} >
                                            <Button onClick={() => deleteUser(user.id)}><MdDeleteForever /></Button>
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
                <RegisterComponentStyles>
                    <section id="contact" className="contact">
                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                                <p>Registrar Nuevo Administrador</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 mt-5 mt-lg-5 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                                    <form onSubmit={handleSubmit} className="php-email-form">
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="name">Nombre</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    id="name"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    required />
                                            </div>
                                            <div className="form-group col-md-12 mt-3 mt-md-0">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="mail"
                                                    className="form-control"
                                                    name="email"
                                                    placeholder="Tu Email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    required />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="password">Contraseña</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    required />
                                            </div>
                                        </div>
                                        <div className="my-3">
                                            <div className="loading">Loading</div>
                                            <div className="error-message"></div>
                                            <div className="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
                                        </div>
                                        <div className="text-center">
                                            {!loading ? <button type="submit">Registrar</button> :
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
                </RegisterComponentStyles>
            </div>
        </>
    )
}

export default RegisterComponent;