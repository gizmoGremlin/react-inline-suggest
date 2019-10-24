"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var lodash_memoize_1 = tslib_1.__importDefault(require("lodash.memoize"));
var KeyEnum_1 = require("./KeyEnum");
var Suggestion_1 = tslib_1.__importDefault(require("./components/Suggestion"));
var Input_1 = tslib_1.__importDefault(require("./components/Input"));
var utils_1 = require("./utils");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var InlineSuggest = /** @class */ (function (_super) {
    tslib_1.__extends(InlineSuggest, _super);
    function InlineSuggest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            activeIndex: -1,
            focused: false,
            valueToSuggestFrom: '',
            value: ''
        };
        _this.memoizedFilterSuggestions = lodash_memoize_1.default(utils_1.filterSuggestions);
        _this.fireOnChange = function (newValue) {
            if (_this.props.onInputChange) {
                _this.props.onInputChange(newValue);
            }
        };
        _this.handleOnChange = function (e) {
            var valueFromEvent = e.currentTarget.value;
            var _a = _this.props, getSuggestionValue = _a.getSuggestionValue, suggestions = _a.suggestions, ignoreCase = _a.ignoreCase;
            var valueToSuggestFrom = valueFromEvent;
            if (valueFromEvent.includes(' ')) {
                var words = valueFromEvent.split(' ');
                var lastWord = words[words.length - 1];
                valueToSuggestFrom = lastWord;
            }
            var newMatchedArray = _this.memoizedFilterSuggestions(valueToSuggestFrom, suggestions, Boolean(ignoreCase), getSuggestionValue);
            _this.setState({
                activeIndex: newMatchedArray.length > 0 ? 0 : -1,
                valueToSuggestFrom: valueToSuggestFrom,
                value: valueFromEvent,
            });
            _this.fireOnChange(valueFromEvent);
        };
        _this.handleOnBlur = function () {
            if (_this.props.onInputBlur) {
                _this.props.onInputBlur(_this.state.value);
            }
        };
        _this.handleOnKeyDown = function (e) {
            if (_this.state.activeIndex === -1) {
                return;
            }
            var keyCode = e.keyCode;
            var navigate = _this.props.navigate;
            var allowedKeyCodes = [
                KeyEnum_1.KeyEnum.TAB,
                KeyEnum_1.KeyEnum.ENTER,
                KeyEnum_1.KeyEnum.UP_ARROW,
                KeyEnum_1.KeyEnum.DOWN_ARROW
            ];
            if (allowedKeyCodes.includes(keyCode)) {
                e.preventDefault();
            }
            if (navigate &&
                (keyCode === KeyEnum_1.KeyEnum.DOWN_ARROW || keyCode === KeyEnum_1.KeyEnum.UP_ARROW)) {
                var matchedSuggestions = _this.getMatchedSuggestions();
                _this.setState({
                    activeIndex: keyCode === KeyEnum_1.KeyEnum.DOWN_ARROW
                        ? utils_1.getNextSafeIndexFromArray(matchedSuggestions, _this.state.activeIndex)
                        : utils_1.getPreviousSafeIndexFromArray(matchedSuggestions, _this.state.activeIndex)
                });
            }
        };
        _this.handleOnKeyUp = function (e) {
            var keyCode = e.keyCode;
            if (_this.state.activeIndex >= 0 &&
                (keyCode === KeyEnum_1.KeyEnum.TAB ||
                    keyCode === KeyEnum_1.KeyEnum.ENTER ||
                    keyCode === KeyEnum_1.KeyEnum.RIGHT_ARROW)) {
                var matchedSuggestions = _this.getMatchedSuggestions();
                var matchedValue = matchedSuggestions[_this.state.activeIndex];
                var newValue = _this.props.getSuggestionValue
                    ? _this.props.getSuggestionValue(matchedValue)
                    : String(matchedValue);
                var wholeString = newValue;
                if (_this.state.value.includes(' ')) {
                    var words = _this.state.value.split(' ');
                    // replace last word
                    words[words.length - 1] = newValue;
                    // add space at end, to not re-trigger the suggestion
                    wholeString = words.join(' ');
                }
                _this.setState({
                    value: wholeString + ' '
                });
                _this.fireOnChange(wholeString);
                if (_this.props.onMatch) {
                    _this.props.onMatch(matchedValue);
                }
            }
        };
        _this.getMatchedSuggestions = function () {
            return _this.memoizedFilterSuggestions(_this.state.valueToSuggestFrom, _this.props.suggestions, Boolean(_this.props.ignoreCase), _this.props.getSuggestionValue);
        };
        _this.getNeedle = function () {
            var matchedSuggestions = _this.getMatchedSuggestions();
            if (!matchedSuggestions[_this.state.activeIndex]) {
                return '';
            }
            return utils_1.getNeedleFromString(_this.props.getSuggestionValue
                ? _this.props.getSuggestionValue(matchedSuggestions[_this.state.activeIndex])
                : String(matchedSuggestions[_this.state.activeIndex]), _this.state.valueToSuggestFrom);
        };
        return _this;
    }
    InlineSuggest.prototype.componentDidMount = function () {
        if (this.props.initialValue) {
            this.setState({
                value: this.props.initialValue
            });
        }
    };
    InlineSuggest.prototype.render = function () {
        var _a = this.props, placeholder = _a.placeholder, className = _a.className, shouldRenderSuggestion = _a.shouldRenderSuggestion;
        return (react_1.default.createElement(Wrapper, { className: className },
            react_1.default.createElement(Input_1.default, { value: this.state.value, onChange: this.handleOnChange, onBlur: this.handleOnBlur, onKeyDown: this.handleOnKeyDown, onKeyUp: this.handleOnKeyUp, placeholder: placeholder }),
            react_1.default.createElement(Suggestion_1.default, { value: this.state.value, needle: this.getNeedle(), shouldRenderSuggestion: shouldRenderSuggestion })));
    };
    InlineSuggest.defaultProps = {
        ignoreCase: true,
        suggestions: [],
        switchBetweenSuggestions: false,
        value: ''
    };
    return InlineSuggest;
}(react_1.default.Component));
exports.InlineSuggest = InlineSuggest;
var templateObject_1;
