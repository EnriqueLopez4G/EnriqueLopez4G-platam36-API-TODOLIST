import React, { useState, useEffect } from "react";

const MainCard = ({ user }) => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        const response = await fetch(`https://playground.4geeks.com/todo/users/${user.name}`);
        if (response.ok) {
            const result = await response.json();
            setTodos(result.todos || []);
        } else {
            console.error("Error al obtener tareas:", response.statusText);
        }
    };

    const putActivity = async () => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${user.name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label: inputValue, is_done: false }),
        });

        if (response.ok) {
            const newTodo = await response.json();
            setTodos(prev => [...prev, newTodo]);
            setInputValue('');
        } else {
            console.error("Error al agregar actividad:", await response.json());
        }
    };

    const handleDelete = async (todoId) => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, { method: 'DELETE' });

        if (response.ok) {
            setTodos(todos.filter(todo => todo.id !== todoId));
            alert('Tarea eliminada con éxito.');
        } else {
            console.error("Error al eliminar la tarea:", await response.json());
        }
    };

    const handleDeleteAll = async () => {
        await Promise.all(todos.map(todo => 
            fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, { method: 'DELETE' })
        ));
        setTodos([]);
        alert('Todas las tareas han sido eliminadas.');
    };

    useEffect(() => {
        fetchTodos();
    }, [user.name]);

    return (
        <div className="card" style={{ width: '500px', backgroundColor: '#f0f0f0', margin: '10px 0' }}>
            <p>User: {user.name}</p>
            <input
                type="text"
                className="form-control"
                placeholder="Write new activity here..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && inputValue.trim() && putActivity()}
            />
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{todo.label}</span>
                        <button onClick={() => handleDelete(todo.id)} style={{ border: 'none', background: 'white', cursor: 'pointer' }}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
            <p>{todos.length <= 0 ? 'No tasks, add a task' : `${todos.length} Activities in the list`}</p>
            <button className="btn btn-danger" onClick={handleDeleteAll}>Delete All Tasks</button>
        </div>
    );
};

export default MainCard;
