
import styled from 'styled-components';
import {Property} from "csstype";

const ModalBackground = styled.div`
  margin: auto;
  inset: 0;
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  
  background-color: rgba(0,0,0,0.2);
`

const Modal = styled.div<{ $height?: Property.Height, $width?: Property.Width }>`
  margin: auto;
  inset: 0;
  position: absolute;

  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  
  width: ${({ $width }) => `${$width ? $width : 600}px` };
  height: ${({ $height }) => `${$height ? $height : 600}px` };
  display: flex;
  justify-content: center;
`

const Buttons = styled.div`
  width: 50%;
  height: min-content;
  display: flex;
  padding: 20px 0 50px 0;
  justify-content: space-between;
  position:absolute;
  bottom: 0;
`

const Title = styled.div`
  width: 100%;
  height: min-content;
  padding: 50px 0;
  position:absolute;
  text-align: center;
  font-size: 30px;
  font-weight: 3;
  top: 0;
`

const Body = styled.div`
  padding: 120px 40px;
  width: 100%;
  height: 100%;
  display: block;
`

const Cross = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  font-weight: bold;
  width: 20px;
`

export const Styled = {
    ModalBackground,
    Modal,
    Buttons,
    Title,
    Body,
    Cross
};
