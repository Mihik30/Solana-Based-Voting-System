import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);

const program = anchor.workspace.VotingSystem;
const votingAccountPublicKey = new anchor.web3.PublicKey("DPnDX7hMQo4jj6jPKVUwnzF8A4KcxZNoJ8gq2x9sgQ1f");

async function main() {
    const candidateIndex = parseInt(process.argv[2]);

    if (isNaN(candidateIndex)) {
        console.error("Usage: anchor run vote -- <candidate_index>");
        return;
    }

    console.log(`Voting for candidate index: ${candidateIndex}`);

    await program.rpc.vote(candidateIndex, {
        accounts: {
            votingAccount: votingAccountPublicKey,
        },
    });

    console.log("Vote cast successfully!");
}

main().catch(console.error);
