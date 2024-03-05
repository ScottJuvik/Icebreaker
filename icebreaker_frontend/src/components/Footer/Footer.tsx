import React from "react";
import "./Footer.css"; // Endre til riktig sti for din footer CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_content">
        <p>© {new Date().getFullYear()} ICEBREAKER. Alle rettigheter reservert.</p>
        {/* Du kan legge til flere innholdselementer her om nødvendig */}
      </div>
    </footer>
  );
};

export default Footer;
