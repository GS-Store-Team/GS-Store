import styled from "styled-components";
import {Property} from "csstype";

const Cloud = styled.div`
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  background-color: rgba(0,0,0, 0.5);
  width: max(40%, 400px);
  text-align: center;
  left: 50%;
  transform: translate(-50%);
  z-index: 100;
`

const Tag = styled.div<{color: Property.Color}>`
  height: 20px;
  padding: 0 3px 0 5px;
  border-radius: 5px;
  background-color: ${({color}) => color};
  margin: 1px;
  display: inline-table;
  cursor: pointer;
  &:hover{
    background-color: rgba(255,221,128)
  }
`

export const Styled = {
    Cloud,
    Tag,
}