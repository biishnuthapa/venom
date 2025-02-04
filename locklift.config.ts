import { lockliftChai, LockliftConfig } from "locklift";
import { FactorySource } from "./build/factorySource";
import * as dotenv from "dotenv";
import chai from "chai";

dotenv.config();
chai.use(lockliftChai);

declare global {
  const locklift: import("locklift").Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = process.env.NETWORK_ENDPOINT || "http://localhost/graphql";
const VENOM_TESTNET_ENDPOINT = "https://jrpc-testnet.venom.foundation/rpc";



const VENOM_MAINNET_GIVER_PHRASE = 'bleak remove hobby boring small talk choice father curtain domain'
const VENOM_MAINNET_GIVER_ADDRESS = '0:b9a0be6e8be7f81bc16ed7dc5640cd6acaf8dd70108eefaa2bcb06d38e1a65ca'
const VENOM_MAINNET_PHRASE= 'bleak remove hobby boring small talk choice father curtain domain'



const config: LockliftConfig = {
  compiler: {
    // Specify path to your TON-Solidity-Compiler
    // path: "/mnt/o/projects/broxus/TON-Solidity-Compiler/build/solc/solc",

    // Or specify version of compiler
    version: "0.62.0",

    // Specify config for extarnal contracts as in exapmple
    // externalContracts: {
    //   "node_modules/broxus-ton-tokens-contracts/build": ['TokenRoot', 'TokenWallet']
    // }
  },
  linker: {
    // Specify path to your stdlib
    // lib: "/mnt/o/projects/broxus/TON-Solidity-Compiler/lib/stdlib_sol.tvm",
    // // Specify path to your Linker
    // path: "/mnt/o/projects/broxus/TVM-linker/target/release/tvm_linker",

    // Or specify version of linker
    version: "0.15.48",
  },
  networks: {
    locklift: {
      connection: {
        id: 1001,
        // @ts-ignore
        type: "jrpc",
        // @ts-ignore
        data: {},
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    local: {
      // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
      connection: {
        id: 1,
        group: "localnet",
        type: "graphql",
        data: {
          endpoints: [LOCAL_NETWORK_ENDPOINT],
          latencyDetectionInterval: 1000,
          local: true,
        },
      },
      // This giver is default local-node giverV2
      giver: {
        // Check if you need provide custom giver
        address: "0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415",
        key: "172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3",
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    venom_testnet: {
      connection: {
        id: 1000,
        type: "jrpc",
        group: "dev",
        data: {
          endpoint: VENOM_TESTNET_ENDPOINT,
        },
      },
      giver: {
        address: "0:b9a0be6e8be7f81bc16ed7dc5640cd6acaf8dd70108eefaa2bcb06d38e1a65ca",
        phrase: "bleak remove hobby boring small talk choice father curtain domain",
        accountId: 0,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },main: {
  connection: {
    id: 1,
    type: 'jrpc',
    group: 'main',
    data: {
      endpoint: 'https://jrpc.venom.foundation/rpc',
    },
  },
  giver: {  
    address: VENOM_MAINNET_GIVER_ADDRESS,
    phrase: 'bleak remove hobby boring small  talk choice father curtain domain',
    accountId: 0,

  },
  keys: {
    phrase: VENOM_MAINNET_PHRASE,
    amount: 100,
  },
}
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;
