/**
 * TodoItem Component
 */

import React, { useState, useCallback } from 'react';

function TodoItem({
    id,
    text,
    toggleItemCompleted,
    completedItemIds
}) {
    const [completed, setCompleted] = useState(false);

    const todoItemIndexInCompletedItemIds = completedItemIds.indexOf(id);
    const isCompleted = todoItemIndexInCompletedItemIds > -1;

    if (isCompleted !== completed) {
        setCompleted(isCompleted);
    }

    const onToggle = useCallback(() => {
        toggleItemCompleted(id);
    }, [toggleItemCompleted, id]);

    return (
        <div
            className="todo-item">
            <input
                id={`completed-${id}`}
                type="checkbox"
                onChange={onToggle}
                checked={completed} />
            <label>{text}</label>
        </div>
    );
};

export default TodoItem;
