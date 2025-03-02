import * as anchor from "@coral-xyz/anchor";
import { SystemProgram } from "@solana/web3.js";

const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);

const program = anchor.workspace.VotingSystem;
const votingAccount = anchor.web3.Keypair.generate();

async function main() {
    console.log("Initializing Voting System...");

    await program.rpc.initialize({
        accounts: {
            votingAccount: votingAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        },
        signers: [votingAccount],
    });

    console.log("Voting system initialized with account:", votingAccount.publicKey.toBase58());
}

main().catch(console.error);
