import React, { useState } from 'react';
import Link from './Link';
import "./styles.css"

const Header = ({orders}) => {
  const [windowPath, setWindowPath] = useState(window.location.pathname)


  return (
    <nav className="navbar navbar-expand-lg navbar-dark  global-styles">
        <a className="navbar-brand" href="#!">Pizza Shop</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className={`nav-link ${windowPath === "/" ? "active" : ""} `} href="/" onWindowChange={()=>setWindowPath(window.location.pathname)}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${windowPath === "/menu" ? "active" : ""}`} href="/menu"  onWindowChange={()=>setWindowPath(window.location.pathname)}>Menu</Link>
                </li> 
                <li className="nav-item">
                    <Link className={`nav-link ${windowPath === "/customize" ? "active" : ""}`} href="/customize"  onWindowChange={()=>setWindowPath(window.location.pathname)}>Customize Pizza</Link>
                </li>       
            </ul>
            <ul className="navbar-nav ml-auto">
                <li  className="nav-item">
                    <Link className={`nav-link ${windowPath === "/cart" ? "active" : ""}`} href="/cart" onWindowChange={()=>setWindowPath(window.location.pathname)}>
                        <span>
                            Cart {orders > 0 ? <span className="badge badge-light">{orders}</span>: null}
                        </span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${windowPath === "/login" ? "active" : ""}`} href="/login" onWindowChange={()=>setWindowPath(window.location.pathname)}>Login</Link>
                </li>
            </ul>
        </div>
  </nav>
  );
};

export default Header;