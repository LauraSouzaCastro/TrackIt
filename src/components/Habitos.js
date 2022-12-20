import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UsuarioContext } from '../contexts/UsuarioContext.js';
import Formulario from './Fomulario.js';
import Habito from './Habito.js';
import { HabitosConcluidosContext } from '../contexts/HabitosConcluidosContext.js';

export default function Habitos() {
    const [habitos, setHabitos] = useState([]);
    const { usuario } = useContext(UsuarioContext);
    const { habitosConcluidos, setHabitosConcluidos } = useContext(HabitosConcluidosContext);
    const [containerCriar, setContainerCriar] = useState(false);

    const dias = [{ id: 0, nome: "D" }, { id: 1, nome: "S" }, { id: 2, nome: "T" }, { id: 3, nome: "Q" }, { id: 4, nome: "Q" }, { id: 5, nome: "S" }, { id: 6, nome: "S" }];

    useEffect(() => {
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", { headers: { 'Authorization': `Bearer ${usuario.token}` } });
        requisicao.then((res) => setHabitos(res.data));
        requisicao.catch((res) => { alert(res.response.data.message); });
    }, [setHabitos, usuario.token]);

    function atualiza() {
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", { headers: { 'Authorization': `Bearer ${usuario.token}` } });
        requisicao.then((res) => { setHabitos(res.data); setHabitosConcluidos({ ...habitosConcluidos, total: (habitosConcluidos.total + 1) }); });
        requisicao.catch((res) => alert(res.response.data.message));
    }
    return (
        <ContainerHabitos habitos={habitos} >
            <span><h1>Meus hábitos</h1><div onClick={() => setContainerCriar(!containerCriar)} data-test="habit-create-btn">+</div></span>
            <Formulario dias={dias} containerCriar={containerCriar} setContainerCriar={setContainerCriar} atualiza={atualiza} />
            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            <Habito dias={dias} atualiza={atualiza} habitos={habitos} />
        </ContainerHabitos>
    );
}

const ContainerHabitos = styled.div`
    width: 100%;
    min-height: calc(100vh - 70px);
    padding: 98px 17px;
    background-color: #F2F2F2;
    span{
        display: flex;
        justify-content: space-between;
        width: 100%;
        h1{
            font-family: 'Lexend Deca', sans-serif;
            font-size: 22.976px;
            line-height: 29px;
            color: #126BA5;
            margin-bottom: 17px;
        }
        div{
            width: 40px;
            height: 35px;
            background-color: #52B6FF;
            border-radius: 4.63636px;
            font-family: 'Lexend Deca', sans-serif;
            font-size: 27px;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 5px;
        }
    }
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        display: ${props => props.habitos.length === 0 ? "flex" : "none"};
    }
    
`;