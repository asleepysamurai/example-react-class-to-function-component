/**
 * TodoInput Component
 */

import React, { useState, useCallback } from 'react';

function TodoInput({
    onAdd
}) {
    const [text, setText] = useState('');

    const onTextChange = useCallback((ev) => setText(ev.currentTarget.value), [setText]);

    const addTodoItem = useCallback(() => {
        onAdd(text);
        setText('');
    }, [onAdd, text, setText]);

    return (
        <div
            className="todo-input">
            <input
                type="text"
                onChange={onTextChange}
                value={text}
                placeholder="Enter Todo Here" />
            <button
                onClick={addTodoItem}>
                Add Todo
            </button>
        </div>
    );
};

export default TodoInput;
