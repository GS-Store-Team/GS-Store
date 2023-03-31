import React, {FormHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, PropsWithChildren} from "react";


export const Form: React.FC<PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>> = ({ children, ...other }) => <form {...other}>{children}</form>;
export const FormGroup: React.FC<PropsWithChildren> = ({ children }) => <div className="form-group">{children}</div>;
export const FormLabel: React.FC<PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>> = (props) => <label className="form-label" {...props} />;
export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => <input className="form-control" type="text" {...props} />;
export const TextArea: React.FC<InputHTMLAttributes<HTMLTextAreaElement>> = (props) => <textarea className="form-control" {...props} />;