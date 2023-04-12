import styled from "styled-components";
import {Property} from "csstype";


const Menu = styled.div<{ $top: Property.Top, $left?: Property.Left, $right?: Property.Right}>`
  top: ${({ $top }) => `${$top}px` };
  left: ${({ $left }) => `${$left}` };
  right: ${({ $right }) => `${$right}` };
  position: absolute;
  z-index: 1000;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
`

const Elem = styled.div`
  background-color: rgba(0,0,0,.6);
  cursor: pointer;
  font-size: 14px;
  color: white;
  padding: 5px 20px;

  &:hover {
    background-color: white;
    color: black;
  }
`

const Selected = styled.div`
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
  font-size: 14px;
  padding: 5px 20px;

  &:hover {
    background-color: white;
    color: black;
  }
`

export const Styled = {
    Menu,
    Elem,
    Selected,
}