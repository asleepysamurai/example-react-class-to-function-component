/**
 * TodoItem Component
 */

import React, { Component } from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: false
        };
    }

    toggleItemCompleted = () => {
        this.props.toggleItemCompleted(this.props.id);
    }

    static getDerivedStateFromProps(props, state) {
        const todoItemIndexInCompletedItemIds = props.completedItemIds.indexOf(props.id);

        return { completed: todoItemIndexInCompletedItemIds > -1 };
    }

    render() {
        return (
            <div
                className="todo-item">
                <input
                    id={`completed-${this.props.id}`}
                    type="checkbox"
                    onChange={this.toggleItemCompleted}
                    checked={this.state.completed} />
                <label>{this.props.text}</label>
            </div>
        );
    }
};

export default TodoItem;
