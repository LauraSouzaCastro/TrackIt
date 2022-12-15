import { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { ThreeDots } from  'react-loader-spinner';
import { useContext } from 'react';
import { UsuarioContext } from './UsuarioContext.js';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [clicado, setClicado] = useState(false);
    const [login, setLogin] = useState({email: "", password: ""});
    const {setUsuario} = useContext(UsuarioContext);
    const navigate = useNavigate();
    useEffect(() => { 
        setUsuario({email: "", id: "", image: "", name: "", password: "", token:""});
    }, []);
    function entrar(event){
        event.preventDefault();
        setClicado(true);
        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", login);
        requisicao.then((res) => {setUsuario(res.data); navigate("/hoje"); }) ;
        requisicao.catch((res) => {alert(res.response.data.message); setClicado(false);}) ;
    }
    return(
        <Conatiner>
            <img src={logo} alt="Logo"/>
            <Formulario onSubmit={entrar} clicado={clicado}>
                <input disabled={clicado} required type="email" placeholder="email" value={login.email} onChange={e => setLogin({...login, email: e.target.value})}/>
                <input disabled={clicado} required type="password" placeholder="senha" value={login.password} onChange={e => setLogin({...login, password: e.target.value} )}/>
                <button disabled={clicado} type="submit">
                    <div>Entrar</div>
                    <ThreeDots 
                        height="13" 
                        width="51" 
                        radius="9"
                        color="#ffffff" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={clicado}
                    />
                </button>
            </Formulario>
            <Link to="/cadastro"><p>Não tem uma conta? Cadastre-se!</p></Link>
        </Conatiner>
    );
}

const Conatiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 68px;
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 13.976px;
        line-height: 17px;
        text-decoration-line: underline;
        color: #52B6FF;
        margin: 25px 0px;
    }
`;
const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 33px;
    input{
        width: 303px;
        height: 45px;
        background-color: ${props => props.clicado ? "#F2F2F2" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 19.976px;
        line-height: 25px;
        padding-left: 11px;
        margin-bottom: 6px;
        color: ${props => props.clicado ? "#AFAFAF" : "#000000"};
        &::placeholder{
            color: #DBDBDB;
        }
    }
    button{
        width: 303px;
        height: 45px;
        background-color: #52B6FF;
        border-radius: 4.63636px;
        color: #FFFFFF;
        border: none;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20.976px;
        line-height: 26px;
        opacity: ${props => props.clicado ? "0.7" : "1"};
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div{
        display: ${props => !props.clicado ? "flex" : "none"};
    }
`;