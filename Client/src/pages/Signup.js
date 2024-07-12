import React , {useState }from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios'

function Signup() {
    const [newusername, setNewusername] = useState('');
    const [newemail, setNewemail] = useState(''); 
    const [newpassword, setNewpassword] = useState(''); 
    const navigate = useNavigate();


    const signup = (event) => {
        event.preventDefault();
    
        const password = newpassword; 
        const confirmPassword = event.target.elements['confirm-password'].value;
    
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please re-enter.");
            return;
        }
    
        const options = {
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/register`,
            headers: {
                accept: "application/json",
            },
            data: {
                username: newusername,
                email: newemail,
                password : newpassword
            }
        };
        axios
        .request(options)
        .then(function(response){
            console.log(response.data);
            setNewusername('');
            setNewemail('')
            setNewpassword('');
            navigate('/signin')
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className = "Signup">
            <Link to ='/' className = 'Home'><div className="logo"><b>SPARk Ratings</b></div></Link>
            <div className="Signupcon">
                <h2>Create Account</h2>
                <form   onSubmit={signup}>
                    <div class="form-group">
                        <label for="first-name">User Name</label>
                        <input type="text" id="user-name" name="user-name" required  
                        onChange = {(event) => setNewusername(event.target.value)} placeholder='Username'></input>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required 
                        onChange = {(event) => setNewemail(event.target.value)}placeholder='abcd@domain.com'></input>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" minlength="8" required
                        onChange = {(event) => setNewpassword(event.target.value)} placeholder='at least 8 characters'></input>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Re-enter Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" minlength="8" required placeholder='Re-enter Password'></input>
                    </div>
                    <button type="submit" class="signup-btn">Create your SPARk account</button>
                </form>
                <p>Already have an account? <a href="/signin">Sign in</a></p>
            </div>
        </div>
    );
}
  
export default Signup;