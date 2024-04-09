import React, {useState} from 'react'
import { useNavigate }from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "", cpassword:""})
    let nevigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        // console.log(json);
        if (json.success){
            //  save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            nevigate('/')
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='container'>
      <form >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name"  required minLength={2} name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" required minLength={2}  name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password"  required minLength={2} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword"  required minLength={2} />
                </div>

                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Signup
