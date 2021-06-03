const path = require('path');
const solc = require('solc');
//fs-extra is typical fs with some extra functions
const fs = require('fs-extra');


//looks inside build folder , remove its contents
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);


//read 'Campaign.sol' from the 'contracts' folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

//compile everything we just pulled out of Campaign.sol - note output will contain two contracts for this build (Campaign and CampaignFactory)
const output = solc.compile(source, 1).contracts;


//recreate our 'build' folder
fs.ensureDirSync(buildPath);



//taking the outputed contracts and creating new files within our new build folder
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract.replace(':', '')}.json`),
    output[contract]
  );
}
