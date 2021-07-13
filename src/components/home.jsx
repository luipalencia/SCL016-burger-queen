import React, { Fragment } from 'react';
import '../App.css';
import Header from './header.jsx'
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <Fragment>
            <header className="header">
                <Header></Header>
            </header>
            <section className="home_icons mt-3">

            <div className="home_icons--item">
                <Link to="/cuisine" className="btn mt-2 btn_group" style={{ backgroundColor: "#7d1010" }}>
                <img srcSet="../images/chef.jpg" className="home_images" alt="chef section" rel="preload"/></Link>
            </div>

            <div className="home_icons--item"> 
                <Link to="/waiters" className="btn mt-2 btn_group" style={{ backgroundColor: "#000000" }}>
                <img srcSet="../images/waiter.jpg" className="home_images" alt="waiters section" rel="preload" /></Link>
            </div>
            </section>
        </Fragment>

    );
}

export default Home;
