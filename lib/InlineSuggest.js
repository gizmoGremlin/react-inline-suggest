import React from 'react';
import styled from 'styled-components';
import memoize from 'lodash.memoize';
import { KeyEnum } from './KeyEnum';
import Suggestion from './components/Suggestion';
import Input from './components/Input';
import { filterSuggestions, getNeedleFromString, getNextSafeIndexFromArray, getPreviousSafeIndexFromArray } from './utils';
const Wrapper = styled.div `
  position: relative;
`;
export class InlineSuggest extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            activeIndex: -1,
            focused: false,
            valueToSuggestFrom: '',
            value: ''
        };
        this.memoizedFilterSuggestions = memoize(filterSuggestions);
        this.fireOnChange = (newValue) => {
            if (this.props.onInputChange) {
                this.props.onInputChange(newValue);
            }
        };
        this.handleOnChange = (e) => {
            const valueFromEvent = e.currentTarget.value;
            const { getSuggestionValue, suggestions, ignoreCase } = this.props;
            let valueToSuggestFrom = valueFromEvent;
            if (valueFromEvent.includes(' ')) {
                const words = valueFromEvent.split(' ');
                const lastWord = words[words.length - 1];
                valueToSuggestFrom = lastWord;
            }
            const newMatchedArray = this.memoizedFilterSuggestions(valueToSuggestFrom, suggestions, Boolean(ignoreCase), getSuggestionValue);
            this.setState({
                activeIndex: newMatchedArray.length > 0 ? 0 : -1,
                valueToSuggestFrom: valueToSuggestFrom,
                value: valueFromEvent,
            });
            this.fireOnChange(valueFromEvent);
        };
        this.handleOnBlur = () => {
            if (this.props.onInputBlur) {
                this.props.onInputBlur(this.state.value);
            }
        };
        this.handleOnKeyDown = (e) => {
            if (this.state.activeIndex === -1) {
                return;
            }
            const { keyCode } = e;
            const { navigate } = this.props;
            const allowedKeyCodes = [
                KeyEnum.TAB,
                KeyEnum.ENTER,
                KeyEnum.UP_ARROW,
                KeyEnum.DOWN_ARROW
            ];
            if (allowedKeyCodes.includes(keyCode)) {
                e.preventDefault();
            }
            if (navigate &&
                (keyCode === KeyEnum.DOWN_ARROW || keyCode === KeyEnum.UP_ARROW)) {
                const matchedSuggestions = this.getMatchedSuggestions();
                this.setState({
                    activeIndex: keyCode === KeyEnum.DOWN_ARROW
                        ? getNextSafeIndexFromArray(matchedSuggestions, this.state.activeIndex)
                        : getPreviousSafeIndexFromArray(matchedSuggestions, this.state.activeIndex)
                });
            }
        };
        this.handleOnKeyUp = (e) => {
            const { keyCode } = e;
            if (this.state.activeIndex >= 0 &&
                (keyCode === KeyEnum.TAB ||
                    keyCode === KeyEnum.ENTER ||
                    keyCode === KeyEnum.RIGHT_ARROW)) {
                const matchedSuggestions = this.getMatchedSuggestions();
                const matchedValue = matchedSuggestions[this.state.activeIndex];
                const newValue = this.props.getSuggestionValue
                    ? this.props.getSuggestionValue(matchedValue)
                    : String(matchedValue);
                let wholeString = newValue;
                if (this.state.value.includes(' ')) {
                    const words = this.state.value.split(' ');
                    words[words.length - 1] = newValue;
                    wholeString = words.join(' ');
                }
                this.setState({
                    value: wholeString + ' '
                });
                this.fireOnChange(wholeString);
                if (this.props.onMatch) {
                    this.props.onMatch(matchedValue);
                }
            }
        };
        this.getMatchedSuggestions = () => {
            return this.memoizedFilterSuggestions(this.state.valueToSuggestFrom, this.props.suggestions, Boolean(this.props.ignoreCase), this.props.getSuggestionValue);
        };
        this.getNeedle = () => {
            const matchedSuggestions = this.getMatchedSuggestions();
            if (!matchedSuggestions[this.state.activeIndex]) {
                return '';
            }
            return getNeedleFromString(this.props.getSuggestionValue
                ? this.props.getSuggestionValue(matchedSuggestions[this.state.activeIndex])
                : String(matchedSuggestions[this.state.activeIndex]), this.state.valueToSuggestFrom);
        };
    }
    componentDidMount() {
        if (this.props.initialValue) {
            this.setState({
                value: this.props.initialValue
            });
        }
    }
    render() {
        return (React.createElement(Wrapper, { className: this.props.className },
            React.createElement(Input, { value: this.state.value, onChange: this.handleOnChange, onBlur: this.handleOnBlur, onKeyDown: this.handleOnKeyDown, onKeyUp: this.handleOnKeyUp }),
            React.createElement(Suggestion, { value: this.state.value, needle: this.getNeedle(), shouldRenderSuggestion: this.props.shouldRenderSuggestion })));
    }
}
InlineSuggest.defaultProps = {
    ignoreCase: true,
    suggestions: [],
    switchBetweenSuggestions: false,
    value: ''
};
//# sourceMappingURL=InlineSuggest.js.map