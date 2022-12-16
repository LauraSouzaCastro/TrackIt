import { useContext } from 'react';
import styled from 'styled-components';
import { HabitosContext } from './HabitosContext.js';
import { UsuarioContext } from './UsuarioContext.js';
import axios from 'axios';

export default function Habito({ dias, atualiza }) {
    const { habitos } = useContext(HabitosContext);
    const { usuario } = useContext(UsuarioContext);
    function apagar(h) {
        if (window.confirm('Gostaria de apagar este hábito?')) {
            const requisicao = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${h.id}`, { headers: { 'Authorization': `Bearer ${usuario.token}` } });
            requisicao.then(() => atualiza());
            requisicao.catch((res) => alert(res.response.data.message));
        }
    }
    function habito(h) {
        return (
            <ContainerHabito key={h.id}>
                <h3>
                    {h.name}
                    <ion-icon name="trash-outline" onClick={() => apagar(h)}></ion-icon>
                </h3>
                {dias.map((d) => <BotaoLetra key={d.id} disabled selecionado={h.days.includes(d.id)}>{d.nome}</BotaoLetra>)}
            </ContainerHabito>
        );
    }
    return (
        <>{habitos.map((h) => habito(h))}</>

    );
}

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

const ContainerHabito = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 13px 15px;
    h3{
        font-family: 'Lexend Deca';
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        ion-icon{
            width: 13px;
            height: 15px;
            color: #666666;
        }
    }
`;