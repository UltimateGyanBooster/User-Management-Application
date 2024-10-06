// import React, {useState, useEffect} from "react"
// import axios from "axios"
// import "./UserForm.css"

// const UserForm = ({onClose, onAddUser, editUser, onUpdateUser}) => {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [phone, setPhone] = useState("")
//   const [street, setStreet] = useState("")
//   const [city, setCity] = useState("")
//   const [companyName, setCompanyName] = useState("")
//   const [website, setWebsite] = useState("")

//   // If editing a user, pre-fill the form
//   useEffect(() => {
//     if (editUser) {
//       setName(editUser.name)
//       setEmail(editUser.email)
//       setPhone(editUser.phone)
//       setStreet(editUser.address.street)
//       setCity(editUser.address.city)
//       setCompanyName(editUser.company.name)
//       setWebsite(editUser.website)
//     }
//   }, [editUser])

//   // Form validation
//   const validateForm = () => {
//     if (name.length < 3) {
//       alert("Name must be at least 3 characters")
//       return false
//     }
//     if (!email.includes("@")) {
//       alert("Invalid email format")
//       return false
//     }
//     if (phone.length === 0) {
//       alert("Phone is required")
//       return false
//     }
//     return true
//   }

//   // Handle form submission
//   const handleSubmit = e => {
//     e.preventDefault()
//     if (!validateForm()) return

//     const user = {
//       name,
//       email,
//       phone,
//       username: `USER-${name}`,
//       address: {street, city},
//       company: {name: companyName},
//       website,
//     }

//     if (editUser) {
//       axios
//         .put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, user)
//         .then(response => {
//           onUpdateUser(response.data) // Update the user in the list
//         })
//         .catch(() => {
//           alert("Failed to update user")
//         })
//     } else {
//       axios
//         .post("https://jsonplaceholder.typicode.com/users", user)
//         .then(response => {
//           onAddUser(response.data) // Add the new user to the list
//         })
//         .catch(() => {
//           alert("Failed to create user")
//         })
//     }
//   }

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>{editUser ? "Edit User" : "Add New User"}</h2>
//         <form onSubmit={handleSubmit}>
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={e => setName(e.target.value)}
//           />

//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           />

//           <label>Phone</label>
//           <input
//             type="text"
//             value={phone}
//             onChange={e => setPhone(e.target.value)}
//           />

//           <label>Street</label>
//           <input
//             type="text"
//             value={street}
//             onChange={e => setStreet(e.target.value)}
//           />

//           <label>City</label>
//           <input
//             type="text"
//             value={city}
//             onChange={e => setCity(e.target.value)}
//           />

//           <label>Company Name (optional)</label>
//           <input
//             type="text"
//             value={companyName}
//             onChange={e => setCompanyName(e.target.value)}
//           />

//           <label>Website (optional)</label>
//           <input
//             type="text"
//             value={website}
//             onChange={e => setWebsite(e.target.value)}
//           />

//           <button type="submit">{editUser ? "Update" : "Add"} User</button>
//         </form>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   )
// }

// export default UserForm

import React, {useState, useEffect} from "react"
import axios from "axios"
import "./UserForm.css"

const UserForm = ({onClose, onAddUser, editUser, onUpdateUser}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [website, setWebsite] = useState("")

  const [errors, setErrors] = useState({}) // State to track errors

  // If editing a user, pre-fill the form
  useEffect(() => {
    if (editUser) {
      setName(editUser.name)
      setEmail(editUser.email)
      setPhone(editUser.phone)
      setStreet(editUser.address.street)
      setCity(editUser.address.city)
      setCompanyName(editUser.company.name)
      setWebsite(editUser.website)
    }
  }, [editUser])

  // Form validation
  const validateForm = () => {
    const newErrors = {}
    // Name validation
    if (!name || name.length < 3) {
      newErrors.name = "Name must be at least 3 characters"
    }
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailPattern.test(email)) {
      newErrors.email = "Invalid email format"
    }
    // Phone validation
    const phonePattern = /^\d{10}$/ // Assuming 10-digit phone number
    if (!phone || !phonePattern.test(phone)) {
      newErrors.phone = "Phone is required and must be 10 digits"
    }
    // Street and City validation
    if (!street) {
      newErrors.street = "Street is required"
    }
    if (!city) {
      newErrors.city = "City is required"
    }
    // Company Name validation (optional but minimum 3 characters)
    if (companyName && companyName.length < 3) {
      newErrors.companyName = "Company name must be at least 3 characters"
    }
    // Website validation (optional, must be valid if provided)
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/
    if (website && !urlPattern.test(website)) {
      newErrors.website = "A valid URL is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Returns true if no errors
  }

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault()
    if (!validateForm()) return // Validate the form

    const user = {
      name,
      email,
      phone,
      username: `USER-${name}`, // Auto-generated username
      address: {street, city},
      company: {name: companyName},
      website,
    }

    if (editUser) {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, user)
        .then(response => {
          onUpdateUser(response.data) // Update the user in the list
        })
        .catch(() => {
          alert("Failed to update user")
        })
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/users", user)
        .then(response => {
          onAddUser(response.data) // Add the new user to the list
        })
        .catch(() => {
          alert("Failed to create user")
        })
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{editUser ? "Edit User" : "Add New User"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value)
              setErrors(prev => ({...prev, name: ""})) // Clear error
            }}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              setErrors(prev => ({...prev, email: ""})) // Clear error
            }}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={e => {
              setPhone(e.target.value)
              setErrors(prev => ({...prev, phone: ""})) // Clear error
            }}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <label>Street</label>
          <input
            type="text"
            value={street}
            onChange={e => {
              setStreet(e.target.value)
              setErrors(prev => ({...prev, street: ""})) // Clear error
            }}
          />
          {errors.street && <span className="error">{errors.street}</span>}

          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={e => {
              setCity(e.target.value)
              setErrors(prev => ({...prev, city: ""})) // Clear error
            }}
          />
          {errors.city && <span className="error">{errors.city}</span>}

          <label>Company Name (optional)</label>
          <input
            type="text"
            value={companyName}
            onChange={e => {
              setCompanyName(e.target.value)
              setErrors(prev => ({...prev, companyName: ""})) // Clear error
            }}
          />
          {errors.companyName && (
            <span className="error">{errors.companyName}</span>
          )}

          <label>Website (optional)</label>
          <input
            type="text"
            value={website}
            onChange={e => {
              setWebsite(e.target.value)
              setErrors(prev => ({...prev, website: ""})) // Clear error
            }}
          />
          {errors.website && <span className="error">{errors.website}</span>}

          <button type="submit">{editUser ? "Update" : "Add"} User</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default UserForm
