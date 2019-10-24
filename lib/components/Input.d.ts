import React, { SFC } from 'react';
export interface InputProps {
    value: string;
    placeholder?: string;
    onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
    onChange(e: React.FormEvent<HTMLInputElement>): void;
    onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
    onKeyUp(e: React.KeyboardEvent<HTMLInputElement>): void;
}
declare const Input: SFC<InputProps>;
export default Input;
