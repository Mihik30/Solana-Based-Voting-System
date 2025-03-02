import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);

const program = anchor.workspace.VotingSystem;
const votingAccountPublicKey = new anchor.web3.PublicKey("Ee1iyqQMLFaUCpgkzy8C5rfffwvDvtGn8FY5D2cLr16c");

async function main() {
    const votingData = await program.account.votingAccount.fetch(votingAccountPublicKey);
    
    console.log("Total Votes:", votingData.totalVotes);
    console.log("Candidates:");
    votingData.candidates.forEach((candidate, index) => {
        console.log(`${index}. ${candidate.name} - ${candidate.votes} votes`);
    });
}

main().catch(console.error);
