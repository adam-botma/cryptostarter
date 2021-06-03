import React, { useState } from "react";
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
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { AccountBoxSharp } from "@material-ui/icons";
import { Router } from "../routes";

const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   marginBottom: ".75rem",
  // },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    display: "absolute",
    zIndex: 1,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    height: "50%",
    width: "100%",
    "& > *": {
      margin: '.5rem 0',
    },
  },
}));

const ContributeForm = ({ address }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit =  async data => {

    const campaign = new Campaign(address);

    setLoading(true);

    try {
     const accounts = await web3.eth.getAccounts();
     await campaign.methods.contribute().send({
       from: accounts[0],
       value: web3.utils.toWei(data['contribution-ammount'])
     })

     Router.replaceRoute(`/campaigns/${address}`)
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <FormControl  variant="outlined">
        <InputLabel htmlFor="contribution-ammount">
          Ammount
        </InputLabel>
        <OutlinedInput
          inputRef={register}
          name="contribution-ammount"
          id="contribution-ammount"
          fullWidth
          type="text"
          endAdornment={<InputAdornment position="end">eth</InputAdornment>}
        />
      </FormControl>

      <Button
      fullWidth
        type="submit"
        variant="contained"
        color={loading ? "disabled" : "primary"}
      >
        Submit
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
  );
};

export default ContributeForm;
