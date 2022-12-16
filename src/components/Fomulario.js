import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import axios from 'axios';
import { UsuarioContext } from './UsuarioContext.js';
import { useContext, useState } from 'react';

export default function Formulario({ dias, containerCriar, setContainerCriar, atualiza }) {
    const { usuario } = useContext(UsuarioContext);
    const [clicado, setClicado] = useState(false);
    const [habito, setHabito] = useState({ name: "", days: [] });
    function criar(event) {
        event.preventDefault();
        if (habito.days.length === 0) {
            alert("Escolha pelo menos um dia.")
        } else {
            setClicado(true);
            const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habito, { headers: { 'Authorization': `Bearer ${usuario.token}` } });
            requisicao.then(() => { atualiza(); setHabito({ name: "", days: [] }); setClicado(false); setContainerCriar(false); });
            requisicao.catch((res) => { alert(res.response.data.message); setClicado(false); });
        }
    }
    function selecionarDia(d) {
        if (habito.days.includes(d.id)) {
            const novoArray = [];
            for (let i = 0; i < habito.days.length; i++) {
                if (d.id !== habito.days[i]) {
                    novoArray.push(habito.days[i]);
                }
            }
            setHabito({ ...habito, days: [...novoArray] });
        } else {
            setHabito({ ...habito, days: [...habito.days, d.id] });
        }
    }
    return (
        <ContainerFormulario onSubmit={criar} containerCriar={containerCriar} clicado={clicado}>
            <input disabled={clicado} required type="text" placeholder="nome do hábito" value={habito.name} onChange={e => setHabito({ ...habito, name: e.target.value })}></input>
            <div>{dias.map((d) => <BotaoLetra disabled={clicado} key={d.id} type="button" selecionado={habito.days.includes(d.id)} onClick={() => selecionarDia(d)}>{d.nome}</BotaoLetra>)}</div>
            <ContainerBotoes>
                <BotaoCancelar disabled={clicado} type="button" onClick={() => setContainerCriar(!containerCriar)}>Cancelar</BotaoCancelar>
                <BotaoSalvar disabled={clicado} type="submit" clicado={clicado}>
                    <div>Salvar</div>
                    <ThreeDots
                        height="11"
                        width="43"
                        radius="9"
                        color="#ffffff"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={clicado}
                    />
                </BotaoSalvar>
            </ContainerBotoes>
        </ContainerFormulario>
    );
}
const ContainerFormulario = styled.form`
        width: 340px;
        height: 180px;
        background-color: #FFFFFF;
        border-radius: 5px; 
        display: ${props => props.containerCriar ? "flex" : "none"};
        flex-direction: column;
        padding: 18px;
        margin-bottom: 29px;
    input{
        width: 303px;
        height: 45px;
        background-color: ${props => props.clicado ? "#F2F2F2" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding-left: 11px;
        font-family: 'Lexend Deca', sans-serif;
        margin-bottom: 8px;
        color: ${props => props.clicado ? "#AFAFAF" : "#000000"};
        &::placeholder{
            font-family: 'Lexend Deca', sans-serif;
            font-size: 19.976px;
            line-height: 25px;
            color: #DBDBDB;
        }
    }
`;
const ContainerBotoes = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 29px;
    justify-content: flex-end;
`;

const BotaoSalvar = styled.button`
    width: 84px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 4.63636px;
    padding-bottom: 3px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 15.976px;
    line-height: 20px;
    border: none;
    color: #FFFFFF;
    margin-left: 23px;
    opacity: ${props => props.clicado ? "0.7" : "1"};
    display: flex;
        justify-content: center;
        align-items: center;
    div{
        display: ${props => !props.clicado ? "flex" : "none"};
    }
`;

const BotaoCancelar = styled.button`
    width: 69px;
    height: 20px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 15.976px;
    line-height: 20px;
    color: #52B6FF;
    border: none;
    background-color: #FFFFFF;
`;

const BotaoLetra = styled.button`
    width: 30px;
    height: 30px;
    background-color: ${props => props.selecionado ? "#CFCFCF" : "#FFFFFF"} ;
    border: 1px solid ${props => props.selecionado ? "#CFCFCF" : "#D5D5D5"};
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
    margin-right: 4px;
`;