import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x337FB825478236eAA1C1C7089d0042a6f5Bff068"
);

export default instance;
