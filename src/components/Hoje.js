import styled from 'styled-components';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { UsuarioContext } from './UsuarioContext.js';
import { HabitosConcluidosContext } from './HabitosConcluidosContext.js';
import dayjs from 'dayjs';
export default function Hoje() {
    const { habitosConcluidos, setHabitosConcluidos } = useContext(HabitosConcluidosContext);
    const [habitosHoje, setHabitosHoje] = useState([]);
    const { usuario } = useContext(UsuarioContext);

    useEffect(() => {
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", { headers: { 'Authorization': `Bearer ${usuario.token}` } });
        requisicao.then((res) => {
            setHabitosHoje(res.data);
            const novoObjeto = { feitos: (res.data.filter(o => o.done === true).length), total: res.data.length }
            setHabitosConcluidos({ ...novoObjeto });
        });
        requisicao.catch((res) => { alert(res.response.data.message); });
    }, [usuario.token, setHabitosConcluidos]);

    function clicar(h) {
        let requisicao;
        if (h.done === false) {
            requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${h.id}/check`, {}, { headers: { 'Authorization': `Bearer ${usuario.token}` } });
        }else{
            requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${h.id}/uncheck`, {}, { headers: { 'Authorization': `Bearer ${usuario.token}` } });
        }
        requisicao.then(() => atualiza());
        requisicao.catch((res) => { alert(res.response.data.message); });
    }
    function atualiza() {
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", { headers: { 'Authorization': `Bearer ${usuario.token}` } });
        requisicao.then((res) => {
            setHabitosHoje(res.data);
            const novoObjeto = { feitos: (res.data.filter(o => o.done === true).length), total: res.data.length }
            setHabitosConcluidos({ ...novoObjeto });
        });
        requisicao.catch((res) => { alert(res.response.data.message); });
    }
    function dia() {
        let nomeDia = '';
        switch (dayjs().day()) {
            case 0:
                nomeDia = 'Domingo';
                break;
            case 1:
                nomeDia = 'Segunda';
                break;
            case 2:
                nomeDia = 'Terça';
                break;
            case 3:
                nomeDia = 'Quarta';
                break;
            case 4:
                nomeDia = 'Quinta';
                break;
            case 5:
                nomeDia = 'Sexta';
                break;
            case 6:
                nomeDia = 'Sábado';
                break;
            default:
                break;
        }
        return (
            <h1>{nomeDia}, {dayjs().date()}/{dayjs().month() + 1}</h1>
        );
    }
    return (
        <ContainerHoje habitosConcluidos={habitosConcluidos}>
            {dia()}
            <p>{habitosConcluidos.feitos === 0 ? "Nenhum hábito concluído ainda" : `${Math.round((habitosConcluidos.feitos / habitosConcluidos.total) * 100)}% dos hábitos concluídos`}</p>
            {habitosHoje.map((h) => <ConatinerHabito key={h.id} feito={h.done} recorde={h.highestSequence === h.currentSequence}><div><h1>{h.name}</h1><h2>Sequência atual: <span>{h.currentSequence} dias</span></h2><h3>Seu recorde: <span>{h.highestSequence} dias</span></h3></div><button onClick={() => clicar(h)}><ion-icon name="checkmark-outline"></ion-icon></button></ConatinerHabito>)}
        </ContainerHoje>
    );
}

const ContainerHoje = styled.div`
    width: 100%;
    min-height: calc(100vh - 70px);
    padding: 98px 17px;
    background-color: #F2F2F2;
    h1{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
        padding-bottom: 7px;
    }
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 17.976px;
        line-height: 22px;
        color: ${props => props.habitosConcluidos.feitos === 0 ? "#BABABA" : "#8FC549"};
        margin-bottom: 28px;
    }
`;

const ConatinerHabito = styled.div`
    width: 340px;
    height: 94px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    font-family: 'Lexend Deca', sans-serif;
    div{
        color: #666666;
        h1{
            font-size: 19.976px;
            line-height: 25px;
            
        }
        h2{
            font-size: 12.976px;
            line-height: 16px;
            span{
                color: ${props => props.feito ? "#8FC549" : "#666666"} ;
            }
        }
        h3{
            font-size: 12.976px;
            line-height: 16px;
            span{
                color: ${props => (props.feito && props.recorde) ? "#8FC549" : "#666666"} ;
            }
        }
    }
    button{
        width: 69px;
        height: 69px;
        background-color: ${props => props.feito ? "#8FC549" : "#EBEBEB"} ;
        border: 1px solid ${props => props.feito ? "#8FC549" : "#E7E7E7"};
        border-radius: 5px;
        border: none;
        ion-icon{
            width: 40px;
            height: 35px;
            color: #FFFFFF;
        }
    }
`;