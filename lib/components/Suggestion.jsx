"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var common_1 = require("./common");
var StyledSuggestion = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: 0.4;\n  ", ";\n  border-color: transparent;\n"], ["\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: 0.4;\n  ", ";\n  border-color: transparent;\n"])), common_1.commonStyles);
var Suggestion = function (_a) {
    var needle = _a.needle, shouldRenderSuggestion = _a.shouldRenderSuggestion, value = _a.value;
    if (shouldRenderSuggestion && value && !shouldRenderSuggestion(value)) {
        return null;
    }
    return (<StyledSuggestion>
      {value}
      {needle}
    </StyledSuggestion>);
};
exports.default = Suggestion;
var templateObject_1;
