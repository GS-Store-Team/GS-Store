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
`

export const Styled = {
    Main,
    Wrapper
};