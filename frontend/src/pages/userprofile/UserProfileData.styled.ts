import styled from 'styled-components';

const Title = styled.div`
  text-align: left;
  margin-bottom: 10px;
`

const Text = styled.div`
  text-align: right;
  max-height: 200px;
  overflow-y: auto;
  word-break: break-word;
`

const UserInfo = styled.div`
  display: block;
`

export const Styled = {
    Title,
    Text,
    UserInfo
};
