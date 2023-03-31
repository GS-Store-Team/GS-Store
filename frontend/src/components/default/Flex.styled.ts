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

export const FlexGrow = styled.div`
    flex-grow: 1;
`;