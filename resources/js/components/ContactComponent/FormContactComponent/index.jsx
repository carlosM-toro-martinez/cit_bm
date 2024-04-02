import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormComponentStyles from './FormComponent.styles';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function FormComponent(props) {
    const formRef = useRef(null);
    const { contact, setLoading, loading } = props;
    const [lat, setLat] = useState('');
    const [change, setChange] = useState('');
    const [long, setLong] = useState('');
    const [ubication, setUbication] = useState('');
    const [mail, setMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [x, setX] = useState('');
    const [idContact, setIdContact] = useState();

    useEffect(() => {
        if (!loading && contact.length > 0) {
            setLat(JSON.parse(contact[0]?.coordinates)?.lat);
            setLong(JSON.parse(contact[0]?.coordinates)?.long);
            setUbication(contact[0].ubication);
            setMail(contact[0].mail);
            setPhoneNumber(contact[0].phone_number);
            setFacebook(contact[0].facebook);
            setInstagram(contact[0].instagram);
            setTiktok(contact[0].tiktok);
            setX(contact[0].x)
            setIdContact(contact[0].id_contact)
        }
    }, [loading, contact])


    const updateContact = async (event) => {
        event.preventDefault();
        const formData = {
            coordinates: {
                lat: lat,
                long: long
            },
            ubication: ubication,
            mail: mail,
            phone_number: phoneNumber,
            facebook: facebook,
            instagram: instagram,
            tiktok: tiktok,
            x: x
        }
        try {
            const token = localStorage.getItem('token');
            setChange(true);
            const response = await axios.post(`${window.location.origin}/api/contacts/${idContact}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(true);
            setChange(false);

        } catch (error) {
            console.error('Error al actualizar el curso:', error);
        }
    };
    return (
        <FormComponentStyles>
            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <p>Actualizar Contactos</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mt-5 mt-lg-5 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                            <form onSubmit={updateContact} className="php-email-form" ref={formRef}>
                                <div className="row">
                                    <div className="form-group col-md-12" style={{ display: 'flex' }}>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lat">Latitude</label>
                                            <input
                                                type="text" name="lat" className="form-control" id="lat" required
                                                value={lat}
                                                onChange={e => setLat(e.target.value)} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="long">Longitude</label>
                                            <input
                                                type="text" name="long" className="form-control" id="long" required
                                                value={long}
                                                onChange={e => setLong(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="ubication">Ubication</label>
                                        <input type="textArea" name="ubication" className="form-control" id="ubication" required
                                            value={ubication}
                                            onChange={e => setUbication(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="mail">Correo</label>
                                        <input
                                            type="mail" name="mail" className="form-control" id="mail" required
                                            value={mail}
                                            onChange={e => setMail(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="phone">Telefono de contacto</label>
                                        <input type="textArea" name="phone" className="form-control" id="phone" required
                                            value={phoneNumber}
                                            onChange={e => setPhoneNumber(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="facebook">Facebook</label>
                                        <input
                                            type="text" name="facebook" className="form-control" id="facebook" required
                                            value={facebook}
                                            onChange={e => setFacebook(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="instagram">Instagram</label>
                                        <input type="textArea" name="instagram" className="form-control" id="instagram"
                                            value={instagram}
                                            onChange={e => setInstagram(e.target.value)} />
                                    </div>                                    <div className="form-group col-md-12">
                                        <label htmlFor="tiktok">Tiktok</label>
                                        <input
                                            type="text" name="tiktok" className="form-control" id="tiktok"
                                            value={tiktok}
                                            onChange={e => setTiktok(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="x">X</label>
                                        <input type="textArea" name="x" className="form-control" id="x"
                                            value={x}
                                            onChange={e => setX(e.target.value)} />
                                    </div>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
                                </div>
                                <div className="text-center">
                                    {!change ? <button type="submit">Actualizar Contactos</button> :
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