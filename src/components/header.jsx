import '../App.css';
import { Link } from "react-router-dom";
import React, { Fragment } from 'react';

const Header = () => {
    return (
      <Fragment>
       <Link to="/">
       <img className="header_logo" src='../images/logo.png' alt="page logo" /></Link>
      </Fragment>
    );
  }
  
  export default Header;