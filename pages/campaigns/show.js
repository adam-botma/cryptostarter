import React from 'react';
import Campaign  from "../../ethereum/campaign";
import { Container , Typography, Button, makeStyles } from '@material-ui/core';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import Layout from '../../components/Layout/Layout';
import ContributeForm from '../../components/Contribute';


const useStyles = makeStyles((theme) => ({
  showContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    height: "100%",
    alignItems: "center",
  },

  titleSection: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  address: {
    marginTop: ".45rem",
    color: "#a6a6a6",
  },
  mainContentConatiner: {
    display: "flex",
    width: "100%",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  textContainer: {
    width: "35%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginLeft: "1.25rem",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      width: "100%",
    },
  },
  campaignImage: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  imageContainer: {
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  bottom: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
        },
  },

  supportsContainer: {
    [theme.breakpoints.down("sm")]: {
      margin: '1.5rem 0',
      textAlign: 'center'
        },
}

}));

const CampaignShow = ( {minimumContribution , balance , requestsCount , approversCount , manager , address, name, description, imageUrl, goal} ) => {

const classes = useStyles();

const goalMet = () => balance > goal
const goalIsMet = goalMet();




return (
  <Layout buttonType="small">
    <Container className={classes.showContainer}>
      <Container className={classes.titleSection}>
        <Typography variant="h4">{name}</Typography>
        <Typography className={classes.address} variant="body2">
          {address}
        </Typography>
      </Container>
      <div className={classes.mainContentConatiner}>
        <div className={classes.imageContainer}>
          <img className={classes.campaignImage} src={imageUrl}></img>
        </div>
        <div className={classes.textContainer}>
          <div>
            <Typography variant="h4" color="primary">
              {web3.utils.fromWei(balance, "ether")} ETH
            </Typography>
            <Typography variant="body1">pledged of {goal} ETH goal</Typography>
          </div>
          <div className={classes.supportsContainer}>
            <Typography variant="h4">{approversCount}</Typography>
            <Typography variant="body1">supporters</Typography>
          </div>

          {goalIsMet ? (
            <div className={classes.bottom}>
              <Typography variant='h6' >Goal Obtained!</Typography>
              <Button
                onClick={() =>
                  Router.pushRoute(`/campaigns/${address}/requests/`)
                }
                variant="contained"
                color="primary"
              >
                View Spending Requests
              </Button>
            </div>
          ) : (
            <div className={classes.bottom}>
              <Typography>Support this Project:</Typography>
              <ContributeForm address={address} />
            </div>
          )}
        </div>
      </div>
      <Container className={classes.titleSection}>
        <Typography className={classes.address}>{description}</Typography>
      </Container>
    </Container>
  </Layout>
);
}

CampaignShow.getInitialProps = async (ctx) => {
  const address = ctx.query.address
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call()

  return {
    minimumContribution : summary[0],
    balance : summary[1],
    requestsCount : summary[2],
    approversCount: summary[3],
    manager: summary[4],
    address,
    name: summary[5],
    description: summary[6],
    imageUrl: summary[7],
    goal: summary[8],
  };
}

export default CampaignShow;
