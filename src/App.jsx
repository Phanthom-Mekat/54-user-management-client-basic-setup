import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleSub = e=>{
    e.preventDefault()
    const form = e.target
    const email =form.email.value
    const name =form.name.value
    const user ={name ,email}
    console.log(user)
    fetch('http://localhost:5000/users',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(user)

    })
    .then(res => res.json())
    .then(data=> {
      const newUser=[...users,data]
      setUsers(newUser)
      form.reset()
    })
  }

  return (
    <>
      <h1>User management system</h1>
      <h3>number of users:{users.length}</h3>
      <form onSubmit={handleSub} >
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {
          users.map(user=><li key={user.id}>{user.id}:{user.name}:{user.email}</li>)
        }
      </div>
    </>
  )
}

export default App
