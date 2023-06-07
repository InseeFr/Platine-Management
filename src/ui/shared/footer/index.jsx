import { AppContext } from "App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export const Footer = () => {
  const { appVersion } = useContext(AppContext);
  return (
    <nav className="footer">
      <ul>
        <li>{`Version ${appVersion}`}</li>
        <li>
          <Link to="/mentions-legales">Mentions légales</Link>
        </li>
      </ul>
    </nav>
  );
};
