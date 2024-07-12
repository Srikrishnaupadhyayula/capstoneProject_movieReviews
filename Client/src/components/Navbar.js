import React,{useContext} from 'react';
import Search from './Search'
import { Link } from 'react-router-dom';
import { usercontext } from './usercontext'

function Navbar() {
  const { user , setuser } = useContext(usercontext);


  const handleLogout = () => {
    setuser('')
  }

  return (
    <div className = 'navbar'>
      <header>
        <Link to ='/' className = 'Home'><div className="logo"><b>SPARk Ratings</b></div></Link>
        <Search />
        <div className = "user">
          {user ? (
              <>
                <button className="button">{user}</button>
                <Link to = {`/spark/user/${user}`} ><button className="button">Your Reviews</button></Link>
                <button className="button" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to='/signin'>
                <button className="button">Sign-In</button>
              </Link>
            )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;