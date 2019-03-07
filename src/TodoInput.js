/**
 * TodoInput Component
 */

import React, { Component } from 'react';

class TodoInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }

    onTextChange = (ev) => {
        this.setState({ text: ev.currentTarget.value });
    }

    addTodoItem = () => {
        this.props.onAdd(this.state.text);
        this.setState({ text: '' });
    }

    render() {
        return (
            <div
                className="todo-input">
                <input
                    type="text"
                    onChange={this.onTextChange}
                    value={this.state.text}
                    placeholder="Enter Todo Here" />
                <button
                    onClick={this.addTodoItem}>
                    Add Todo
                </button>
            </div>
        );
    }
};

export default TodoInput;
