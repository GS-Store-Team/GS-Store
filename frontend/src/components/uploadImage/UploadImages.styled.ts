import styled from "styled-components";


const Area = styled.div`
  width: 350px;
  padding: 10px;
`

const Image = styled.div`
  height: 50px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: rgba(255, 179, 58, 0.05);
  border: 1px solid rgb(255, 179, 58);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`

const Empty = styled(Image)`
  border: 1px dashed rgb(255,179,58);
  background-color: transparent;
`

const Title = styled.div`
  cursor: pointer;
  &:hover{
    scale: 1.1;
    color: rgb(255,179,58);
  }
`

export const Styled = {
    Area,
    Image,
    Empty,
    Title,
}