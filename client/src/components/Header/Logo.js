import React from 'react';
import logo from "../../assets/play2day.jpg";
import classes from './Logo.module.css';

const Logo = () => {
    return (
        <img src={logo} alt="" className={classes.logo}></img>
    );
};

export default Logo;