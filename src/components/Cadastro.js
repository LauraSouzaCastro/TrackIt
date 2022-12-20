import logo from "../assets/logo.png";
import styled from "styled-components";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
    const [clicado, setClicado] = useState(false);
    const [cadastro, setCadastro] = useState({ email: "", name: "", image: "", password: "" });
    const navigate = useNavigate();

    function cadastrar(event) {
        event.preventDefault();
        setClicado(true);
        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", cadastro);
        requisicao.then(() => navigate("/"));
        requisicao.catch((res) => { alert(res.response.data.message); setClicado(false); });
    }
    return (
        <Conatiner>
            <img src={logo} alt="Logo" />
            <Formulario onSubmit={cadastrar} clicado={clicado}>
                <input disabled={clicado} required type="email" placeholder="email" value={cadastro.email} onChange={e => setCadastro({ ...cadastro, email: e.target.value })} data-test="email-input" />
                <input disabled={clicado} required type="password" placeholder="senha" value={cadastro.password} onChange={e => setCadastro({ ...cadastro, password: e.target.value })} data-test="password-input" />
                <input disabled={clicado} required type="text" placeholder="nome" value={cadastro.name} onChange={e => setCadastro({ ...cadastro, name: e.target.value })} data-test="user-name-input" />
                <input disabled={clicado} required type="url" placeholder="foto" value={cadastro.image} onChange={e => setCadastro({ ...cadastro, image: e.target.value })} data-test="user-image-input" />
                <button disabled={clicado} type="submit" data-test="signup-btn">
                    <div>Cadastrar</div>
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
            <Link to="/" data-test="login-link"><p>Já tem uma conta? Faça login!</p></Link>
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