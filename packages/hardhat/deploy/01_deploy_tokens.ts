import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const chainId = await hre.getChainId();

  const waitConfirmations = chainId === "31337" ? 1 : 5;

  if (chainId === "31337") {
    await deploy("Token", {
      from: deployer,
      args: ["Wrapped ETH", "WETH", "0xBFF5D8E6658276C37dB62E414B90b5f50112fCa6"],
      log: true,
      autoMine: true,
      waitConfirmations,
    });
    await deploy("Token", {
      from: deployer,
      args: ["Tether USDT", "USDT", "0xBFF5D8E6658276C37dB62E414B90b5f50112fCa6"],
      log: true,
      autoMine: true,
      waitConfirmations,
    });
    await deploy("Token", {
      from: deployer,
      args: ["USD Coin", "USDC", "0xBFF5D8E6658276C37dB62E414B90b5f50112fCa6"],
      log: true,
      autoMine: true,
      waitConfirmations,
    });
    await deploy("Token", {
      from: deployer,
      args: ["Dai", "DAI", "0xBFF5D8E6658276C37dB62E414B90b5f50112fCa6"],
      log: true,
      autoMine: true,
      waitConfirmations,
    });
    await deploy("Token", {
      from: deployer,
      args: ["Chainlink", "LINK", "0xBFF5D8E6658276C37dB62E414B90b5f50112fCa6"],
      log: true,
      autoMine: true,
      waitConfirmations,
    });
    await deploy("Token", {
      from: deployer,
      args: ["Shiba Inu", "SHIB", "0xBFF5D8E6658276C37dB62E414B90b5f50112fCa6"],
      log: true,
      autoMine: true,
      waitConfirmations,
    });
  }
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["Tokens"];
