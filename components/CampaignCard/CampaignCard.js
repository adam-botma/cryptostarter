import React, {useState, useEffect} from "react";
import { makeStyles  } from "@material-ui/core/styles";
import { CircularProgress } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Router } from '../../routes';
import Campaign from '../../ethereum/campaign';


const useStyles = makeStyles({
  root: {
    maxWidth: 625,
    marginBottom: '2rem'
  },
  media: {
    height: 190,
  },
  ca: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});



const CampaignCard = ({ campaignTitle, index }) => {
  const classes = useStyles();

  const [campaignInfo , setCampaignInfo] = useState(null);
  const showLoad = index === 0;

  useEffect(async ()=> {
    const campaign = Campaign(campaignTitle);
    const campaignData = await campaign.methods.getSummary().call();
    setCampaignInfo(campaignData);
  },[])

 return campaignInfo ? (
   <Card className={classes.root} m={1}>
     <CardActionArea>
       <CardMedia
         className={classes.media}
         image={campaignInfo[7]}
         title="Contemplative Reptile"
       />
       <CardContent>
         <Typography gutterBottom variant="body1" component="h2">
           {campaignInfo[5]}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
           {campaignInfo[6].length > 150
             ? `${campaignInfo[6].substring(0, 150)}...`
             : campaignInfo[6]}
         </Typography>
       </CardContent>
     </CardActionArea>
     <CardActions className={classes.ca}>
       <Button
         size="small"
         color="primary"
         onClick={() => Router.pushRoute(`/campaigns/${campaignTitle}`)}
       >
         View Campaign
       </Button>
       {/* <Button
          size="small"
          color="primary"
          onClick={() => console.log("yo thanks for clicking share bra")}
        >
          Share
        </Button> */}
     </CardActions>
   </Card>
 ) : (
   showLoad ? <CircularProgress /> : null
 );
};

export default CampaignCard;
