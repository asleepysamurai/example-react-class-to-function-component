/**
 * Todo Root Container Component
 */

import React, { useReducer, useCallback, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

function Todo() {
    function generateID() {
        return Date.now().toString(36) + '-' + (Math.random() + 1).toString(36).substring(7);
    };

    const [state, dispatch] = useReducer((state, action) => {
        if (action.type === 'toggleItemCompleted') {
            const { todoItemId } = action;
            const todoItemIndexInCompletedItemIds = state.completedItemIds.indexOf(todoItemId);

            const completedItemIds = todoItemIndexInCompletedItemIds === -1 ?
                state.completedItemIds.concat([todoItemId]) :
                ([
                    ...state.completedItemIds.slice(0, todoItemIndexInCompletedItemIds),
                    ...state.completedItemIds.slice(todoItemIndexInCompletedItemIds + 1)
                ]);

            return { ...state, completedItemIds };
        }

        if (action.type === 'addTodoItem') {
            const newTodoItem = {
                text: action.text,
                id: generateID()
            };

            const todoItems = state.todoItems.concat([newTodoItem]);
            return { ...state, todoItems };
        }

        return state;
    }, {
        todoItems: [],
        completedItemIds: []
    }, (state) => {
        let savedTodos = localStorage.getItem('todos');

        try {
            savedTodos = JSON.parse(savedTodos);
            return Object.assign({}, state, savedTodos);
        } catch (err) {
            console.log('Saved todos non-existent or corrupt. Trashing saved todos.');
            return state;
        }
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state));
    });

    const toggleItemCompleted = useCallback((todoItemId) => {
        dispatch({ type: 'toggleItemCompleted', todoItemId });
    }, [dispatch]);

    const todoList = state.todoItems.map(todoItem => {
        return (
            <TodoItem
                key={todoItem.id}
                completedItemIds={state.completedItemIds}
                toggleItemCompleted={toggleItemCompleted}
                {...todoItem} />
        );
    });

    const addTodoItem = useCallback((text) => {
        dispatch({ type: 'addTodoItem', text });
    }, [dispatch]);

    const todoInput = (
        <TodoInput
            onAdd={addTodoItem} />
    );

    return (
        <div
            className="todo-container">
            {todoList}
            {todoInput}
        </div>
    );
};

export default Todo;
