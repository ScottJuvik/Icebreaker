import { useEffect, useState } from "react";
import "./NavbarStyles.css";
import { auth, db } from "../../firebase/firebaseConfig";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface NavbarProps {
  atLoginPage?: boolean;
}

const Navbar = ({ atLoginPage = false }: NavbarProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const retrieveAdmin = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      return;
    }
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setIsAdmin(docSnap.data().type == "admin");
    }
    else {
      console.log("No such document!")
    }
  }

  useEffect(() => {
    const token_id = sessionStorage.getItem("user_id");
    if (token_id) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    retrieveAdmin();
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
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <h1 className="navbarTitle">ICEBREAKER</h1>
        </Link>
        <div className="navbar_container">
          {!atLoginPage && isLoggedIn && (
            <button onClick={handleLogOut}>LOGG UT</button>
          )}
          {!atLoginPage && !isLoggedIn && (
            <Link to={"/login"}>
              <button>LOGG IN</button>
            </Link>
          )}
          {(isLoggedIn && isAdmin) && (<Link to={"/admin"}>
            <button>ADMIN</button>
          </Link>
          )}
          <button onClick={toggleMenu} className="menu-button">
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
        </div>
      </div>
      {isMenuVisible && (
        <div className="menu_content">{/* Menyelementene her */}</div>
      )}
    </>
  );
};

export default Navbar;
