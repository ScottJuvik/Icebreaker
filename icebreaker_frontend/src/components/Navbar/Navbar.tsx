import { useEffect, useState } from "react";
import "./NavbarStyles.css";
import { auth, db } from "../../firebase/firebaseConfig";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getLoggedInName, getLoggedInUser } from "../../api/LoggedInAPI";
import { get } from "http";
import { doc, getDoc } from "firebase/firestore";

interface NavbarProps {
  atLoginPage?: boolean;
  atMyPage?: boolean;
}

const Navbar = ({ atLoginPage = false, atMyPage = false }: NavbarProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState("");

  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token_id = sessionStorage.getItem("user_id");
    if (token_id) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    console.log("user_id: ", sessionStorage.getItem("user_id"));
    getLoggedInUser().then((user) => {
      if (user) {
        setName(user.name);
        setIsAdmin(user.type === "admin");
      }
    });
  }, [navigate]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.setItem("user_id", "");
        console.log("yahoooo");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
    window.location.reload();
  };

  const navigateToMyPage = () => {
    navigate("/my_page");
  };

  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <h1 className="navbarTitle">ICEBREAKER</h1>
        </Link>
        <div className="navbar_container">
          {!atLoginPage && isLoggedIn && !atMyPage && (
            <button className="nav-btn" id="navbar-name" onClick={navigateToMyPage}>
              {name}
            </button>
          )}
          {!atLoginPage && isLoggedIn && atMyPage && (
            <button className="nav-btn" onClick={handleLogOut}>LOGG UT</button>
          )}
          {!atLoginPage && !isLoggedIn && (
            <Link to={"/login"}>
              <button className="nav-btn">LOGG IN</button>
            </Link>
          )}
          {isLoggedIn && isAdmin && <p>ADMIN</p>}
        </div>
      </div>
    </>
  );
};

export default Navbar;
