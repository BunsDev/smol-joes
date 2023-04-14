import { task, types } from "hardhat/config";

task("mint-smol-joe", "Mints a smol joe token")
  .addParam("tokenId", "The first token ID to be minted", 0, types.int)
  .addOptionalParam("amount", "Amount of tokens to mint", 1, types.int)
  .setAction(
    async ({ tokenId, amount }, { ethers, deployments, getNamedAccounts }) => {
      const { deployer } = await getNamedAccounts();

      const token = await ethers.getContractAt(
        "SmolJoes",
        (
          await deployments.get("SmolJoes")
        ).address
      );

      for (let i = tokenId; i < tokenId + amount; i++) {
        await (await token.mint(deployer, i)).wait();
        console.log(`Minted token with ID ${i}`);
      }
    }
  );
