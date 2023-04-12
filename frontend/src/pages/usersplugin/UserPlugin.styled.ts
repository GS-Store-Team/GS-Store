import styled from 'styled-components';
import {Property} from "csstype";

const LeftMenu = styled.div`
  width: 200px;
  height: 100%;
  display: block;
`

const MiddleMenu = styled.div`
  display: flex;
  margin: auto;
`

const UploadButton = styled.div`
  width: 200px;
  height: 35px;
  cursor: pointer;
  margin: 10px 0;
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

export const Styled = {
    LeftMenu,
    UploadButton,
    MiddleMenu,
    MenuBtn,
    PhotoBlock,
};