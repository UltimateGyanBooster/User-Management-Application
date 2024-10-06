import React, {useState, useEffect} from "react"
import axios from "axios"
import UserForm from "./UserForm"
import "./UserList.css"
import {Link} from "react-router-dom"

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editUser, setEditUser] = useState(null) // Store the user being edited

  // Fetch users from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch users")
        setLoading(false)
      })
  }, [])

  // Handle adding a new user
  const handleAddUser = newUser => {
    setUsers([...users, newUser])
    setShowForm(false) // Close form after adding
  }

  // Handle deleting a user
  const handleDeleteUser = userId => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId))
      })
      .catch(() => {
        alert("Failed to delete user")
      })
  }

  // Handle editing a user
  const handleEditUser = user => {
    setEditUser(user)
    setShowForm(true)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="user-list">
      <button
        onClick={() => {
          setShowForm(true)
          setEditUser(null)
        }}
      >
        Add User
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td data-label="Name">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Phone">{user.phone}</td>
              <td data-label="Actions">
                <button className="mr-3" onClick={() => handleEditUser(user)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>{" "}
                {/* Added View button */}
                <Link to={`/users/${user.id}`}>
                  <button style={{marginLeft: "10px"}}>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <UserForm
          onClose={() => setShowForm(false)}
          onAddUser={handleAddUser}
          editUser={editUser}
          onUpdateUser={updatedUser => {
            setUsers(
              users.map(user =>
                user.id === updatedUser.id ? updatedUser : user
              )
            )
            setShowForm(false)
          }}
        />
      )}
    </div>
  )
}

export default UserList
