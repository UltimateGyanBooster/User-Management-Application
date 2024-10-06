import React, {useState, useEffect} from "react"
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import UserList from "./components/UserList"
import UserDetail from "./components/UserDetail"

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <Router>
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">User Management Application</h1>
        <nav className="text-green-700 text-3xl underline underline-offset-1">
          <Link to="/">
            <span className=""></span>Home
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<UserList users={users} />} />
          <Route path="/users/:userId" element={<UserDetail users={users} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
