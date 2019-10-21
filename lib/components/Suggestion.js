import React from 'react';
import styled from 'styled-components';
import { commonStyles } from './common';
const StyledSuggestion = styled.span `
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
  ${commonStyles};
  border-color: transparent;
`;
const Suggestion = ({ needle, shouldRenderSuggestion, value }) => {
    if (shouldRenderSuggestion && value && !shouldRenderSuggestion(value)) {
        return null;
    }
    return (React.createElement(StyledSuggestion, null,
        value,
        needle));
};
export default Suggestion;
//# sourceMappingURL=Suggestion.js.map