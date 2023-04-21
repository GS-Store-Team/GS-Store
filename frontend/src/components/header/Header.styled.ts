import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  height: 100px;
  min-height: 100px;
  background-color: #eed7c1;
`

const Tab = styled.div`
  padding: 10px;
  width: 160px;
  min-width: 160px;
  height: 40px;
  background-color: #E3E0DA;
  border: 1px solid darkgray;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TabText = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  cursor: pointer;
  &:hover{
    color: #34678c;
  }
`

const Search = styled.input`
  width: min(100%, 350px);
  min-width: 200px;
  border-radius: 5px;
  border: 1px solid transparent;
  height: 35px;
  background-color: rgba(53, 52, 51, 0.4);
  color: white;
  font-size: 18px;
  padding: 0 20px;
  box-sizing: unset;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    border: 1px solid #7c7c7c;
  }

  :focus {
    outline: none;
  }

  ::placeholder {
    color: white;
    font-size: 15px;
  }
`

const Shovel = styled.span`
  width: 0;
  transform: translateX(-30px);
  margin: auto;
`

const Menu = styled.span`
    width: 120px;
`

const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
`

export const Styled = {
    Header,
    Tab,
    TabText,
    Search,
    Shovel,
    Menu,
    SearchArea,
}
