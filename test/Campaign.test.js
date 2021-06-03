//import dependancies
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

//create web3 instance to our local ganache blockchain
const web3 = new Web3(ganache.provider());

//bring in the two contracts
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach( async () => {
  //get list of accounts we're able to use with local ganache instance
  accounts = await web3.eth.getAccounts();

  //use the first account to deploy a campaign factory to the local blockchain
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({data: compiledFactory.bytecode})
  .send({ from: accounts[0], gas: '1000000' })

  //use our factory to create a campaign for testing
  await factory.methods.createCampaign('100').send({ from: accounts[0], gas: '1000000'} );

  [ campaignAddress ] =await factory.methods.getDeployedCampaigns().call();


  //campaign contract is already deployed so we are calling this function a little different by having the second arguement be the actual address of the contract
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);


});

describe('Campaigns', () => {

  it('depolys a factory and a campaign', ()=> {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('makes the address who created the campaign the campaign manager', async ()=> {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });


  it('allows people to contribute ETH and markes them as a campaign approver', async() => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();

    assert(isContributor);
  });

  it('requires a minimum contribution', async () => {
    try{
      await campaign.mehtods.contribute().send({
        value: '5',
        from: accounts[1]
      });
    } catch (err) {
      assert(err);
    }
  });

  it('allows a manager to make a payment request', async () => {

    await campaign.methods.createRequest('Buy shit', '100', accounts[1])
    .send({ from: accounts[0], gas: 1000000 });

    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy shit', request.description);

  });

  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);

    assert(balance > 104);
  });



});
