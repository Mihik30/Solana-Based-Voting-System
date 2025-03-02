import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);

const program = anchor.workspace.VotingSystem;
const votingAccountPublicKey = new anchor.web3.PublicKey("Ee1iyqQMLFaUCpgkzy8C5rfffwvDvtGn8FY5D2cLr16c");

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
