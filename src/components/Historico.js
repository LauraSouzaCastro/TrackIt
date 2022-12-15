import styled from 'styled-components';

export default function Historico(){
    return(
        <ContainerHistorico>
            <h1>Histórico</h1>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </ContainerHistorico>
    );
}

const ContainerHistorico = styled.div`
    width: 100%;
    height: 100vh;
    padding: 98px 17px;
    background-color: #F2F2F2;
    h1{
        font-family: 'Lexend Deca';
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
        margin-bottom: 17px;
    }
    p{
        font-family: 'Lexend Deca';
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
;
`