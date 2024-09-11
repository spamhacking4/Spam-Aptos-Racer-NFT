/* eslint-disable no-console */
/* eslint-disable max-len */

/**
 * This example shows how to use the Aptos client to mint and transfer a Digital Asset.
 */

// import "dotenv";
import { Account, Aptos, AptosConfig, Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk";

const INITIAL_BALANCE = 100_000_000;

// Setup the client
const APTOS_NETWORK: Network = NetworkToNetworkName[process.env.APTOS_NETWORK] || Network.DEVNET;
const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);

const example = async () => {
  console.log(
    "This example will create and fund Player1 and Player2, then Player1 account will create a collection and a digital asset in that collection and tranfer it to Player2.",
  );

  // Create Player1 and Player2 accounts
  const Player1 = Account.generate();
  const Player2 = Account.generate();

  console.log("=== Addresses ===\n");
  console.log(`Player1's address is: ${Player1.accountAddress}`);

  // Fund and create the accounts
  await aptos.fundAccount({
    accountAddress: Player1.accountAddress,
    amount: INITIAL_BALANCE,
  });
  await aptos.fundAccount({
    accountAddress: Player2.accountAddress,
    amount: INITIAL_BALANCE,
  });

  const collectionName = "Example Collection";
  const collectionDescription = "Example description.";
  const collectionURI = "aptos.dev";

  // Create the collection
  const createCollectionTransaction = await aptos.createCollectionTransaction({
    creator: Player1,
    description: collectionDescription,
    name: collectionName,
    uri: collectionURI,
  });

  console.log("\n=== Create the collection ===\n");
  let committedTxn = await aptos.signAndSubmitTransaction({ signer: Player1, transaction: createCollectionTransaction });

  let pendingTxn = await aptos.waitForTransaction({ transactionHash: committedTxn.hash });

  const Player1sCollection = await aptos.getCollectionData({
    creatorAddress: Player1.accountAddress,
    collectionName,
    minimumLedgerVersion: BigInt(pendingTxn.version),
  });
  console.log(`Player1's collection: ${JSON.stringify(Player1sCollection, null, 4)}`);

  const tokenName = "Example Asset";
  const tokenDescription = "Example asset description.";
  const tokenURI = "aptos.dev/asset";

  console.log("\n=== Player1 Mints the digital asset ===\n");

  const mintTokenTransaction = await aptos.mintDigitalAssetTransaction({
    creator: Player1,
    collection: collectionName,
    description: tokenDescription,
    name: tokenName,
    uri: tokenURI,
  });

  committedTxn = await aptos.signAndSubmitTransaction({ signer: Player1, transaction: mintTokenTransaction });
  pendingTxn = await aptos.waitForTransaction({ transactionHash: committedTxn.hash });

  const Player1sDigitalAsset = await aptos.getOwnedDigitalAssets({
    ownerAddress: Player1.accountAddress,
    minimumLedgerVersion: BigInt(pendingTxn.version),
  });
  console.log(`Player1's digital assets balance: ${Player1sDigitalAsset.length}`);

  console.log(`Player1's digital asset: ${JSON.stringify(Player1sDigitalAsset[0], null, 4)}`);

  console.log("\n=== Transfer the digital asset to Player2 ===\n");

  const transferTransaction = await aptos.transferDigitalAssetTransaction({
    sender: Player1,
    digitalAssetAddress: Player1sDigitalAsset[0].token_data_id,
    recipient: Player2.accountAddress,
  });
  committedTxn = await aptos.signAndSubmitTransaction({ signer: Player1, transaction: transferTransaction });
  pendingTxn = await aptos.waitForTransaction({ transactionHash: committedTxn.hash });

  const Player1sDigitalAssetsAfter = await aptos.getOwnedDigitalAssets({
    ownerAddress: Player1.accountAddress,
    minimumLedgerVersion: BigInt(pendingTxn.version),
  });
  console.log(`Player1s's digital assets balance: ${Player1sDigitalAssetsAfter.length}`);

  const Player2DigitalAssetsAfter = await aptos.getOwnedDigitalAssets({
    ownerAddress: Player2.accountAddress,
    minimumLedgerVersion: BigInt(pendingTxn.version),
  });
  console.log(`Player2's digital assets balance: ${Player2DigitalAssetsAfter.length}`);
};

example();
