import React, { useState, useEffect } from 'react';
import MainCard from './MainCard';

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showMainCard, setShowMainCard] = useState(false);

    const postNewUser = async (user_name) => {
        const URL_API_USER = `https://playground.4geeks.com/todo/users/${user_name}`;
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
            console.log("MIS DATOS DESPUES DE API:", data);
            setUsers([...users,data]);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteOldUser = async (user) => {
        const URL_API_USER_DELETE = `https://playground.4geeks.com/todo/users/${user.name}`;
        console.log(URL_API_USER_DELETE)
        try {
            const response = await fetch(URL_API_USER_DELETE, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleAddUser = async() => {
        if (username.trim() === '') return;

        if (editingIndex !== null) {
            //Si lo que el usuario pretende es modiciar entonces le daremos gusto sino que se vaya x el else para alta nueva

            const oldUser = users[editingIndex];
            const updatedUsers = [...users];
            updatedUsers[editingIndex] = { name: username, id: users[editingIndex].id };
            
            await deleteOldUser(oldUser);
            await postNewUser(username); // Esto es porque no se cuando carajos se terminan
            setUsers(updatedUsers);
            setEditingIndex(null);
        } else {
            postNewUser(username);
            setUsers([...users, { name: username, id: Date.now() }]); // Usamos Date.now() como ID temporal
        }
        setUsername('');
    };

    const handleDeleteUser = (index) => {
        //voy a crear un nuevo array con los elementosm que cumplan el siguiente criterio
        //pondre un guion bajo para indicar un primer parametro, pero sin nombre ya que no lo voy a usar realmente
        // genera una nueva lista pero de aquellos elementos que no mson el indice gual a donde estoy parado ahorita

          //ahora hay nque actualiozar la con la API
          deleteOldUser(users[index]);
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
      
    };

    const handleEditUser = (index) => {
        setUsername(users[index].name);
        setEditingIndex(index);
    };

    const handleActivityUser = (index) => {
        setSelectedUser(users[index]);
        setShowMainCard(true);
    };

    const handleBackToUsers = () => {
        setShowMainCard(false);
        setSelectedUser(null);
    };

    const fetchAllUsers = async () => {
        const URL_API_GETALL = `https://playground.4geeks.com/todo/users/`;
        try {
            const response = await fetch(URL_API_GETALL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setUsers(result.users);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
            {showMainCard ? (
                <div>
                    <button className="btn btn-secondary" onClick={handleBackToUsers}>
                        Volver a la lista de usuarios
                    </button>
                    {selectedUser && <MainCard user={selectedUser} />}
                </div>
            ) : (
                <div style={{ height: '80vh', overflowY: 'auto' }}>
                    <h2 className="text-center">Gestión de Usuarios</h2>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleAddUser}>
                        {editingIndex !== null ? 'Modificar Usuario' : 'Agregar Usuario'}
                    </button>
                    <div className="mt-4">
                        <h4>Lista de Usuarios</h4>
                        <ul className="list-group">
                            {users.map((user, index) => (
                                <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {user.name}
                                    <div>
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditUser(index)}>
                                            Modificar
                                        </button>
                                        <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteUser(index)}>
                                            Eliminar
                                        </button>
                                        <button className="btn btn-success btn-sm" onClick={() => handleActivityUser(index)}>
                                            Actividades
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserForm;
