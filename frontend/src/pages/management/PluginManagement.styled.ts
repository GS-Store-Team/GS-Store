import styled from "styled-components";
import {PluginStatus} from "../../Types";

const PluginTab = styled.div<{$status: PluginStatus }>`
  width: 80%;
  min-height: 130px;
  min-width: 500px;
  padding: 20px 30px;
  cursor: pointer;
  
  opacity: 0.6;
  
  background-color: ${({ $status }) => {
      switch ($status){
        case "OK": return "rgb(216,236,193)"
        case "MODERATION": return "rgb(245,234,186)"
        case "BLOCKED": return "rgb(255,169,169)"
      }
  }};
  
  &:hover{
    box-shadow: 0 0 20px rgba(0,0,0,.3);
    animation: appear1 0.2s forwards ease-out;
  }

  @keyframes appear1 {
    0% {opacity: 0.6}
    
    100% {opacity: 1}
  }
`

const Header = styled.div`
  color: #34678c;
  font-size: 18px;
  font-weight: bold;
`

export const Styled = {
    PluginTab,
    Header,
}