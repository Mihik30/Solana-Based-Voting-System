
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";


import { VotingSystem } from "../target/types/voting_system";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { expect } from "chai";

describe("voting-system", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.VotingSystem as Program<VotingSystem>;

  let votingAccount: anchor.web3.Keypair;

  before(async () => {
    // Generate a new keypair for the voting account
    votingAccount = anchor.web3.Keypair.generate();
  });

  it("Initializes the voting system", async () => {
    await program.methods.initialize()
      .accounts({
        votingAccount: votingAccount.publicKey, // Use votingAccount.publicKey directly
        user: provider.wallet.publicKey, // User's public key
        // systemProgram: SystemProgram.programId, // Add systemProgram
      })
      .signers([votingAccount]) // Add the keypair as a signer
      .rpc();

    // Fetch the voting account
    const account = await program.account.votingAccount.fetch(votingAccount.publicKey);

    // Verify initialization
    expect(account.totalVotes).to.equal(0); // No .toNumber() needed
    expect(account.candidates.length).to.equal(0);
  });

  it("Adds a candidate", async () => {
    await program.methods.addCandidate("Alice")
      .accounts({
        votingAccount: votingAccount.publicKey, // Use votingAccount.publicKey directly
      })
      .rpc();

    // Fetch the voting account
    const account = await program.account.votingAccount.fetch(votingAccount.publicKey);

    // Verify the candidate was added
    expect(account.candidates.length).to.equal(1);
    expect(account.candidates[0].name).to.equal("Alice");
    expect(account.candidates[0].votes).to.equal(0); // No .toNumber() needed
  });

  it("Votes for a candidate", async () => {
    await program.methods.vote(0) // Vote for the first candidate (Alice)
      .accounts({
        votingAccount: votingAccount.publicKey, // Use votingAccount.publicKey directly
      })
      .rpc();

    // Fetch the voting account
    const account = await program.account.votingAccount.fetch(votingAccount.publicKey);

    // Verify the vote was counted
    expect(account.candidates[0].votes).to.equal(1); // No .toNumber() needed
    expect(account.totalVotes).to.equal(1); // No .toNumber() needed
  });

  it("Fails to vote for an invalid candidate", async () => {
    try {
      await program.methods.vote(1) // Invalid candidate index
        .accounts({
          votingAccount: votingAccount.publicKey, // Use votingAccount.publicKey directly
        })
        .rpc();
    } catch (err) {
      expect(err).to.be.an("error");
      expect(err.message).to.include("Invalid candidate index");
    }
  });
});