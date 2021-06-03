import React , { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Modal,
  makeStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import { Link, Router } from "../../routes";
import createCampaignForm from "../CreateCampaignForm/CreateCampaignForm";
import styles from "./Header.module.css";
import Layout from "../Layout/Layout";


const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#1f1f1f",
    color: "#D8D8D8",
  },
  toolbar: {
    justifyContent: "space-between",
  },
});

const Header = ({ buttonType }) => {

 const [open, setOpen] = useState(false);

 const classes = useStyles();

  const whichButton = (buttonType) => {
    switch (buttonType) {
      case "large":
        return (
          <Button
            onClick={() => Router.pushRoute("/campaigns/new")}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Create Campaign
          </Button>
        );

      case "small":
        return (
          <Button onClick={() => Router.pushRoute("/campaigns/new")}>
            <AddCircleOutlineIcon color="primary" />
          </Button>
        );

      default:
        return (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => Router.pushRoute("/campaigns/new")}
          >
            <Typography color="primary"> Create Campaign </Typography>
            <AddIcon color="primary" />
          </Button>
        );
    }
  };

  return (
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <Button
              onClick={() => Router.pushRoute("/")}
              style={{ backgroundColor: "transparent" }}
              color="inherit"
            >
              <Typography>Crypto</Typography>
              <Typography color="primary">Starter</Typography>
            </Button>
          </div>
          <div>
            {whichButton(buttonType)}
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <createCampaignForm />
            </Modal>
          </div>
        </Toolbar>
      </AppBar>
  );
};
export default Header;
