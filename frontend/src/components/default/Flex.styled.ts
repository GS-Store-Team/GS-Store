import styled from 'styled-components';
import { Property } from 'csstype';

export const FlexColumn = styled.div<{ gap?: Property.Gap, width?: Property.Width }>`
    width: ${({ width }) => width};
    display: flex;
    flex-direction: column;
    gap: ${({ gap }) => gap || '1em'};
`;

export const FlexRow = styled.div<{ gap?: Property.Gap, justifyContent?: Property.JustifyContent, margin?: Property.Margin}>`
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent };
    gap: ${({ gap }) => gap || '1em'};
    margin: ${({ margin }) => margin};
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: auto;
    min-width: 300px;
    max-height: calc(100vh - 170px);
    ::-webkit-scrollbar {
    display: none;
    }
`;
