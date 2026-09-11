export type BeginnerLesson = {
  intro: string;
  points: string[];
  exercise: string;
  source: string;
  code?: string;
};

export const BLOCKCHAIN_LESSONS: Record<string, BeginnerLesson[] | undefined> = {
  "solana": [
    {
      "intro": "A blockchain is a shared record that many computers agree on. Solana lets people transfer assets and run applications without one company controlling every update. SOL is the network’s native token, used to pay for transactions.",
      "points": [
        "A transaction is a signed request to change something, such as sending tokens.",
        "Validators are computers that check transactions and help agree on the record.",
        "A block explorer is a website where you can inspect public network activity."
      ],
      "exercise": "Open Solana Explorer on Devnet. Find a transaction and identify its sender, status and fee. You do not need a wallet just to read it.",
      "source": "https://solana.com/docs/core"
    },
    {
      "intro": "You can start learning in your browser with Solana Playground. A local setup gives you more control later, but it is not required for your first lesson.",
      "points": [
        "Use the official quick start to open Playground and create a fresh development wallet.",
        "Choose Devnet, a public practice network. Its test SOL is for development, not spending.",
        "For local work, the main tools are Rust, the Solana CLI, Node.js and Anchor, a framework that simplifies program development. Follow the official installation guide for compatible versions."
      ],
      "exercise": "Open a new Anchor project in Playground and locate the program source file. Build the unchanged template first so you know your environment works.",
      "source": "https://solana.com/docs/intro/quick-start"
    },
    {
      "intro": "Solana separates a program’s instructions from the data it changes. Think of a program as the rules of a game, and data accounts as the saved scores.",
      "points": [
        "Accounts hold data and SOL balances; each has an address and an owner program.",
        "An instruction names a program, supplies accounts and describes the requested action.",
        "A transaction groups instructions. Programs can process independent accounts in parallel, while conflicting writes must be coordinated."
      ],
      "exercise": "Sketch a scorekeeping app: one program, two player data accounts, and an instruction to update a score. Which account must change for each player?",
      "source": "https://solana.com/docs/core/accounts"
    },
    {
      "intro": "A wallet helps you manage keys and approve actions. Assets are recorded on the network; the wallet provides the keys used to authorize transactions.",
      "points": [
        "Your public address can be shared to receive test SOL. Your private key and recovery phrase must stay private.",
        "Use a separate development wallet rather than your everyday wallet.",
        "Check the network before requesting funds. An airdrop on Devnet does not fund Mainnet."
      ],
      "exercise": "In Playground, request Devnet SOL using the official faucet linked in the quick start. Check the balance and locate your public address in the Devnet explorer.",
      "source": "https://solana.com/docs/intro/quick-start"
    },
    {
      "intro": "A Solana program is code that runs when an instruction calls it. A journal program might create an entry, edit it or delete it, while separate data accounts store the entries.",
      "points": [
        "The program ID is the address of the deployed code.",
        "A signer proves that a key approved an action. A program must still check whether that signer is allowed to perform it.",
        "Anchor can describe account requirements and generate an interface description, called an IDL, for clients."
      ],
      "exercise": "Write down three actions for a journal app and who should be allowed to use each. For editing, require the entry’s author—not just any connected wallet.",
      "source": "https://solana.com/docs/core/programs"
    },
    {
      "intro": "Start with the Anchor template in Playground. Its initialize instruction is a useful first program: it accepts a request and completes without building a complicated app.",
      "points": [
        "Find the initialize function inside the program module. Keep the generated program ID and account definitions.",
        "Add the log line shown below inside that function, before its Ok(()) return. Build the program.",
        "The log records a message when the instruction runs; it does not save a journal entry. Persistent data needs a data account."
      ],
      "exercise": "Build your modified template. In the next lesson, deploy it to Devnet and call initialize to look for your message in the transaction logs.",
      "source": "https://solana.com/docs/intro/quick-start",
      "code": "// Inside the generated initialize function, before Ok(()):\nmsg!(\"Hello from my first Solana program!\");"
    },
    {
      "intro": "Building turns source code into a program the network can execute. Deploying uploads that program. Keep your first deployment on Devnet.",
      "points": [
        "In Playground, confirm Devnet is selected and your development wallet has test SOL.",
        "Build successfully, then use Deploy. Funding covers deployment and account storage; faucet limits may require trying again later.",
        "Save the resulting program ID. If an upgrade authority remains, that authority can update the program later."
      ],
      "exercise": "Deploy the template from the previous lesson. Open the program ID in the Devnet explorer and confirm that you are viewing the same network.",
      "source": "https://solana.com/docs/core/programs"
    },
    {
      "intro": "Using a deployed program means building an instruction and sending it in a signed transaction. Reading existing account data is a separate operation and usually needs no wallet approval.",
      "points": [
        "The client needs the program ID, the expected accounts and the instruction arguments.",
        "For an Anchor program, an IDL describes how the client should format those instructions.",
        "A transaction signature is a tracking ID. Check its confirmation and logs rather than assuming that submission means success."
      ],
      "exercise": "Use Playground’s Test panel to run initialize on your deployed template. Open the returned signature and find your Hello message in the logs.",
      "source": "https://solana.com/docs/intro/quick-start"
    },
    {
      "intro": "A command-line interface (CLI) lets you work from a terminal. An SDK is a library that helps application code talk to the network. Both use an RPC endpoint: a server that accepts network queries.",
      "points": [
        "The Solana CLI can show your selected network, address and balance.",
        "The commands below inspect configuration and then select Devnet. Run them only after installing the CLI and configuring a development wallet.",
        "For app code, follow the current official SDK documentation. Keep examples and installed package versions aligned."
      ],
      "exercise": "Run the commands and check that the configured URL says Devnet. Explain why a balance query against another network might give a different result.",
      "source": "https://solana.com/docs/intro/installation",
      "code": "solana config get\nsolana config set --url devnet\nsolana address\nsolana balance"
    },
    {
      "intro": "A decentralized application still needs a friendly interface. A simple journal DApp can have an entry list, a text field and a Save button, with the program enforcing who can change entries.",
      "points": [
        "The frontend reads account data through an RPC connection and displays it.",
        "The wallet signs requested transactions; connecting a wallet alone does not approve a write.",
        "Show clear states: waiting for approval, submitting, confirmed, or failed. Refresh the entry only after confirmation."
      ],
      "exercise": "Draw your journal screen and label which actions only read data and which require a signed transaction. Add a helpful message for a rejected wallet request.",
      "source": "https://solana.com/docs/core"
    },
    {
      "intro": "Programs must check the accounts and permissions they receive. A polished interface cannot stop someone from calling your program directly with different inputs.",
      "points": [
        "Check required signers, account ownership and the relationship between a user and their data.",
        "For a program-derived address (PDA), validate the expected seeds. A PDA is a reproducible address derived from a program ID and chosen inputs.",
        "Validate lengths and arithmetic, and use account constraints carefully. Calling another program is a cross-program invocation (CPI); verify its identity and supplied accounts."
      ],
      "exercise": "For a journal entry, list tests for the correct author, a different wallet, the wrong data account and an overly long entry. Each invalid request should fail.",
      "source": "https://solana.com/docs/core/accounts"
    },
    {
      "intro": "Testing checks whether the program follows its rules before people rely on it. Start with a local test environment, where you can reset state and repeat experiments.",
      "points": [
        "Check a successful action and read the stored data afterward.",
        "Test failures too: missing signatures, invalid accounts and unauthorized updates.",
        "Read transaction logs to find the failing instruction. Reproduce one problem at a time rather than changing several things at once."
      ],
      "exercise": "In your Anchor project, run the generated tests with anchor test after local setup. Add an assertion for the expected result, then deliberately change that expectation and see the test fail.",
      "source": "https://solana.com/docs/intro/installation"
    },
    {
      "intro": "Performance starts with doing less unnecessary work. Measure a working program before trying to make it faster.",
      "points": [
        "Compute units measure execution work. Inspect transaction simulation or logs to understand usage.",
        "Pass only needed accounts, and mark an account writable only when it must change.",
        "A single shared writable account can become a bottleneck. Independent user accounts may allow more parallel activity, depending on your design."
      ],
      "exercise": "Compare a design where every journal update writes to one global account with one where each user has an entry account. Identify the shared write that could slow concurrent updates.",
      "source": "https://solana.com/docs/core"
    },
    {
      "intro": "You do not need every ecosystem tool at once. Choose a small set that matches your next task and learn what each one does.",
      "points": [
        "Playground helps you learn in the browser; Anchor helps structure programs and tests.",
        "An explorer shows transactions and accounts. A wallet approves requests. An RPC service connects your app to the network.",
        "Token programs manage standard token behavior. Understand existing standards before writing your own token logic."
      ],
      "exercise": "Make a tool map for your journal app: editor, framework, wallet, RPC and explorer. Write one sentence describing each role, then revisit any term you cannot explain yet.",
      "source": "https://solana.com/docs/intro/quick-start"
    }
  ],
  "ethereum": [
    {
      "intro": "Ethereum runs smart contracts: programs with rules that users can call through transactions. A blockchain keeps a shared history, so different participants can check the same result.",
      "points": [
        "Ethereum uses proof of stake: validators help agree on which transactions become part of the shared record.",
        "ETH is used to pay transaction fees. For these lessons, use Sepolia test funds rather than real assets.",
        "Examples of apps include a shared counter, a membership list or a token. Start with the counter because it has very few rules."
      ],
      "exercise": "Open an explorer for Sepolia. Find a transaction and identify its status and destination address. Reading public information does not require connecting a wallet.",
      "source": "https://ethereum.org/en/developers/docs/"
    },
    {
      "intro": "Remix is a browser-based editor for Solidity smart contracts. It lets you compile and run a small contract before installing a full development toolkit.",
      "points": [
        "Open the official Remix website and create a file named Counter.sol.",
        "Select a Solidity 0.8.x compiler. The compiler turns your code into bytecode the virtual machine can run.",
        "Use Remix VM for your first experiments. It is a simulated blockchain with test accounts, so there is no need to buy tokens or connect a real wallet."
      ],
      "exercise": "Find the File Explorer, Solidity Compiler and Deploy & Run panels in Remix. Create an empty Counter.sol file; you will fill it in during the first-contract lesson.",
      "source": "https://remix-ide.readthedocs.io/en/latest/"
    },
    {
      "intro": "Ethereum executes contracts using the Ethereum Virtual Machine, or EVM. Think of it as a shared set of execution rules, so computers agree on what each instruction does.",
      "points": [
        "An account has an address. A user account authorizes transactions using keys; a contract account runs code when called.",
        "Gas measures execution work. The fee pays for that work; it is not a transfer to the contract author.",
        "Transactions update shared state, such as a counter value. Validators check those updates, and blocks group transactions together."
      ],
      "exercise": "Explain the difference between an address, a contract and a transaction to a friend using a shared counter as your example.",
      "source": "https://ethereum.org/en/developers/docs/"
    },
    {
      "intro": "A wallet is a tool for managing keys and approving actions. Your public address identifies an account; a recovery phrase or private key can give someone control over it.",
      "points": [
        "Create a separate wallet for development and keep its recovery information private.",
        "Select Sepolia before requesting test ETH. Follow official network documentation rather than copying settings from an unknown message.",
        "Check the requested network and action in each wallet prompt. Connecting to a site is different from approving a transaction or token allowance."
      ],
      "exercise": "Locate your public address and selected network. If using a test wallet, request test ETH from a faucet linked by the official network documentation. Never enter a recovery phrase into a faucet.",
      "source": "https://ethereum.org/en/developers/docs/networks/"
    },
    {
      "intro": "A smart contract combines stored data with functions that read or change it. Its rules apply even when someone bypasses your website and calls the contract directly.",
      "points": [
        "A state variable stores information onchain. A function defines an action, such as increasing a counter.",
        "A view function reads state without changing it. A transaction is needed to persist a change.",
        "Contract data is public, including variables marked private. Private limits access from other Solidity code; it does not encrypt stored information."
      ],
      "exercise": "Design a counter with one value and one increment action. Decide whether anyone can increment it. Our learning example allows everyone, making the rule easy to observe.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/"
    },
    {
      "intro": "This small contract stores a number and lets anyone increase it by one. It does not hold funds or require an owner, making it a useful learning example.",
      "points": [
        "Paste the code into Counter.sol in Remix and compile with a compatible 0.8.x compiler.",
        "In Deploy & Run, select Remix VM, choose Counter and deploy it to the simulation.",
        "Click count to read zero. Click increment, then count again: the value should be one. Public creates a getter; external makes increment callable from outside."
      ],
      "exercise": "Increment twice more and read the result. Deploy a second copy and check its count: each deployment has its own state.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/",
      "code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Counter {\n    uint256 public count;\n\n    function increment() external {\n        count += 1;\n    }\n}"
    },
    {
      "intro": "After practicing in Remix VM, you can deploy the same Counter contract to Sepolia. Deployment is a transaction that creates a new contract address.",
      "points": [
        "Select Sepolia in your development wallet and obtain test ETH. Check the network before proceeding.",
        "In Remix, compile Counter and choose the browser-wallet environment in Deploy & Run. Approve the connection, check the selected account and deploy.",
        "Wait for confirmation, then save the contract address and network together. The address alone is not enough to identify the deployment."
      ],
      "exercise": "Find your deployment transaction in the Sepolia explorer. Check that it succeeded and copy the contract address into your notes.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/deploying/"
    },
    {
      "intro": "Reading and writing are different operations. A read asks for existing information; a write asks the network to execute a transaction and save the result.",
      "points": [
        "Your app needs the contract address, network and ABI. The ABI describes available functions and how their arguments are encoded.",
        "Reading count through an RPC call normally needs no wallet signature or onchain fee. Calling increment changes state and needs a signed transaction.",
        "Wait for the transaction receipt and check success before refreshing the count. A transaction hash only shows that you have an identifier to track."
      ],
      "exercise": "Using your deployed Counter in Remix on Sepolia, read count, increment once, wait for confirmation and read again. Compare the read with the wallet approval required for the write.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/interacting/"
    },
    {
      "intro": "Development tools save you from manually encoding every request. A library helps your JavaScript app talk to contracts, while a CLI helps you compile, test and inspect projects from a terminal.",
      "points": [
        "Libraries such as ethers or viem use a provider or client to read data, and a signer or wallet client to request writes.",
        "Foundry and Hardhat provide local development workflows. Pick one when you outgrow Remix rather than learning both at once.",
        "Match the tutorial to your installed tool version. Keep private keys out of source files and browser bundles."
      ],
      "exercise": "Write a small plan for a script that reads count: connect to an RPC, load the contract address and ABI, call the getter, and print the result. No private key is needed for this read.",
      "source": "https://ethereum.org/en/developers/docs/"
    },
    {
      "intro": "A DApp connects a familiar website to a smart contract. For the Counter app, the screen only needs the current value, a Connect Wallet button and an Increment button.",
      "points": [
        "Read the value when the page loads. Show the selected network beside it.",
        "Before a write, require the wallet to be on Sepolia. Do not silently send a transaction to a different chain.",
        "Show wallet rejection, pending confirmation and transaction failure as separate states. Disable repeated submissions while waiting."
      ],
      "exercise": "Draw the Counter screen in four states: disconnected, connected, waiting and confirmed. Write a short message for a user who rejects the transaction.",
      "source": "https://ethereum.org/en/developers/docs/dapps/"
    },
    {
      "intro": "Security begins with clear rules about who can do what. Assume a caller can send unexpected values or use a different interface from yours.",
      "points": [
        "Enforce permissions in the contract. Hiding an admin button in the frontend does not protect the admin function.",
        "Reentrancy happens when an external call leads back into your contract before the original operation finishes. Update state before external calls and use established protections when handling funds.",
        "Use reviewed libraries for common patterns, and test rejected actions. A successful demo or an automated scan is not proof that a contract is secure."
      ],
      "exercise": "Imagine adding reset to Counter. Should anyone be able to reset it? Write the rule first, then a test proving that an unauthorized account cannot do so.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/security/"
    },
    {
      "intro": "A test describes an expected result and checks that the contract produces it. Small, repeatable tests are easier to understand than repeatedly clicking through a wallet.",
      "points": [
        "For Counter, test that a new deployment starts at zero and that two increments produce two.",
        "When you introduce permissions, test both the allowed account and a rejected account.",
        "Use a local network for quick tests. For a failed public-testnet transaction, inspect the receipt and error before trying again."
      ],
      "exercise": "Write three test cases in plain English for Counter. Re-run them after every change. If you use Foundry or Hardhat later, turn each sentence into an automated assertion.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/testing/"
    },
    {
      "intro": "A simple, predictable contract is often a good starting point for performance. Measure gas use before making changes, and keep correctness ahead of tiny savings.",
      "points": [
        "Writing persistent storage costs work. Avoid saving data that the contract does not actually need.",
        "A loop over an ever-growing list can eventually use too much gas. Prefer bounded operations or smaller batches.",
        "Batch frontend reads when practical, and use transaction receipts to trigger refreshes instead of polling constantly."
      ],
      "exercise": "Compare a design that stores every click with one that only stores a total count. Which information does your app need onchain? Explain the tradeoff before changing the code.",
      "source": "https://ethereum.org/en/developers/docs/gas/"
    },
    {
      "intro": "Choose tools by their job in your workflow. A beginner project can stay small: one editor, one wallet, one test network and one explorer.",
      "points": [
        "Remix covers initial editing and deployment; Foundry or Hardhat can add repeatable local tests later.",
        "OpenZeppelin provides reusable contract patterns. An explorer helps inspect and verify deployments; verification makes source easier to inspect, not automatically safe.",
        "ethers and viem connect apps to contracts. Wallet libraries help with connection states. Explore token standards only after you understand basic reads and writes."
      ],
      "exercise": "Build a one-page map of the tools you used. Finish by showing someone your testnet Counter, explaining a read, a write and where to inspect its transaction.",
      "source": "https://ethereum.org/en/developers/docs/"
    }
  ],
  "polygon": [
    {
      "intro": "Polygon PoS runs smart contracts: programs with rules that users can call through transactions. A blockchain keeps a shared history, so different participants can check the same result.",
      "points": [
        "This guide focuses on Polygon PoS, an EVM-compatible network with its own validators and connections to Ethereum. It is not the same network as Ethereum Mainnet.",
        "POL is used to pay transaction fees. For these lessons, use Amoy test funds rather than real assets.",
        "Examples of apps include a shared counter, a membership list or a token. Start with the counter because it has very few rules."
      ],
      "exercise": "Open an explorer for Amoy. Find a transaction and identify its status and destination address. Reading public information does not require connecting a wallet.",
      "source": "https://docs.polygon.technology/pos/get-started/building-on-polygon"
    },
    {
      "intro": "Remix is a browser-based editor for Solidity smart contracts. It lets you compile and run a small contract before installing a full development toolkit.",
      "points": [
        "Open the official Remix website and create a file named Counter.sol.",
        "Select a Solidity 0.8.x compiler. The compiler turns your code into bytecode the virtual machine can run.",
        "Use Remix VM for your first experiments. It is a simulated blockchain with test accounts, so there is no need to buy tokens or connect a real wallet."
      ],
      "exercise": "Find the File Explorer, Solidity Compiler and Deploy & Run panels in Remix. Create an empty Counter.sol file; you will fill it in during the first-contract lesson.",
      "source": "https://remix-ide.readthedocs.io/en/latest/"
    },
    {
      "intro": "Polygon PoS executes contracts using the Ethereum Virtual Machine, or EVM. Think of it as a shared set of execution rules, so computers agree on what each instruction does.",
      "points": [
        "An account has an address. A user account authorizes transactions using keys; a contract account runs code when called.",
        "Gas measures execution work. The fee pays for that work; it is not a transfer to the contract author.",
        "Polygon PoS has its own balances and contract deployments. Amoy uses chain ID 80002; changing networks does not move assets between them."
      ],
      "exercise": "Explain the difference between an address, a contract and a transaction to a friend using a shared counter as your example.",
      "source": "https://docs.polygon.technology/pos/get-started/building-on-polygon"
    },
    {
      "intro": "A wallet is a tool for managing keys and approving actions. Your public address identifies an account; a recovery phrase or private key can give someone control over it.",
      "points": [
        "Create a separate wallet for development and keep its recovery information private.",
        "Select Amoy before requesting test POL. Follow official network documentation rather than copying settings from an unknown message.",
        "Check the requested network and action in each wallet prompt. Connecting to a site is different from approving a transaction or token allowance."
      ],
      "exercise": "Locate your public address and selected network. If using a test wallet, request test POL from a faucet linked by the official network documentation. Never enter a recovery phrase into a faucet.",
      "source": "https://docs.polygon.technology/pos/reference/rpc-endpoints"
    },
    {
      "intro": "A smart contract combines stored data with functions that read or change it. Its rules apply even when someone bypasses your website and calls the contract directly.",
      "points": [
        "A state variable stores information onchain. A function defines an action, such as increasing a counter.",
        "A view function reads state without changing it. A transaction is needed to persist a change.",
        "Contract data is public, including variables marked private. Private limits access from other Solidity code; it does not encrypt stored information."
      ],
      "exercise": "Design a counter with one value and one increment action. Decide whether anyone can increment it. Our learning example allows everyone, making the rule easy to observe.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/"
    },
    {
      "intro": "This small contract stores a number and lets anyone increase it by one. It does not hold funds or require an owner, making it a useful learning example.",
      "points": [
        "Paste the code into Counter.sol in Remix and compile with a compatible 0.8.x compiler.",
        "In Deploy & Run, select Remix VM, choose Counter and deploy it to the simulation.",
        "Click count to read zero. Click increment, then count again: the value should be one. Public creates a getter; external makes increment callable from outside."
      ],
      "exercise": "Increment twice more and read the result. Deploy a second copy and check its count: each deployment has its own state.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/",
      "code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Counter {\n    uint256 public count;\n\n    function increment() external {\n        count += 1;\n    }\n}"
    },
    {
      "intro": "After practicing in Remix VM, you can deploy the same Counter contract to Amoy. Deployment is a transaction that creates a new contract address.",
      "points": [
        "Check Polygon’s official Amoy settings: chain ID 80002 and gas token POL. Use an Amoy RPC from the official network page.",
        "In Remix, compile Counter and choose the browser-wallet environment in Deploy & Run. Approve the connection, check the selected account and deploy.",
        "Wait for confirmation, then save the contract address and network together. The address alone is not enough to identify the deployment."
      ],
      "exercise": "Find your deployment transaction in the Amoy explorer. Check that it succeeded and copy the contract address into your notes.",
      "source": "https://docs.polygon.technology/pos/reference/rpc-endpoints"
    },
    {
      "intro": "Reading and writing are different operations. A read asks for existing information; a write asks the network to execute a transaction and save the result.",
      "points": [
        "Your app needs the contract address, network and ABI. The ABI describes available functions and how their arguments are encoded.",
        "Reading count through an RPC call normally needs no wallet signature or onchain fee. Calling increment changes state and needs a signed transaction.",
        "Wait for the transaction receipt and check success before refreshing the count. A transaction hash only shows that you have an identifier to track."
      ],
      "exercise": "Using your deployed Counter in Remix on Amoy, read count, increment once, wait for confirmation and read again. Compare the read with the wallet approval required for the write.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/interacting/"
    },
    {
      "intro": "Development tools save you from manually encoding every request. A library helps your JavaScript app talk to contracts, while a CLI helps you compile, test and inspect projects from a terminal.",
      "points": [
        "Libraries such as ethers or viem use a provider or client to read data, and a signer or wallet client to request writes.",
        "Foundry and Hardhat provide local development workflows. Pick one when you outgrow Remix rather than learning both at once.",
        "Polygon uses standard EVM tools; a separate Polygon-specific CLI is not required. Point your tools to Amoy and check its chain ID."
      ],
      "exercise": "Write a small plan for a script that reads count: connect to an RPC, load the contract address and ABI, call the getter, and print the result. No private key is needed for this read.",
      "source": "https://docs.polygon.technology/pos/get-started/building-on-polygon"
    },
    {
      "intro": "A DApp connects a familiar website to a smart contract. For the Counter app, the screen only needs the current value, a Connect Wallet button and an Increment button.",
      "points": [
        "Read the value when the page loads. Show the selected network beside it.",
        "Before a write, require the wallet to be on Amoy. Do not silently send a transaction to a different chain.",
        "Show wallet rejection, pending confirmation and transaction failure as separate states. Disable repeated submissions while waiting."
      ],
      "exercise": "Draw the Counter screen in four states: disconnected, connected, waiting and confirmed. Write a short message for a user who rejects the transaction.",
      "source": "https://ethereum.org/en/developers/docs/dapps/"
    },
    {
      "intro": "Security begins with clear rules about who can do what. Assume a caller can send unexpected values or use a different interface from yours.",
      "points": [
        "Enforce permissions in the contract. Hiding an admin button in the frontend does not protect the admin function.",
        "Reentrancy happens when an external call leads back into your contract before the original operation finishes. Update state before external calls and use established protections when handling funds.",
        "Use reviewed libraries for common patterns, and test rejected actions. A successful demo or an automated scan is not proof that a contract is secure."
      ],
      "exercise": "Imagine adding reset to Counter. Should anyone be able to reset it? Write the rule first, then a test proving that an unauthorized account cannot do so.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/security/"
    },
    {
      "intro": "A test describes an expected result and checks that the contract produces it. Small, repeatable tests are easier to understand than repeatedly clicking through a wallet.",
      "points": [
        "For Counter, test that a new deployment starts at zero and that two increments produce two.",
        "When you introduce permissions, test both the allowed account and a rejected account.",
        "Use a local network for quick tests. For a failed public-testnet transaction, inspect the receipt and error before trying again."
      ],
      "exercise": "Write three test cases in plain English for Counter. Re-run them after every change. If you use Foundry or Hardhat later, turn each sentence into an automated assertion.",
      "source": "https://ethereum.org/en/developers/docs/smart-contracts/testing/"
    },
    {
      "intro": "A simple, predictable contract is often a good starting point for performance. Measure gas use before making changes, and keep correctness ahead of tiny savings.",
      "points": [
        "Writing persistent storage costs work. Avoid saving data that the contract does not actually need.",
        "A loop over an ever-growing list can eventually use too much gas. Prefer bounded operations or smaller batches.",
        "Lower fees on Polygon do not remove execution limits. Measure on your target network and avoid unnecessary frontend RPC polling."
      ],
      "exercise": "Compare a design that stores every click with one that only stores a total count. Which information does your app need onchain? Explain the tradeoff before changing the code.",
      "source": "https://ethereum.org/en/developers/docs/gas/"
    },
    {
      "intro": "Choose tools by their job in your workflow. A beginner project can stay small: one editor, one wallet, one test network and one explorer.",
      "points": [
        "Remix covers initial editing and deployment; Foundry or Hardhat can add repeatable local tests later.",
        "OpenZeppelin provides reusable contract patterns. An explorer helps inspect and verify deployments; verification makes source easier to inspect, not automatically safe.",
        "Polygon’s docs provide PoS and Amoy settings. Bridges move assets between networks, but add extra steps and risks; the Counter lessons do not need one."
      ],
      "exercise": "Build a one-page map of the tools you used. Finish by showing someone your testnet Counter, explaining a read, a write and where to inspect its transaction.",
      "source": "https://docs.polygon.technology/pos/get-started/building-on-polygon"
    }
  ]
};
