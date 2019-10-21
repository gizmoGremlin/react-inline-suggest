import React from 'react';
import {  mount } from 'enzyme';

import { InlineSuggest } from '../index';

const simpleUsers = ['xmazu', 'sam', 'frodo', 'john'];

describe('<SimpleInlineSuggest />', () => {
  it('sets initialValue', () => {
    const wrapper = mount(
      <InlineSuggest initialValue="john" suggestions={simpleUsers} />
    );
    expect(wrapper.state('value')).toBe('john');
  });

  // it('does change a value via props', () => {
  //   const wrapper = mount(
  //     <InlineSuggest initialValue="john" suggestions={simpleUsers} />
  //   );
  //   wrapper.setState({
  //     value: 'xmazu'
  //   });
  //   expect(wrapper.find('input').props().value).toBe('xmazu');
  // });
});
