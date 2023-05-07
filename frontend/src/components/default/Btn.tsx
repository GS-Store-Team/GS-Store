import React, {ButtonHTMLAttributes, CSSProperties, PropsWithChildren, useCallback, useMemo} from 'react';

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    secondary?: boolean;
    outline?: boolean;
    round?: boolean;
    sm?: boolean;
    theme?: "orange"
    style?: CSSProperties
}

export const Btn = React.forwardRef<HTMLButtonElement, PropsWithChildren<BtnProps>>(({ primary, secondary, outline, round, sm, theme, style, children, ...other }, ref) => {
    const classNames = useMemo(
        () =>
            ['btn']
                .concat(primary ? 'btn-primary' : '')
                .concat(secondary ? 'btn-secondary' : '')
                .concat(outline ? 'btn-outline' : '')
                .concat(round ? 'btn-round btn-round_small' : '')
                .concat(sm ? 'btn_sm' : '')
                .filter((className) => className)
                .join(' '),
        [outline, primary, round, secondary, sm]
    );

    const backgroundColor = useCallback((theme : string) => {
        switch (theme){
            case "orange": return "rgb(255,179,58)"
            default: return ""
        }
    }, [])

    return (
        <button ref={ref} className={classNames} style={theme ? {backgroundColor: backgroundColor(theme), ...style} : style} {...other}>
            {children}
        </button>
    );
});
