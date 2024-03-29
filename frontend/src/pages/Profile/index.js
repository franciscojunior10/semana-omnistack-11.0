import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import api from '../../services/api';
import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongId]);

    async function handleDelete(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
               {incidents.map(incident => (
                   <li key={incident.id}>
                       <strong>CASO:</strong>
                        <p>{incident.title}</p>

                       <strong>DESCRIÇÂO:</strong>
                       <p>{incident.description}</p>

                       <strong>VALOR:</strong>
                       <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <Link to={`/incidents/edit/${incident.id}`}>
                            <FiEdit size={20} color="#a8a8b3"/>
                        </Link>

                       <button onClick={() => handleDelete(incident.id)} type="button">
                           <FiTrash2 size={20} color="#a8a8b3"/>
                       </button>
                   </li>
               ))}
            </ul>
        </div>
    );
} 