import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);

const program = anchor.workspace.VotingSystem;
const votingAccountPublicKey = new anchor.web3.PublicKey("DPnDX7hMQo4jj6jPKVUwnzF8A4KcxZNoJ8gq2x9sgQ1f");

async function main() {
    const candidateName = process.argv[2]; // Get candidate name from command line

    if (!candidateName) {
        console.error("Usage: anchor run add_candidate -- <candidate_name>");
        return;
    }

    console.log(`Adding candidate: ${candidateName}`);

    await program.rpc.addCandidate(candidateName, {
        accounts: {
            votingAccount: votingAccountPublicKey,
        },
    });

    console.log("Candidate added successfully!");
}

main().catch(console.error);
