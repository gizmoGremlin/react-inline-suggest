"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var enzyme_1 = require("enzyme");
var index_1 = require("../index");
var simpleUsers = ['xmazu', 'sam', 'frodo', 'john'];
describe('<SimpleInlineSuggest />', function () {
    it('sets initialValue', function () {
        var wrapper = enzyme_1.mount(<index_1.InlineSuggest initialValue="john" suggestions={simpleUsers}/>);
        expect(wrapper.find('Input').props().value).toBe('john');
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
