import React, { useState, useEffect } from "react";
import '../../styles/MainCard.css';

const MainCard = ({ user }) => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);
    const URL_BASE = `https://playground.4geeks.com/todo`;


    const fetchTodos = async () => {
        const response = await fetch(`${URL_BASE}/users/${user.name}`);
        if (response.ok) {
            const result = await response.json();
            setTodos(result.todos || []);
        } else {
            console.error("Error al obtener tareas:", response.statusText);
        }
    };

    const putActivity = async () => {
        const response = await fetch(`${URL_BASE}/todos/${user.name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label: inputValue, is_done: false }),
        });

        if (response.ok) {
            setInputValue(''); // Limpiar el input
            await fetchTodos(); // Hacer GET para asegurar que la lista esté actualizada
        } else {
            console.error("Error al agregar actividad:", await response.json());
        }
    };

    const handleDelete = async (todoId) => {
        const response = await fetch(`${URL_BASE}/todos/${todoId}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Tarea eliminada con éxito.');
            await fetchTodos(); // Hacer GET para asegurar que la lista esté actualizada
        } else {
            console.error("Error al eliminar la tarea:", await response.json());
        }
    };

    const handleDeleteAll = async () => {
        const URL_API_USER = `${URL_BASE}/users/${user.name}`;
        try {
            const response = await fetch(URL_API_USER, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            try {
                const response = await fetch(URL_API_USER, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                await fetchTodos(); // Hacer GET para asegurar que la lista esté actualizada
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [user.name]);

    return (
        <div className="card bg-light my-2" style={{ width: "500px" }}>
            <p>User: <strong>{user.name}</strong></p>
            <input
                type="text"
                className="form-control"
                placeholder="Write new activity here..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && inputValue.trim() && putActivity()}
            />
            <ul className="list-unstyled">
                {todos.map(todo => (
                    <li key={todo.id} className="d-flex justify-content-between align-items-center todoItem">
                        <span>{todo.label}</span>
                        <button 
                            className="deleteBtn" 
                            onClick={() => handleDelete(todo.id)} 
                            style={{ border: 'none', background: 'white', cursor: 'pointer' }}
                        >
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
