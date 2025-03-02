# Solana Based Voting System

This project is a simple blockchain-based voting system built on the **Solana** blockchain using **Anchor Framework**. Users can initialize a voting system, add candidates, and vote for them.

---

## **Prerequisites**

### **1. Install Solana CLI**
```sh
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

Ensure Solana is installed:
```sh
solana --version
```

### **2. Install Node.js (v18 or later)**
Use [nvm](https://github.com/nvm-sh/nvm) to install:
```sh
nvm install 18
nvm use 18
nvm alias default 18
```
Check version:
```sh
node -v
```

### **3. Install Rust & Anchor**
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```
Verify installation:
```sh
rustc --version
anchor --version
```

### **4. Install Dependencies**
Navigate to your project directory and run:
```sh
npm install
```

---

## **Set Up Local Solana Environment**

### **1. Start Solana Test Validator**
```sh
solana-test-validator
```

### **2. Create and Fund a Wallet**
```sh
solana-keygen new --outfile ~/.config/solana/id.json
solana config set --keypair ~/.config/solana/id.json
solana airdrop 10
```

Check balance:
```sh
solana balance
```

---

## **Deploy the Program**
### **1. Build the Program**
```sh
anchor build
```

### **2. Deploy to Local Validator**
```sh
anchor deploy
```

Copy the **Program ID** from the output and update it in `lib.rs`:
```rust
declare_id!("YOUR_PROGRAM_ID");
```

---

## **Run the Voting Program**

### **1. Initialize the Voting System**
```sh
anchor run initialize
```
This prints:
```
Voting system initialized with account: <VOTING_ACCOUNT_PUBLIC_KEY>
```
Copy the `VOTING_ACCOUNT_PUBLIC_KEY` for future commands.

### **2. Add Candidates**
```sh
anchor run add_candidate -- "Alice"
anchor run add_candidate -- "Bob"
```

### **3. Vote for a Candidate**
```sh
anchor run vote -- 0   # Votes for Alice
anchor run vote -- 1   # Votes for Bob
```

### **4. Check Results**
```sh
anchor run show_votes
```
Example output:
```
Total Votes: 2
Candidates:
0. Alice - 1 vote
1. Bob - 1 vote
```

---

## **Troubleshooting**
- **StructuredClone Error:** Upgrade Node.js to v18+ using `nvm install 18`
- **Solana Not Running:** Ensure `solana-test-validator` is active
- **Deployment Fails:** Check if `anchor build` completes successfully

---


Happy coding! 🚀

