import styled from "styled-components";

const Block = styled.div`
  width: min(100%, 250px);
  min-width: 150px;
  padding: 5px;
  border: 2px solid #BEBBB6;
  border-radius: 5px;
`

const Main = styled.div`
  border-radius: 5px;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  display: flex;
`

const Others = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
`

const Supportive = styled.div`
  border-radius: 5px;
  overflow: hidden;
  width: 60px;
  height: 60px;   
  display: flex;
`

const Arrow = styled.div`
  margin: 5px 0;
  &:hover{
    scale: 1.1;
  }
`

export const Styled = {
    Block,
    Main,
    Others,
    Supportive,
    Arrow,
}