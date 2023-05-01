import styled from 'styled-components';

const Title = styled.div`
  text-align: left;
  margin-bottom: 10px;
`

const Text = styled.div`
  text-align: right;
  max-height: 200px;
  overflow-y: auto;
  word-break: break-word;
`

const UserInfo = styled.div`
  display: block;
`

const UserMenu = styled.ul`
  width: 200px;
  min-width: 100px;
  height: 100%;
`

const MenuElem = styled.li<{chosen?: Boolean}>`
  width: 100%;
  min-width: 100px;
  height: 40px;
  list-style-type: none;
  text-align: center;
  line-height: 40px;
  background-color: ${({chosen}) => `${chosen ? "rgba(0,0,0,.05)" : "none"}`};
  box-shadow: ${({chosen}) => `${chosen ? "0 0 5px rgba(0,0,0,.3)" : "none"}`};
  margin-bottom: 5px;
  cursor: pointer;
  &:hover{
    box-shadow: 0 0 5px rgba(0,0,0,.3);
  } 
`

export const Styled = {
    Title,
    Text,
    UserInfo,
    UserMenu,
    MenuElem,
};
