import { UsuarioContext } from './UsuarioContext.js';
import { HabitosConcluidosContext } from './HabitosConcluidosContext.js';
import { useContext } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Menu(){
    const {usuario} = useContext(UsuarioContext);
    const {habitosConcluidos} = useContext(HabitosConcluidosContext);
    return(
        <ContainerMenu id={usuario.id}>
            <Link to="/habitos"><Botao>Hábitos</Botao></Link>
            <Link to="/hoje">
                <BotaoHoje>
                    <div>
                        <CircularProgressbar
                            value={habitosConcluidos}
                            text="Hoje"
                            styles={buildStyles({
                                textSize: '22px',
                                pathTransitionDuration: 0.5,
                                pathColor: '#FFFFFF',
                                textColor: '#FFFFFF',
                                trailColor: '#52B6FF',
                                backgroundColor: '#52B6FF',
                            })}
                            />;
                    </div>
                </BotaoHoje>
            </Link>
            <Link to="/historico"><Botao>Histórico</Botao></Link>
        </ContainerMenu>
    );
}

const ContainerMenu = styled.div`
    width: 100%;
    height: 70px;
    left: 0px;
    bottom: 0px;
    position: fixed;
    background-color: #FFFFFF;
    display: ${props => props.id === "" ? "none" : "flex"};
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
`;
const Botao = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    line-height: 22px;
    color: #52B6FF;
    border: none;
    background-color: #FFFFFF;
`;
const BotaoHoje = styled.div`
    width: 91px;
    height: 91px;
    background-color: #52B6FF;
    font-family: 'Lexend Deca';
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    border-radius: 90px;
    margin-bottom: 40px;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        width: 80px;
        height: 80px;
    }
`;