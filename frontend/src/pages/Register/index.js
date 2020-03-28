import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api.js';

import logoImg from '../../assets/logo.svg';

import './styles.css';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = {name, email, whatsapp, city, uf};

    try {
        
        const response = await api.post('ongs', data);
        alert(`ONG cadastrada com sucesso, seu id: ${response.data.id}`)
        history.push('/');
    }catch (err){
        alert(`Ocorreu algum erro ao cadastrar ONG, erro: ${err}`)
    }
  }

    
  return (  
      <div className="register-container" >
        <div className="content" >
            <section>
                <img src={logoImg} alt="be the hero" />

                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>
            </section>

            <form onSubmit={handleRegister}>
                <input 
                    onChange={e => setName(e.target.value)}
                    value={name}
                    placeholder="Nome da ONG" />
                <input 
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email" 
                    placeholder="E-mail" />
                <input
                    onChange={e => setWhatsapp(e.target.value)}
                    value={whatsapp}
                    placeholder="WhatsApp"/>

                <div className="input-group">
                    <input 
                        onChange={e => setCity(e.target.value)}
                        value={city}
                        placeholder="Cidade" />
                    <input 
                        onChange={e => setUf(e.target.value)}
                        value={uf}
                        placeholder="UF" 
                        style={{width: 80}} />
                </div>
                
                <button className="button" type="submit">Cadastrar</button>
            </form>

        </div>        
      </div>
    );
}

export default Register;
