import {
  LightSystemProgram,
  Rpc,
  confirmTx,
  createRpc,
} from "@lightprotocol/stateless.js";
import { createMint, mintTo, transfer } from "@lightprotocol/compressed-token";
import { Keypair, PublicKey } from "@solana/web3.js";

const payer = Keypair.generate();


/// Helius exposes Solana and compression RPC endpoints through a single URL
const RPC_ENDPOINT = "https://mainnet.helius-rpc.com/?api-key=c7e5b412-c980-4f46-8b06-2c85c0b4a08d";
const COMPRESSION_ENDPOINT = RPC_ENDPOINT;
const PROVER_ENDPOINT = RPC_ENDPOINT;
const connection: Rpc = createRpc(RPC_ENDPOINT, COMPRESSION_ENDPOINT, PROVER_ENDPOINT)

export const main = async (tokenRecipient:PublicKey) => {
  await confirmTx(
    connection,
    await connection.requestAirdrop(payer.publicKey, 10e9)
  );

  await confirmTx(
    connection,
    await connection.requestAirdrop(tokenRecipient, 1e6)
  );

  /// Create compressed token mint
  const { mint, transactionSignature } = await createMint(
    connection,
    payer,
    payer.publicKey,
    9 // Number of decimals
  );

  console.log(`create-mint  success! txId: ${transactionSignature}`);

  /// Mint compressed tokens to the payer's account
  const mintToTxId = await mintTo(
    connection,
    payer,
    mint,
    payer.publicKey, // Destination
    payer,
    1e9 // Amount
  );

  console.log(`Minted 1e9 tokens to ${payer.publicKey} was a success!`);
  console.log(`txId: ${mintToTxId}`);

  /// Transfer compressed tokens from payer to tokenRecipient's pubkey
  const transferTxId = await transfer(
    connection,
    payer,
    mint,
    7e8, // Amount
    payer, // Owner
    tokenRecipient // To address
  );

  console.log(`Transfer of 7e8 ${mint} to ${tokenRecipient} was a success!`);
  console.log(`txId: ${transferTxId}`);
};

