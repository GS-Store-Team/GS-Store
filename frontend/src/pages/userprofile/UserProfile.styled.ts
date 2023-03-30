import styled from 'styled-components';
import {Property} from "csstype";
import {hover} from "@testing-library/user-event/dist/hover";

const LeftMenu = styled.div`
  width: 200px;
  height: 100%;
  display: block;
`

const MenuBtn = styled.div<{$backgroundColor?: Property.BackgroundColor}>`
  width: 143px;
  height: 35px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  text-align: center;
  line-height: 35px;
  margin: 10px auto;
  background-color: ${({$backgroundColor}) => `${$backgroundColor}`};
  &:hover{background-color: rgba(217, 217, 217, 0.4)}
`

const PhotoBlock = styled.div`
  height: 100%;
  display: block;
  min-width: 350px;
`

/*
.my__photo{
    justify-content: center;
    display: flex;
    margin-top: 120px;
    width: 40%;
    position:relative;
}

.my__img{
    margin: auto;
    margin-top: 8px;
    border-radius: 30px;
    width: 300px;
    aspect-ratio: 1/1;
}
*/

export const Styled = {
    LeftMenu,
    MenuBtn,
    PhotoBlock,
};
