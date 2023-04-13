import styled from "styled-components";

const Header = styled.div`
  padding: 100px 10px 30px 10px;
  font-size: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Heading = styled.div`
  padding: 10px ;
  font-size: 25px;
`

const Bug = styled.div`
  position: absolute;
  inset: 10px 0 initial initial;
`

const Text = styled.div`
  padding: 10px;
`

const Rate = styled.div`
  font-size: 12px;
`

const Star = styled.div`
  transform: translate(4px, 4px);
`

export const Styled = {
    Header,
    Heading,
    Bug,
    Text,
    Rate,
    Star,
}