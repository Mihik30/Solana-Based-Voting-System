import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);

const program = anchor.workspace.VotingSystem;
const votingAccountPublicKey = new anchor.web3.PublicKey("DPnDX7hMQo4jj6jPKVUwnzF8A4KcxZNoJ8gq2x9sgQ1f");

async function main() {
    const votingData = await program.account.votingAccount.fetch(votingAccountPublicKey);
    
    console.log("Total Votes:", votingData.totalVotes);
    console.log("Candidates:");
    votingData.candidates.forEach((candidate, index) => {
        console.log(`${index}. ${candidate.name} - ${candidate.votes} votes`);
    });
}

main().catch(console.error);
