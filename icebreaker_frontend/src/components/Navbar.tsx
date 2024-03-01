import { useEffect, useState } from "react";
import "../style/NavbarStyles.css";
import { auth, db } from '../firebase/firebaseConfig';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";

interface NavbarProps {
  atLoginPage?: boolean;
}

const Navbar = ({ atLoginPage = false }: NavbarProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token_id = sessionStorage.getItem("user_id");
    if (token_id) {
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false);
    }
  }, [navigate])

  const handleLogOut = () => {
    signOut(auth).then(() => {
      sessionStorage.setItem("user_id", "");
      console.log("yahoooo");
    }).catch((error) => {
      console.log(error)
    });
    window.location.reload();
  }


  return (
    <>
      <div className="navbar">
        <div className="navbar_container">
          {!atLoginPage &&
            <div>
              {
                isLoggedIn ? <button onClick={handleLogOut}>LOGG UT</button> : <Link to={"/login"}><button>LOGG IN</button></Link>
              }
            </div>
          }
          <button hidden={true}>MENY</button>
        </div>
        <Link to={"/"}>
          <h1 className="navbarTitle">ICEBREAKER</h1>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
