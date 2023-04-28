import styled from "styled-components";
import {Property} from "csstype";

const Tooltip = styled.div<{$top?:number, $left?:number, $bottom?:number, $right?:number, $transform:Property.Transform}>`
  top: ${({ $top }) => `${$top}px`};
  right: ${({ $right }) => `${$right}px`};
  left: ${({ $left }) => `${$left}px`};
  bottom: ${({ $bottom }) => `${$bottom}px`};
  position: absolute;
  padding: 5px 10px;
  color: white;
  font-size: 14px;
  background-color: rgba(128, 128, 128, 1);
  transform: ${({ $transform }) => `${$transform}`};
  border-radius: 3px;
  animation: appear 0.8s forwards;
  z-index: 100;
  @keyframes appear {
    0% {opacity: 0;}  
    80% {opacity: 0;}
    100% {opacity: 1;}
  }
`

export const Styled = {
    Tooltip
}