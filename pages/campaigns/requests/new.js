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
import Layout from "../../../components/Layout/Layout";
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import { Router } from '../../../routes';

const useStyles = makeStyles((theme) => ({
 root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
   '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      width: '90%'
   },
   '& MuiButtonBase-root': {
     width: '90%'
   }
 }
}));

const NewRequest = ({ address }) => {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { register, handleSubmit } = useForm();

    const onSubmit = async ({ description, ammount, recipient }) => {
      setErrorMessage(null);
      setLoading(true);
      try {
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(address);

        await campaign.methods.createRequest(description, web3.utils.toWei(ammount, 'ether'), recipient).send({from: accounts[0]})

        setLoading(false);

      } catch (err) {
        setLoading(false);
        setErrorMessage(err.message);
      }
    };


  return (
    <Layout>
      <h3>Create a new Request</h3>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={register}
          name="description"
          label="Description"
          variant="outlined"
        />
        <TextField
          inputRef={register}
          name="ammount"
          label="Ammount"
          variant="outlined"

        />
        <TextField
          inputRef={register}
          name="recipient"
          label="Reciptient"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color={loading ? "disabled" : "primary"}
          fullwidth
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
    </Layout>
  );
};

NewRequest.getInitialProps = async (ctx) => {
  const address = ctx.query.address;

  return {
    address,
  };
};

export default NewRequest;
