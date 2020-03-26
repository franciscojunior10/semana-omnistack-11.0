import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.svg';

export default function EditIncident( props ) {
    const [incidents, setIncidents] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescroption] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        const { id } = props.match.params;

        api.get(`profile/${id}`, {
            headers: {
                Authorization: ongId,
            },
        }).then(res => {
            setIncidents(res.data);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleUpdate(e) {
        e.preventDefault();
        
        const { id } = props.match.params;

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.put(`incidents/${id}`, data, {
                headers: {
                    Authorization: ongId, 
                }
            })

            alert('Atualizado com sucesso.');

            history.push('/profile');
        } catch (error) {
            alert('Não foi possível atualizar, tente novamente.');
        }
    }

    return (
        <div className="edit-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero"/>

                    <h1>Editar o caso</h1>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleUpdate}>
                    <h3>Título do caso: <span>{incidents.title}</span></h3>
                    <input 
                        required
                        type="text"
                        placeholder="Novo título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                    />
                    
                    <h3>Descrição: <span>{incidents.description}</span></h3>
                    <textarea 
                        required
                        type="text"
                        placeholder="Nova descrição"
                        value={description}
                        onChange={e => setDescroption(e.target.value)} 
                    />
                    
                    <h3>Valor em reais: <span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</span></h3>
                    <input 
                        required
                        type="text"
                        placeholder="Novo valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)} 
                    />
                    
                    <button className="button" type="submit">Editar</button>
                </form>
            </div>
        </div>
    );
}