import React, { ButtonHTMLAttributes, PropsWithChildren, useMemo } from 'react';

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    secondary?: boolean;
    outline?: boolean;
    round?: boolean;
    sm?: boolean;
}

export const Btn = React.forwardRef<HTMLButtonElement, PropsWithChildren<BtnProps>>(({ primary, secondary, outline, round, sm, children, ...other }, ref) => {
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

    return (
        <button ref={ref} className={classNames} {...other}>
            {children}
        </button>
    );
});
