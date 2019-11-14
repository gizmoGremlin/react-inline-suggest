# React Inline Suggest
[![npm version](https://badge.fury.io/js/react-inline-suggest.svg)](https://badge.fury.io/js/react-inline-suggest)

> [React](http://facebook.github.io/react/index.html) component for a search input inline suggestions.

## Features

- Inline suggestion displayed in fancy way
- Support simple arrays and complex arrays with objects
- Accept value on **Enter**/**Tab**/**Right Arrow** click
- Switch between suggestions using **UP**/**Down Arrow**
- You decide when to render suggestion (eg. when user types 3 or more characters)

## Installation

```shell
yarn add react-inline-suggest
```

or

```shell
npm install react-inline-suggest --save
```

## Demo and examples
[Live demo](https://xmazu.github.io/react-inline-suggest/)

## Basic usage

### Use InlineSuggest with complex array
```jsx
import { InlineSuggest } from 'react-inline-suggest';

const users = [
  {
    id: 1,
    username: 'xmazu',
    email: 'xmazu@yahoo.com'
  },
  {
    id: 2,
    username: 'adam_tombleson',
    email: 'adam.tombleson@gmail.com'
  }
];

class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <InlineSuggest
        suggestions={users}
        value={this.state.value}
        onChange={this.onChangeValue}
        onMatch={v => console.log(v)}
        ignoreCase={false}
      />
    );
  }

  onChangeValue = e => {
    this.setState({ value: e.currentTarget.value });
  }
}

```

## Props

Component extends `React.HTMLProps<HTMLInputElement>` interface and adds some own props.

| Property                 | Type    |   Default | Required | Description                                                                                                          |
|--------------------------|---------|----------:|----------|----------------------------------------------------------------------------------------------------------------------|
| value                    | any     | undefined | yes      | initial field value                                                                                                  |
| suggestions              | array   | undefined | yes      | Array of available items to search in. Items can take an arbitrary shape.                                            |
| onChange                 | func    | undefined | yes      | onChange handler: function(e: React.FormEvent) {}                                                                    |
| onMatch                  | func    | undefined |          | Called when Tab/Enter/Right Arrow pressed or value matches fully                                                     |
| getFn                    | func    | undefined |          | Used to read the display value from each entry in suggestions: function(item: any): string {}                        |
| ignoreCase               | boolean |      true |          | Determines whether the case-sensitivity is relevant                                                                  |
| shouldRenderSuggestion   | func    | undefined |          | When typing, this function will be called to consult when to render the suggestion. function(value: any): boolean {} |
| switchBetweenSuggestions | boolean | false     |          | Set it to `true` if you would like to switch between suggestions using Up/Down arrows                                |
| placeholder              | string  | undefined |          | Input placeholder text                                                                                               |

## Typings
If you are using [TypeScript](https://www.typescriptlang.org/), you don't have to install typings - they are provided in the npm package.

## Development

```shell
yarn
yarn start
```

Now, open `http://localhost:8080` and start hacking!

## License
MIT
