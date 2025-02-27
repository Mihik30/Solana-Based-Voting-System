"use client";
import { useState, useEffect } from "react";
import { AnchorProvider, Program, web3, BN } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
// import idl from "/root/blockchain/voting-system/target/idl/voting_system.json"; 
import idl from "@/idl/voting_system.json";




import toast from "react-hot-toast";

const PROGRAM_ID = new PublicKey("8eGrvBEjnLQG6y6gigFKcQj7pweQZXq6GSyDWd1cQASh");
const network = "http://127.0.0.1:8899";
const connection = new Connection(network, "processed");

const getProvider = () => {
  if (!window.solana || !window.solana.isConnected) {
    throw new Error("Wallet not connected! Please connect your wallet.");
  }

  return new AnchorProvider(connection, window.solana, { preflightCommitment: "processed" });
};


export default function VotingSystem() {
  const [wallet, setWallet] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [candidateName, setCandidateName] = useState("");

  useEffect(() => {
    if (window.solana) {
      window.solana.connect().then(({ publicKey }) => setWallet(publicKey));
    }
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const provider = getProvider();
    if (!provider) {
      console.warn("Provider is not available. Waiting for wallet connection...");
      return;
    }
  
    try {
      const program = new anchor.Program(idl, programId, provider);
      const candidates = await program.account.candidate.all();
      console.log("Candidates:", candidates);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };
  

  const addCandidate = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, PROGRAM_ID, provider, provider.programs);
      await program.methods.addCandidate(candidateName).rpc();
      toast.success("Candidate added!");
      fetchCandidates();
    } catch (error) {
      console.error(error);
      toast.error("Error adding candidate");
    }
  };

  const vote = async (index) => {
    try {
      const provider = getProvider();
      const program = new Program(idl, PROGRAM_ID, provider, provider.programs);
      await program.methods.vote(new BN(index)).rpc();
      toast.success("Vote cast successfully!");
      fetchCandidates();
    } catch (error) {
      console.error(error);
      toast.error("Error voting");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Solana Voting System</h1>
      <p>Connected Wallet: {wallet ? wallet.toBase58() : "Not connected"}</p>

      <div className="mt-5">
        <input
          type="text"
          placeholder="Candidate Name"
          className="border p-2"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 ml-2" onClick={addCandidate}>
          Add Candidate
        </button>
      </div>

      <div className="mt-5">
        <h2 className="text-xl">Candidates</h2>
        {candidates.map((c, i) => (
          <div key={i} className="flex justify-between p-2 border mt-2">
            <span>{c.name} - {c.votes} votes</span>
            <button className="bg-green-500 text-white p-2" onClick={() => vote(i)}>
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
