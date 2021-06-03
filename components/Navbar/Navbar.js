import React from 'react';
import { Button , Typography } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";

import styles from './Navbar.module.css';

const Navbar = () => {

  return (
    <div className={styles.navbarContainer}>
      <Typography>CrowdCoin</Typography>
      <Button variant="outlined" color="primary" startIcon={<AddIcon />}>
        Create Campaign
      </Button>
    </div>
  );
}

export default Navbar;
