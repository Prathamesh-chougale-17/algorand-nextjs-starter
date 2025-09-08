# Algorand Next.js Starter

A full-stack starter template for building Algorand dApps with Next.js, TypeScript, and modern tooling. This project streamlines smart contract development, deployment, and frontend integration.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Smart Contract Development](#smart-contract-development)
  - [Writing Contracts](#writing-contracts)
  - [Compiling & Generating Clients](#compiling--generating-clients)
  - [Deploying Contracts](#deploying-contracts)
- [Frontend Development](#frontend-development)
- [Environment Configuration](#environment-configuration)
- [Scripts Reference](#scripts-reference)
- [Testing & Linting](#testing--linting)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

---

## Features

- **Next.js 15** with TypeScript, TailwindCSS, and Radix UI
- **Algorand smart contract workflow**: Write, compile, generate clients, deploy
- **Wallet integrations**: Defly, Pera, WalletConnect, etc.
- **Reusable UI components** and hooks
- **Modern developer experience**: Biome, pnpm, hot reload, type checking

---

## Project Structure

```
algorand-nextjs-starter/
├── smart_contracts/         # Write your Algorand smart contracts here
│   ├── index.ts             # Contract deployment entrypoint
│   ├── artifacts/           # Compiled contracts & generated clients
│   └── ...                  # Contract source files
├── contracts/               # Generated TypeScript clients for contracts
├── components/              # Reusable React components
├── app/                     # Next.js app directory
├── utils/                   # Utility functions
├── public/                  # Static assets
├── .algokit.toml            # Algokit project config
├── package.json             # Scripts & dependencies
└── README.md                # This file
```

---

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Create a `.env` file for secrets (see [Environment Configuration](#environment-configuration)). You can use the generator:

```bash
algokit generate env-file
```

Or manually add:

```
DEPLOYER_MNEMONIC="your 25-word mnemonic here"
ALGOD_SERVER="https://testnet-api.algonode.cloud"
ALGOD_TOKEN=""
```

---

## Smart Contract Development

### Writing Contracts

- Write your contracts in TypeScript inside `smart_contracts/`.
- Example: `smart_contracts/hello_world/contract.algo.ts`

### Compiling & Generating Clients

Compile contracts and generate TypeScript clients with:

```bash
pnpm generate
```

This runs:
- `pnpm algobuild`: Compiles contracts in `smart_contracts/` to TEAL and outputs to `smart_contracts/artifacts/`
- Generates TypeScript clients in `contracts/` for each contract

You can also run steps individually:
```bash
pnpm algobuild
pnpm generate:clients
```

### Deploying Contracts

Deploy contracts to Algorand network:

```bash
pnpm deploy
```

For CI or production:
```bash
pnpm deploy:ci
```

Deployment uses the mnemonic and network config from `.env`.

---

## Frontend Development

- The Next.js app is in the `app/` directory.
- UI components are in `components/` and `components/ui/`.
- Use generated contract clients from `contracts/` to interact with Algorand smart contracts.
- Wallet integrations are available via hooks and components.

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
pnpm start
```

---

## Environment Configuration

- `.env` file is required for deployment and contract interaction.
- Example variables:
  - `DEPLOYER_MNEMONIC`
  - `ALGOD_SERVER`
  - `ALGOD_TOKEN`
- See `.algokit.toml` for more config options.

---

## Scripts Reference

| Script              | Description                                      |
|---------------------|--------------------------------------------------|
| `pnpm dev`          | Start Next.js dev server                         |
| `pnpm build`        | Build Next.js app                                |
| `pnpm start`        | Start production server                          |
| `pnpm algobuild`    | Compile smart contracts                          |
| `pnpm generate`     | Compile contracts & generate clients             |
| `pnpm deploy`       | Deploy contracts (watch mode)                    |
| `pnpm deploy:ci`    | Deploy contracts (CI mode)                       |
| `pnpm lint`         | Run Biome linter                                 |
| `pnpm format`       | Format code with Biome                           |
| `pnpm check-types`  | Type check with TypeScript                       |

---

## Testing & Linting

- Run frontend tests (if present):

  ```bash
  pnpm test
  ```

- Lint and format code:

  ```bash
  pnpm lint
  pnpm format
  ```

---

## Troubleshooting

- **Contract compilation errors**: Check your TypeScript contract code and ensure Algokit is installed.
- **Deployment issues**: Verify `.env` secrets and network endpoints.
- **Client generation**: Ensure contracts are compiled before generating clients.

---

## Resources

- [Algorand Developer Portal](https://developer.algorand.org/)
- [Algokit Documentation](https://github.com/algorandfoundation/algokit-cli)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---