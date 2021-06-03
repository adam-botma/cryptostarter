
import React , { useState }from 'react';
import { Button , Typography, Modal, makeStyles} from '@material-ui/core';
import createCampaignForm from '../CreateCampaignForm/CreateCampaignForm';
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles({
  heading: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});


const PageHeader = ({ title }) => {

const classes = useStyles();

const [open, setOpen] = useState(false);


return (
  <div className={classes.heading}>
    <h3>{title}:</h3>
    <Button color="primary" variant="outlined" onClick={() => setOpen(true)}>
      <Typography color="primary"> Create Campaign </Typography>
      <AddIcon color="primary" />
    </Button>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <createCampaignForm />
    </Modal>
  </div>
);

}

export default PageHeader;
