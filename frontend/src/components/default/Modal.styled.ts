
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
  width: ${({ $width }) => `${$width ? $width : "600px"}` };
  height: ${({ $height }) => `${$height ? $height : "600px"}` };
  display: flex;
  flex-direction: column;
  z-index: 500;
`

const Buttons = styled.div`
  width: 50%;
  display: flex;
  padding: 20px 0 50px 0;
  justify-content: space-between;
  margin: auto;
`

const Title = styled.div`
  width: 100%;
  display: block;
  height: min-content;
  padding: 50px 0;
  text-align: center;
  font-size: 30px;
  font-weight: 3;
  top: 0;
`

const Body = styled.div`
  flex: 1 1 auto;
  margin-top: 0;
  margin-bottom: auto;
  padding: 0 40px;
  width: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`

const Cross = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  font-weight: bold;
  width: 20px;
  height: 20px;
  display: flex;
`

const Text = styled.div`
  font-size: 16px;
  width: 100%;
  padding: 10px 20px;
`

const ScrollSection = styled.div<{$height?: Property.Height}>`
  width: 100%;
  height: ${({ $height }) => `${$height ? $height : 400}px` };
  flex: 1 1 auto;
  overflow-block: auto;
  overflow: auto;
  overflow-y: scroll;
`

const Row = styled.div`
  width: 100%;
  padding: 10px 20px;
`

export const Styled = {
    ModalBackground,
    Modal,
    Buttons,
    Title,
    Body,
    Cross,
    Text,
    ScrollSection,
    Row,
};
