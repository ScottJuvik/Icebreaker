import { useEffect, useState } from "react";
import "./NavbarStyles.css";
import { auth, db } from "../../firebase/firebaseConfig";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getLoggedInName } from "../../api/LoggedInAPI";
import { get } from "http";

interface NavbarProps {
  atLoginPage?: boolean;
  atMyPage?: boolean;
}

const Navbar = ({ atLoginPage = false, atMyPage = false }: NavbarProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token_id = sessionStorage.getItem("user_id");
    if (token_id) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    console.log("user_id: ", sessionStorage.getItem("user_id"));
    getLoggedInName().then((value) => {
      setName(value);
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
            <button onClick={navigateToMyPage}>{name}</button>
          )}
          {!atLoginPage && isLoggedIn && atMyPage && (
            <button onClick={handleLogOut}>LOGG UT</button>
          )}
          {!atLoginPage && !isLoggedIn && (
            <Link to={"/login"}>
              <button>LOGG IN</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
