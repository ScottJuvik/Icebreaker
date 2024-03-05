import { useEffect, useState } from "react";
import "./Footer.css";
import { auth, db } from "../../firebase/firebaseConfig";
//import { Link, useNavigate, useLocation } from "react-router-dom";



// Definerer Footer komponenten
const Footer = () => {

  // Render footer elementet med innholdet du vil ha i din footer
  return (
    <footer className="footer">
      {/* Dette er innholdet i footeren din */}
      <p>© {new Date().getFullYear()} ICEBREAKER. Alle rettigheter reservert.</p>
    </footer>
  );
};

export default Footer;
