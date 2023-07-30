import fs from "fs";
import chalk from "chalk";
import { DeployFunction } from "hardhat-deploy/types";

const graphDir = "../subgraph";
const deploymentsDir = "./deployments";

function publishContract(contractName: string, networkName: string) {
  try {
    const _contract = fs.readFileSync(`${deploymentsDir}/${networkName}/${contractName}.json`).toString();
    const contract = JSON.parse(_contract) as { address: string; abi: any };
    const TARGET_DIR = `${graphDir}/config`;
    const graphConfigPath = `${TARGET_DIR}/${networkName}.json`;

    if (!fs.existsSync(TARGET_DIR)) {
      fs.mkdirSync(TARGET_DIR);
    }

    let _graphConfig: string = "{}";
    try {
      if (fs.existsSync(graphConfigPath)) {
        _graphConfig = fs.readFileSync(graphConfigPath).toString();
      }
    } catch (e) {
      console.log(e);
    }

    const update = {
      network: networkName,
      [contractName]: contract.address,
    };

    const graphConfig = { ...JSON.parse(_graphConfig), ...update };

    fs.writeFileSync(graphConfigPath, JSON.stringify(graphConfig, null, 2));
    if (!fs.existsSync(`${graphDir}/abis`)) fs.mkdirSync(`${graphDir}/abis`);
    fs.writeFileSync(`${graphDir}/abis/${networkName}_${contractName}.json`, JSON.stringify(contract.abi, null, 2));

    return true;
  } catch (e) {
    console.log("Failed to publish " + chalk.red(contractName) + " to the subgraph.");
    console.log(e);
    return false;
  }
}

const publishGraphAbis: DeployFunction = async function () {
  const directories = fs.readdirSync(deploymentsDir);
  directories.forEach(function (directory: string) {
    const files = fs.readdirSync(`${deploymentsDir}/${directory}`);
    files.forEach(function (file: string) {
      if (file.indexOf(".json") >= 0) {
        const contractName = file.replace(".json", "");
        publishContract(contractName, directory);
      }
    });
  });
  console.log("🏀  Published contracts to the subgraph package.");
};

export default publishGraphAbis;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags publishGraphAbis
publishGraphAbis.tags = ["publishGraphAbis"];

publishGraphAbis.runAtTheEnd = true;
