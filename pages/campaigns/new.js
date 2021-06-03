import React , { useState }from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  makeStyles,
  CircularProgress
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { spacing } from "@material-ui/system";

import Layout from "../../components/Layout/Layout";
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Link, Router } from '../../routes';
import createCampaignForm from '../../components/CreateCampaignForm/CreateCampaignForm';
import styles from "./new.module.css";


const useStyles = makeStyles((theme) => ({

  paper: {
    position: "absolute",
    width: 600,
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    height: "80%",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(.5),
    },
  },
}));






const CampaignNew = () => {


  const classes = useStyles();
  const [loading , setLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setErrorMessage(null);
    setLoading(true);
    try{

      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(data["minimum-contribution"]).send({
        from: accounts[0],
      });
      setLoading(false)
      Router.pushRoute('/');
    } catch (err){
      setLoading(false);
      setErrorMessage(err.message);
    }

  }

  return (
    <Layout>
      <Container className={classes.paper}>
        <Typography variant="h6">Create a New Campaign</Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            inputRef={register}
            id="campaign-name"
            name="campaign-name"
            label="Campaign Name"
            variant="outlined"
            fullWidth
            autoComplete="none"
          />
          <TextField
            inputRef={register}
            id="minimum-contribution"
            name="minimum-contribution"
            label="Minimum Contribution"
            variant="outlined"
            fullWidth
            autoComplete="none"
          />
          <TextField
            inputRef={register}
            id="goal"
            name="goal"
            label="Goal"
            variant="outlined"
            fullWidth
            autoComplete="none"
          />
          <TextField
            inputRef={register}
            id="img"
            name="img"
            variant="outlined"
            label="Image Url"
            fullWidth
            multiline
            autocomplete="none"
          />
          <TextField
            inputRef={register}
            id="description"
            name="description"
            variant="outlined"
            label="Description"
            fullWidth
            multiline
            rows={5}
            autocomplete="none"
          />
          <Button
            fullWidth
            m=".75rem"
            type="submit"
            variant="contained"
            color={loading ? "disabled" : "primary"}
          >
            Create Campaign
          </Button>

          {loading && (
            <div className={classes.buttonContainer}>
              <CircularProgress size={24} />
            </div>
          )}
          {errorMessage && (
            <Alert
              onClose={() => {
                setErrorMessage(null);
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          )}
        </form>
      </Container>
    </Layout>
  );
};

export default CampaignNew;
