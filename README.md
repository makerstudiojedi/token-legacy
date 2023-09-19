# 🪙 TokenLegacy

## Getting started

You need 4 Terminal windows:

- Terminal 1:

```bash
yarn start
```

Open `http://localhost:3000`, connect your burner wallet, copy address and edit `packages/deploy/01_deploy_tokens.ts`. Set `testerAddress` to your burner wallet address

- Terminal 2:

```bash
yarn chain
```

- Terminal 3:

```bash
yarn deploy --reset
```

- Terminal 4:

```bash
cd packages/subgraph

# start docker
docker compose up -d

# prepare your subgraph yaml config
yarn run prepare:local

# build and create your graph project
yarn codegen && yarn build && yarn run create-local && yarn deploy-local

# this will prompt for your version number, you can add v0.0.1
```