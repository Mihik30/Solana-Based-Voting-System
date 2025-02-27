#![allow(unexpected_cfgs)]

// use anchor_lang::prelude::*;

declare_id!("8eGrvBEjnLQG6y6gigFKcQj7pweQZXq6GSyDWd1cQASh");

// #[program]
// pub mod voting_system {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
//         msg!("Greetings from: {:?}", ctx.program_id);
//         Ok(())
//     }
// }

// #[derive(Accounts)]
// pub struct Initialize {}

use anchor_lang::prelude::*;

// Define the Solana program
#[program]                          //like int main() 
pub mod voting_system {             // defines a module / function()
    use super::*;                   // it means that * is the parent module 

    // Initialize the voting system
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {         
        let voting_account = &mut ctx.accounts.voting_account;
        voting_account.total_votes = 0;
        voting_account.candidates = Vec::new(); // Initialize candidates as an empty vector
        Ok(())
    }

    // Add a candidate to the voting system
    pub fn add_candidate(ctx: Context<AddCandidate>, name: String) -> Result<()> {
        let voting_account = &mut ctx.accounts.voting_account;
        voting_account.candidates.push(Candidate {
            name,
            votes: 0,
        });
        Ok(())
    }

    // Vote for a candidate
    pub fn vote(ctx: Context<Vote>, candidate_index: u8) -> Result<()> {
        let voting_account = &mut ctx.accounts.voting_account;

        // Check if the candidate index is valid
        if (candidate_index as usize) >= voting_account.candidates.len() {
            return Err(ErrorCode::InvalidCandidate.into());
        }

        // Increment the candidate's votes and total votes
        voting_account.candidates[candidate_index as usize].votes += 1;
        voting_account.total_votes += 1;

        Ok(())
    }
}

// Accounts for initializing the voting system
// #[derive(Accounts)]
// pub struct Initialize<'info> {
//     #[account(init, payer = user, space = 1024)]
//     pub voting_account: Account<'info, VotingAccount>,
//     #[account(mut)]
//     pub user: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 1024)]
    pub voting_account: Account<'info, VotingAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>, // Add this line
}

// Accounts for adding a candidate
#[derive(Accounts)]
pub struct AddCandidate<'info> {
    #[account(mut)]
    pub voting_account: Account<'info, VotingAccount>,
}

// Accounts for voting
#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub voting_account: Account<'info, VotingAccount>,
}

// Voting account structure
#[account]
pub struct VotingAccount {
    pub candidates: Vec<Candidate>, // List of candidates
    pub total_votes: u32,           // Total votes cast     unsigned coz only positive 
}

// Candidate structure
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Candidate {
    pub name: String, // Candidate name
    pub votes: u32,   // Number of votes received
}

// Custom error codes
#[error_code]
pub enum ErrorCode {
    #[msg("Invalid candidate index")]
    InvalidCandidate,
}