import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.svg'

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescroption] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente');
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Bt The Hero" />

                    <h1>Cadastrar ovo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        required
                        type="text" 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}    
                    />
                    <textarea 
                        required
                        type="text" 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescroption(e.target.value)}    
                    />
                    <input 
                        required
                        type="text" 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}    
                    />
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}