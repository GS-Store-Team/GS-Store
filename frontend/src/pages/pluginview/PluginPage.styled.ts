import styled from "styled-components";

const Header = styled.div`
  padding: 0 10px;
  font-size: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-height: 80px;
`

const Heading = styled.div`
  padding: 10px 10px 0 10px;
  font-size: 25px;
  word-break: break-word;
`

const Text = styled.div`
  padding: 10px;
  word-break: break-word;
`

const Rate = styled.div`
  font-size: 12px;
`

const Star = styled.div`
  transform: translate(4px, 6px);
`

const Items = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
`

export const Styled = {
    Header,
    Heading,
    Text,
    Rate,
    Star,
    Items,
}