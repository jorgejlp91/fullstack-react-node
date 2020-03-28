import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi'

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import './styles.css';

function Logon() {

  const [id, setId] = useState('');
  const history = useHistory();
  
  async function handleLogon(e){
    e.preventDefault();
    
    try {
      const response = await api.post('sessions', {id})
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('profile');
    }catch (err){
      alert(`Ocorreu um erro ao logar: ${err}`);
    }
  }


  return (  
      <div className="logon-container" >
        <section className="form">
            <img src={logoImg} alt="be the hero" />

            <form onSubmit={handleLogon}>
                <h1>Faça seu logon</h1>

                <input 
                  value={id}
                  onChange={e => setId(e.target.value)}
                  placeholder="Sua ID" />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>
            </form>

        </section>

        <img src={heroesImg} alt="heroes" />

      </div>
    );
}

export default Logon;
