import { Link } from 'react-router-dom'

function App() {

  return (
    <div >

      <h2>Login AS</h2>
      <Link to="/login">Admin</Link>
      <span>  Or  </span>
      <Link to="/login">Employee</Link>
    </div>
  )
}

export default App
