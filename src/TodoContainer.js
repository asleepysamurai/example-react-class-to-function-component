/**
 * Todo Root Container Component
 */

import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoItems: [],
            completedItemIds: []
        };
    }

    generateID() {
        return Date.now().toString(36) + '-' + (Math.random() + 1).toString(36).substring(7);
    }

    addTodoItem = (text) => {
        const newTodoItem = {
            text,
            id: this.generateID()
        };

        const todoItems = this.state.todoItems.concat([newTodoItem]);
        this.setState({ todoItems });
    }

    toggleItemCompleted = (todoItemId) => {
        const todoItemIndexInCompletedItemIds = this.state.completedItemIds.indexOf(todoItemId);

        const completedItemIds = todoItemIndexInCompletedItemIds === -1 ?
            this.state.completedItemIds.concat([todoItemId]) :
            ([
                ...this.state.completedItemIds.slice(0, todoItemIndexInCompletedItemIds),
                ...this.state.completedItemIds.slice(todoItemIndexInCompletedItemIds + 1)
            ]);

        this.setState({ completedItemIds });
    }

    componentDidMount() {
        let savedTodos = localStorage.getItem('todos');

        try {
            savedTodos = JSON.parse(savedTodos);
            this.setState(Object.assign({}, this.state, savedTodos));
        } catch (err) {
            console.log('Saved todos non-existent or corrupt. Trashing saved todos.');
        }
    }

    componentDidUpdate() {
        localStorage.setItem('todos', JSON.stringify(this.state));
    }

    render() {
        debugger;
        const todoList = this.state.todoItems.map(todoItem => {
            return (
                <TodoItem
                    key={todoItem.id}
                    completedItemIds={this.state.completedItemIds}
                    toggleItemCompleted={this.toggleItemCompleted}
                    {...todoItem} />
            );
        });

        const todoInput = (
            <TodoInput
                onAdd={this.addTodoItem} />
        );

        return (
            <div
                className="todo-container">
                {todoList}
                {todoInput}
            </div>
        );
    }
};

export default Todo;
