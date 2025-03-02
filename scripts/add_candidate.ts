import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);

const program = anchor.workspace.VotingSystem;
const votingAccountPublicKey = new anchor.web3.PublicKey("Ee1iyqQMLFaUCpgkzy8C5rfffwvDvtGn8FY5D2cLr16c");

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
