/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { ProtoCoin, ProtoCoinInterface } from "../ProtoCoin";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "remaining",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526040518060400160405280600981526020017f50726f746f436f696e0000000000000000000000000000000000000000000000815250600090816200004a9190620003b2565b506040518060400160405280600381526020017f505243000000000000000000000000000000000000000000000000000000000081525060019081620000919190620003b2565b506012600260006101000a81548160ff021916908360ff160217905550600260009054906101000a900460ff16600a620000cc919062000629565b6103e8620000db91906200067a565b600355348015620000eb57600080fd5b50600354600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550620006c5565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620001ba57607f821691505b602082108103620001d057620001cf62000172565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200023a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620001fb565b620002468683620001fb565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620002936200028d62000287846200025e565b62000268565b6200025e565b9050919050565b6000819050919050565b620002af8362000272565b620002c7620002be826200029a565b84845462000208565b825550505050565b600090565b620002de620002cf565b620002eb818484620002a4565b505050565b5b81811015620003135762000307600082620002d4565b600181019050620002f1565b5050565b601f82111562000362576200032c81620001d6565b6200033784620001eb565b8101602085101562000347578190505b6200035f6200035685620001eb565b830182620002f0565b50505b505050565b600082821c905092915050565b6000620003876000198460080262000367565b1980831691505092915050565b6000620003a2838362000374565b9150826002028217905092915050565b620003bd8262000138565b67ffffffffffffffff811115620003d957620003d862000143565b5b620003e58254620001a1565b620003f282828562000317565b600060209050601f8311600181146200042a576000841562000415578287015190505b62000421858262000394565b86555062000491565b601f1984166200043a86620001d6565b60005b8281101562000464578489015182556001820191506020850194506020810190506200043d565b8683101562000484578489015162000480601f89168262000374565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b60018511156200052757808604811115620004ff57620004fe62000499565b5b60018516156200050f5780820291505b80810290506200051f85620004c8565b9450620004df565b94509492505050565b60008262000542576001905062000615565b8162000552576000905062000615565b81600181146200056b57600281146200057657620005ac565b600191505062000615565b60ff8411156200058b576200058a62000499565b5b8360020a915084821115620005a557620005a462000499565b5b5062000615565b5060208310610133831016604e8410600b8410161715620005e65782820a905083811115620005e057620005df62000499565b5b62000615565b620005f58484846001620004d5565b925090508184048111156200060f576200060e62000499565b5b81810290505b9392505050565b600060ff82169050919050565b600062000636826200025e565b915062000643836200061c565b9250620006727fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000530565b905092915050565b600062000687826200025e565b915062000694836200025e565b9250828202620006a4816200025e565b91508282048414831517620006be57620006bd62000499565b5b5092915050565b610d8e80620006d56000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461013457806370a082311461015257806395d89b4114610182578063a9059cbb146101a0578063dd62ed3e146101d057610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100e657806323b872dd14610104575b600080fd5b6100a0610200565b6040516100ad9190610937565b60405180910390f35b6100d060048036038101906100cb91906109f2565b61028e565b6040516100dd9190610a4d565b60405180910390f35b6100ee610380565b6040516100fb9190610a77565b60405180910390f35b61011e60048036038101906101199190610a92565b610386565b60405161012b9190610a4d565b60405180910390f35b61013c6105ce565b6040516101499190610b01565b60405180910390f35b61016c60048036038101906101679190610b1c565b6105e1565b6040516101799190610a77565b60405180910390f35b61018a61062a565b6040516101979190610937565b60405180910390f35b6101ba60048036038101906101b591906109f2565b6106b8565b6040516101c79190610a4d565b60405180910390f35b6101ea60048036038101906101e59190610b49565b610820565b6040516101f79190610a77565b60405180910390f35b6000805461020d90610bb8565b80601f016020809104026020016040519081016040528092919081815260200182805461023990610bb8565b80156102865780601f1061025b57610100808354040283529160200191610286565b820191906000526020600020905b81548152906001019060200180831161026957829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161036e9190610a77565b60405180910390a36001905092915050565b60035481565b600081610392856105e1565b10156103d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ca90610c35565b60405180910390fd5b816103de8533610820565b101561041f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041690610ca1565b60405180910390fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461046e9190610cf0565b9250508190555081600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105019190610cf0565b9250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105579190610d24565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516105bb9190610a77565b60405180910390a3600190509392505050565b600260009054906101000a900460ff1681565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6001805461063790610bb8565b80601f016020809104026020016040519081016040528092919081815260200182805461066390610bb8565b80156106b05780601f10610685576101008083540402835291602001916106b0565b820191906000526020600020905b81548152906001019060200180831161069357829003601f168201915b505050505081565b6000816106c4336105e1565b1015610705576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fc90610c35565b60405180910390fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107549190610cf0565b9250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107aa9190610d24565b925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161080e9190610a77565b60405180910390a36001905092915050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156108e15780820151818401526020810190506108c6565b60008484015250505050565b6000601f19601f8301169050919050565b6000610909826108a7565b61091381856108b2565b93506109238185602086016108c3565b61092c816108ed565b840191505092915050565b6000602082019050818103600083015261095181846108fe565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006109898261095e565b9050919050565b6109998161097e565b81146109a457600080fd5b50565b6000813590506109b681610990565b92915050565b6000819050919050565b6109cf816109bc565b81146109da57600080fd5b50565b6000813590506109ec816109c6565b92915050565b60008060408385031215610a0957610a08610959565b5b6000610a17858286016109a7565b9250506020610a28858286016109dd565b9150509250929050565b60008115159050919050565b610a4781610a32565b82525050565b6000602082019050610a626000830184610a3e565b92915050565b610a71816109bc565b82525050565b6000602082019050610a8c6000830184610a68565b92915050565b600080600060608486031215610aab57610aaa610959565b5b6000610ab9868287016109a7565b9350506020610aca868287016109a7565b9250506040610adb868287016109dd565b9150509250925092565b600060ff82169050919050565b610afb81610ae5565b82525050565b6000602082019050610b166000830184610af2565b92915050565b600060208284031215610b3257610b31610959565b5b6000610b40848285016109a7565b91505092915050565b60008060408385031215610b6057610b5f610959565b5b6000610b6e858286016109a7565b9250506020610b7f858286016109a7565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610bd057607f821691505b602082108103610be357610be2610b89565b5b50919050565b7f496e73756666696369656e742062616c616e6365000000000000000000000000600082015250565b6000610c1f6014836108b2565b9150610c2a82610be9565b602082019050919050565b60006020820190508181036000830152610c4e81610c12565b9050919050565b7f496e73756666696369656e7420616c6c6f77616e636500000000000000000000600082015250565b6000610c8b6016836108b2565b9150610c9682610c55565b602082019050919050565b60006020820190508181036000830152610cba81610c7e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610cfb826109bc565b9150610d06836109bc565b9250828203905081811115610d1e57610d1d610cc1565b5b92915050565b6000610d2f826109bc565b9150610d3a836109bc565b9250828201905080821115610d5257610d51610cc1565b5b9291505056fea2646970667358221220714514c3eb047279d896c6788fda519058de9a870e1b529a4f870605e319499264736f6c63430008140033";

type ProtoCoinConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProtoCoinConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProtoCoin__factory extends ContractFactory {
  constructor(...args: ProtoCoinConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ProtoCoin & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ProtoCoin__factory {
    return super.connect(runner) as ProtoCoin__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProtoCoinInterface {
    return new Interface(_abi) as ProtoCoinInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ProtoCoin {
    return new Contract(address, _abi, runner) as unknown as ProtoCoin;
  }
}