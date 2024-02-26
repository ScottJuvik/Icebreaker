import "./NavbarStyles.css";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar_container">
          <button hidden={true}>LOGG INN</button>
          <button hidden={true}>MENY</button>
        </div>
        <h1>ICEBREAKER</h1>
      </div>
    </>
  );
}

export default Navbar;
