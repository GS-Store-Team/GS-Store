import styled from "styled-components";

const Tab = styled.div`
  padding: 10px;
  width: 160px;
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

export const Styled = {
    Tab,
    TabText,
}
