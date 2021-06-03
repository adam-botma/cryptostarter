import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";
import { Card, Container, Link, Button, Typography } from "@material-ui/core";
import { IconContext } from "react-icons";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";
// import styles from "../styles.module.css";
import { Router } from "../routes";

import CampaignCard from "../components/CampaignCard/CampaignCard";

import Layout from "../components/Layout/Layout";
import Campaign from "../ethereum/campaign";

const useStyles = makeStyles((theme) => ({
  homepageContentContainer: {
    marginTop: "1.5rem",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  campaignList: {
    margin: "0rem .5rem 0 .5rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    overflowY: "scroll",
    height: "100%",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    alignItems: "center",
  },

  // textContainer: {
  //   maxWidth: 625
  // },

  CurrentCampaignsText: {
    marginBottom: ".5rem",
  },
}));

const Homepage = ({ campaigns, campaignData }) => {
  const classes = useStyles();
  return (
    <Layout buttonType="large">
      <Container>
        <div className={classes.homepageContentContainer}>
          <Typography className={classes.CurrentCampaignsText} variant="h6">
            Current Campaigns
          </Typography>

          <div className={classes.campaignList}>
            {campaigns.map((address, index) => (
              <CampaignCard key={index} index={index} campaignTitle={address} mt={2} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

Homepage.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns };
};

export default Homepage;
