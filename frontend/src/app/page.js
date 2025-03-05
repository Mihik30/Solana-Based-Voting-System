"use client";
import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import idl from "/root/blockchain/voting-system/src/idl/voting_system.json";

const programId = new PublicKey("8eGrvBEjnLQG6y6gigFKcQj7pweQZXq6GSyDWd1cQASh");
const votingAccountKey = new PublicKey("Ee1iyqQMLFaUCpgkzy8C5rfffwvDvtGn8FY5D2cLr16c");

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    fetchCandidates();
  }, []);

  async function fetchCandidates() {
    const connection = new Connection("http://127.0.0.1:8899", "confirmed");
    const provider = new AnchorProvider(connection, window.solana, {});
    const program = new Program(idl, programId, provider);


    try {
      const account = await program.account.votingAccount.fetch(votingAccountKey);
      setCandidates(account.candidates);
      setTotalVotes(account.totalVotes);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }

  async function vote(index) {
    const connection = new Connection("http://127.0.0.1:8899", "confirmed");
    const provider = new AnchorProvider(connection, window.solana, {});
    const program = new Program(idl, programId, provider);


    try {
      await program.rpc.vote(index, {
        accounts: { votingAccount: votingAccountKey },
      });
      alert("Vote cast successfully!");
      fetchCandidates(); // Refresh
    } catch (error) {
      console.error("Error voting:", error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Solana Voting System</h1>
      <p className="text-center text-lg mb-4">Total Votes: {totalVotes}</p>
      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <div key={index} className="flex justify-between p-4 bg-gray-800 rounded-lg">
            <span className="text-lg">{candidate.name} - {candidate.votes} votes</span>
            <button 
              onClick={() => vote(index)} 
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
