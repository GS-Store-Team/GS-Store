import styled from 'styled-components';

const Main = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`

const Wrapper = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  flex-direction: column;
  display: flex;
  overflow-x: hidden;
  background-color: rgba(227, 224, 218, 0.25);
`

const NoContent = styled.div`
  width: 100%;
  line-height: 200px;
  text-align: center;
`

export const Styled = {
    Main,
    Wrapper,
    NoContent,
};