import React from "react";

import Styles from "./navbar.module.css"

const Navbar = () => {

  return (

    <div className={Styles.navbar}>

        <p className={Styles.app_name}>
          PicaQuest
        </p>

    </div>

  )
  
};

export default Navbar;
