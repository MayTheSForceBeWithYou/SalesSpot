import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/schema">Schema</Link></li>
        <li><Link to="/import">Import</Link></li>
        <li><Link to="/export">Export</Link></li>
        <div className='nav-right'>
          Log In
        </div>
      </ul>
    </nav>
    </>
  );
};

export default NavBar;