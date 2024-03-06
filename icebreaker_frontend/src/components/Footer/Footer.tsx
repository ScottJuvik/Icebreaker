import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_content">
        <p>© {new Date().getFullYear()} ICEBREAKER</p>

      </div>
    </footer>
  );
};

export default Footer;
