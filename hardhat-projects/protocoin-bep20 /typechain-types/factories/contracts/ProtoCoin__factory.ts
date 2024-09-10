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
import type { NonPayableOverrides } from "../../common";
import type { ProtoCoin, ProtoCoinInterface } from "../../contracts/ProtoCoin";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint256",
        name: "newAmount",
        type: "uint256",
      },
    ],
    name: "setMintAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "newDelayInSeconds",
        type: "uint64",
      },
    ],
    name: "setMintDelay",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260006006556201de20600760006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055503480156200004257600080fd5b506040518060400160405280600981526020017f50726f746f436f696e00000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f50524300000000000000000000000000000000000000000000000000000000008152508160039081620000c091906200066e565b508060049081620000d291906200066e565b50505033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200013133683635c9adc5dea000006200013760201b60201c565b6200088c565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620001ac5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401620001a391906200079a565b60405180910390fd5b620001c060008383620001c460201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036200021a5780600260008282546200020d9190620007e6565b92505081905550620002f0565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015620002a9578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401620002a09392919062000832565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200033b578060026000828254039250508190555062000388565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003e791906200086f565b60405180910390a3505050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200047657607f821691505b6020821081036200048c576200048b6200042e565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004f67fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620004b7565b620005028683620004b7565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006200054f6200054962000543846200051a565b62000524565b6200051a565b9050919050565b6000819050919050565b6200056b836200052e565b620005836200057a8262000556565b848454620004c4565b825550505050565b600090565b6200059a6200058b565b620005a781848462000560565b505050565b5b81811015620005cf57620005c360008262000590565b600181019050620005ad565b5050565b601f8211156200061e57620005e88162000492565b620005f384620004a7565b8101602085101562000603578190505b6200061b6200061285620004a7565b830182620005ac565b50505b505050565b600082821c905092915050565b6000620006436000198460080262000623565b1980831691505092915050565b60006200065e838362000630565b9150826002028217905092915050565b6200067982620003f4565b67ffffffffffffffff811115620006955762000694620003ff565b5b620006a182546200045d565b620006ae828285620005d3565b600060209050601f831160018114620006e65760008415620006d1578287015190505b620006dd858262000650565b8655506200074d565b601f198416620006f68662000492565b60005b828110156200072057848901518255600182019150602085019450602081019050620006f9565b868310156200074057848901516200073c601f89168262000630565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620007828262000755565b9050919050565b620007948162000775565b82525050565b6000602082019050620007b1600083018462000789565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620007f3826200051a565b915062000800836200051a565b92508282019050808211156200081b576200081a620007b7565b5b92915050565b6200082c816200051a565b82525050565b600060608201905062000849600083018662000789565b62000858602083018562000821565b62000867604083018462000821565b949350505050565b600060208201905062000886600083018462000821565b92915050565b6113b1806200089c6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80634c19c661116100715780634c19c6611461017d57806370a082311461019957806395d89b41146101c9578063a9059cbb146101e7578063c7cd997f14610217578063dd62ed3e14610233576100b4565b806306fdde03146100b9578063095ea7b3146100d75780631249c58b1461010757806318160ddd1461011157806323b872dd1461012f578063313ce5671461015f575b600080fd5b6100c1610263565b6040516100ce9190610e27565b60405180910390f35b6100f160048036038101906100ec9190610ee2565b6102f5565b6040516100fe9190610f3d565b60405180910390f35b61010f610318565b005b61011961045b565b6040516101269190610f67565b60405180910390f35b61014960048036038101906101449190610f82565b610465565b6040516101569190610f3d565b60405180910390f35b610167610494565b6040516101749190610ff1565b60405180910390f35b6101976004803603810190610192919061104c565b61049d565b005b6101b360048036038101906101ae9190611079565b610559565b6040516101c09190610f67565b60405180910390f35b6101d16105a1565b6040516101de9190610e27565b60405180910390f35b61020160048036038101906101fc9190610ee2565b610633565b60405161020e9190610f3d565b60405180910390f35b610231600480360381019061022c91906110a6565b610656565b005b61024d600480360381019061024891906110d3565b6106f0565b60405161025a9190610f67565b60405180910390f35b60606003805461027290611142565b80601f016020809104026020016040519081016040528092919081815260200182805461029e90611142565b80156102eb5780601f106102c0576101008083540402835291602001916102eb565b820191906000526020600020905b8154815290600101906020018083116102ce57829003601f168201915b5050505050905090565b600080610300610777565b905061030d81858561077f565b600191505092915050565b60006006541161035d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610354906111bf565b60405180910390fd5b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205442116103de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d59061122b565b60405180910390fd5b6103ea33600654610791565b600760009054906101000a900467ffffffffffffffff1667ffffffffffffffff1642610416919061127a565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550565b6000600254905090565b600080610470610777565b905061047d858285610813565b6104888585856108a7565b60019150509392505050565b60006012905090565b3373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461052d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610524906112fa565b60405180910390fd5b80600760006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600480546105b090611142565b80601f01602080910402602001604051908101604052809291908181526020018280546105dc90611142565b80156106295780601f106105fe57610100808354040283529160200191610629565b820191906000526020600020905b81548152906001019060200180831161060c57829003601f168201915b5050505050905090565b60008061063e610777565b905061064b8185856108a7565b600191505092915050565b3373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146106e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106dd906112fa565b60405180910390fd5b8060068190555050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b61078c838383600161099b565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108035760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016107fa9190611329565b60405180910390fd5b61080f60008383610b72565b5050565b600061081f84846106f0565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146108a15781811015610891578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161088893929190611344565b60405180910390fd5b6108a08484848403600061099b565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036109195760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016109109190611329565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361098b5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016109829190611329565b60405180910390fd5b610996838383610b72565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610a0d5760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610a049190611329565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a7f5760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610a769190611329565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610b6c578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610b639190610f67565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610bc4578060026000828254610bb8919061127a565b92505081905550610c97565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c50578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610c4793929190611344565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ce05780600260008282540392505081905550610d2d565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d8a9190610f67565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610dd1578082015181840152602081019050610db6565b60008484015250505050565b6000601f19601f8301169050919050565b6000610df982610d97565b610e038185610da2565b9350610e13818560208601610db3565b610e1c81610ddd565b840191505092915050565b60006020820190508181036000830152610e418184610dee565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e7982610e4e565b9050919050565b610e8981610e6e565b8114610e9457600080fd5b50565b600081359050610ea681610e80565b92915050565b6000819050919050565b610ebf81610eac565b8114610eca57600080fd5b50565b600081359050610edc81610eb6565b92915050565b60008060408385031215610ef957610ef8610e49565b5b6000610f0785828601610e97565b9250506020610f1885828601610ecd565b9150509250929050565b60008115159050919050565b610f3781610f22565b82525050565b6000602082019050610f526000830184610f2e565b92915050565b610f6181610eac565b82525050565b6000602082019050610f7c6000830184610f58565b92915050565b600080600060608486031215610f9b57610f9a610e49565b5b6000610fa986828701610e97565b9350506020610fba86828701610e97565b9250506040610fcb86828701610ecd565b9150509250925092565b600060ff82169050919050565b610feb81610fd5565b82525050565b60006020820190506110066000830184610fe2565b92915050565b600067ffffffffffffffff82169050919050565b6110298161100c565b811461103457600080fd5b50565b60008135905061104681611020565b92915050565b60006020828403121561106257611061610e49565b5b600061107084828501611037565b91505092915050565b60006020828403121561108f5761108e610e49565b5b600061109d84828501610e97565b91505092915050565b6000602082840312156110bc576110bb610e49565b5b60006110ca84828501610ecd565b91505092915050565b600080604083850312156110ea576110e9610e49565b5b60006110f885828601610e97565b925050602061110985828601610e97565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061115a57607f821691505b60208210810361116d5761116c611113565b5b50919050565b7f4d696e74696e67206973206e6f7420656e61626c65642e000000000000000000600082015250565b60006111a9601783610da2565b91506111b482611173565b602082019050919050565b600060208201905081810360008301526111d88161119c565b9050919050565b7f596f752063616e6e6f74206d696e7420747769636520696e206120726f772e00600082015250565b6000611215601f83610da2565b9150611220826111df565b602082019050919050565b6000602082019050818103600083015261124481611208565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061128582610eac565b915061129083610eac565b92508282019050808211156112a8576112a761124b565b5b92915050565b7f596f7520646f206e6f742068617665207065726d697373696f6e2e0000000000600082015250565b60006112e4601b83610da2565b91506112ef826112ae565b602082019050919050565b60006020820190508181036000830152611313816112d7565b9050919050565b61132381610e6e565b82525050565b600060208201905061133e600083018461131a565b92915050565b6000606082019050611359600083018661131a565b6113666020830185610f58565b6113736040830184610f58565b94935050505056fea26469706673582212205cc1c863b2a119296fb81d9bb84aca238b9d7645b2f244d725020c43704ed7fc64736f6c63430008140033";

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
