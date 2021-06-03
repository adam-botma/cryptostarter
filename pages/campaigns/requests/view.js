import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Router } from '../../../routes';
import Layout from '../../../components/Layout/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import PageHeader from '../../../components/PageHeader/PageHeader'

const useStyles = makeStyles({
  paper: {
    width: '90%'
  },
  table: {
    width: '100%'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: '1.5rem',
  }
});

const ViewRequests = ({ address, requests, requestCount, approversCount, manager }) => {

const classes = useStyles();
const [ managerTracker, setManagerTracker ] = useState(false);

const isManager = () => {
  web3.eth.getAccounts().then(accounts => setManagerTracker(manager === accounts[0]))

}

const onApprove = async (index) => {
  const accounts = await web3.eth.getAccounts();
  const campaign = Campaign(address);
  await campaign.methods.approveRequest(index).send({ from: accounts[0] });
}

const onFinalize = async (index) => {
  const accounts = await web3.eth.getAccounts();
  const campaign = Campaign(address);
  await campaign.methods.finalizeRequest(index).send({ from: accounts[0] });
}

useEffect(()=>{
  isManager();
} ,[])

  return (
    <Layout>
      <div className={classes.mainContainer}>
        <div className={classes.heading}>
          <h3>Requests: </h3>
        </div>

        <TableContainer className={classes.paper} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Ammount</TableCell>
                <TableCell align="right">Recipient</TableCell>
                <TableCell align="right">ApprovalCount</TableCell>
                <TableCell align="right">Approve</TableCell>
               {managerTracker ? <TableCell align="right">Finalize</TableCell> : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{request.description}</TableCell>
                  <TableCell align="right">
                    {web3.utils.fromWei(request.value, "ether")} ETH
                  </TableCell>
                  <TableCell align="right">{request.recipient}</TableCell>
                  <TableCell align="right">
                    {request.approvalCount}/{approversCount}
                  </TableCell>
                  <TableCell align="right">
                    <Button color='secondary' variant='outlined' onClick={() => onApprove(index)}>Approve</Button>
                  </TableCell>
                  {managerTracker ?  <TableCell align="right">
                    <Button color='primary' variant='outlined' onClick={() => onFinalize(index)}>Finalize</Button>
                  </TableCell>
                  : null }

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {managerTracker ?  <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              Router.pushRoute(`/campaigns/${address}/requests/new`)
            }
          >
            Create a Request
          </Button>
        </div>
        : null }

      </div>
    </Layout>
  );


}

ViewRequests.getInitialProps = async (ctx) => {
  const address = ctx.query.address;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const manager = await campaign.methods.manager().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount)).fill().map((element, index)=> {
      return campaign.methods.requests(index).call()
    })
  )
  return {
    address,
    requests,
    requestCount,
    approversCount,
    manager
  };
};

export default ViewRequests;
