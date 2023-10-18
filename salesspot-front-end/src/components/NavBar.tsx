import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
    <>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>HubSpot
          <ul>
            <li><Link to="/hubspot-schema">Schema</Link></li>
            <li><Link to="/hubspot-import">Import</Link></li>
            <li><Link to="/hubspot-export">Export</Link></li>
          </ul>
        </li>
        <li>Salesforce
          <ul>
            <li><Link to="/salesforce-schema">Schema</Link></li>
            <li><Link to="/salesforce-import">Import</Link></li>
            <li><Link to="/salesforce-export">Export</Link></li>
          </ul>
        </li>
        <li><Link to="/local">Local</Link></li>
        <div className='nav-right'>
          Log In
        </div>
      </ul>
    </nav>
    </>
  );
};

export default NavBar;