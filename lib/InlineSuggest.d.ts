import React from 'react';
import { ShouldRenderSugestionFn, GetSuggestionValueFn } from './types';
export interface Props<T = string> {
    className?: string;
    initialValue?: string;
    getSuggestionValue?: GetSuggestionValueFn<T>;
    ignoreCase?: boolean;
    inputValue?: string;
    placeholder?: string;
    navigate?: boolean;
    shouldRenderSuggestion?: ShouldRenderSugestionFn;
    suggestions: T[];
    onInputBlur?(value: string): void;
    onInputChange?(newValue: string): void;
    onMatch?(matchedValue: T): void;
}
export interface State {
    activeIndex: number;
    focused: boolean;
    valueToSuggestFrom: string;
    value: string;
}
export declare class InlineSuggest<T> extends React.Component<Props<T>, State> {
    static defaultProps: {
        ignoreCase: boolean;
        suggestions: never[];
        switchBetweenSuggestions: boolean;
        value: string;
    };
    state: {
        activeIndex: number;
        focused: boolean;
        valueToSuggestFrom: string;
        value: string;
    };
    componentDidMount(): void;
    private memoizedFilterSuggestions;
    render(): JSX.Element;
    private fireOnChange;
    private handleOnChange;
    private handleOnBlur;
    private handleOnKeyDown;
    private handleOnKeyUp;
    private getMatchedSuggestions;
    private getNeedle;
}
