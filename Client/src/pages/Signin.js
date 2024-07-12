import React, {  useState, useContext } from 'react';
import { usercontext } from '../components/usercontext'
import Navbar from '../components/Navbar';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios'

function Signin () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const { setuser } = useContext(usercontext);
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/login`,
            headers: {
                accept: "application/json",
            },
            data: {
                username: username,
                password : password
            }
        };
        axios
        .request(options)
        .then(function(response){
            console.log(response.data);
            setuser(username);
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
            alert("Invalid Credentials ")
        });
    };
    
  

    return (
        <>
            <Navbar />
            <div className='Signin'>
                <div className="Spark">
                    <h1>Sign in</h1>
                    <form onSubmit={handleSignIn} className='userinput'>
                        <input className="username" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input className="username" placeholder='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="signin_submit" type="submit">Sign In</button>
                    </form>

                    
                    <div className="separator"><span>or</span></div>

                    
                    <Link to = "/signup" >
                        <button className="createacc">Create a New Account</button>
                    </Link>
                    
                    
                    <p className="terms">
                        By signing in, you agree to SPARk's Privacy Policy
                    </p>
                </div>
            </div>
      </>
    );
}
  
  export default Signin;