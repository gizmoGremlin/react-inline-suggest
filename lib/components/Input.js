import React from 'react';
import styled from 'styled-components';
import { commonStyles } from './common';
const StyledInput = styled.input `
  position: relative;
  z-index: 1;
  display: inline-block;
  background-color: transparent;
  width: 100%;

  ${commonStyles};
`;
const Input = props => React.createElement(StyledInput, Object.assign({}, props));
export default Input;
//# sourceMappingURL=Input.js.map