import React, {FormHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, PropsWithChildren} from "react";
import {Simulate} from "react-dom/test-utils";
import invalid = Simulate.invalid;

interface IInvalid{
    invalid? : boolean
}

export const Form: React.FC<PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>> = ({ children, ...other }) => <form {...other}>{children}</form>;
export const FormGroup: React.FC<PropsWithChildren> = ({ children }) => <div className="form-group">{children}</div>;
export const FormLabel: React.FC<PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>> = (props) => <label className="form-label" {...props} />;
export const Input: React.FC<InputHTMLAttributes<HTMLInputElement> & IInvalid> = (props) => <input className={props.invalid ? 'form-control is-invalid' : 'form-control'} type="text" {...props} />;
export const TextArea: React.FC<InputHTMLAttributes<HTMLTextAreaElement> & IInvalid> = (props) => <textarea className={props.invalid ? 'form-control is-invalid' : 'form-control'} {...props} />;
