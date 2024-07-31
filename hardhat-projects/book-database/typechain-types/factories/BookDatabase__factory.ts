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
import type { BookDatabase, BookDatabaseInterface } from "../BookDatabase";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "uint16",
            name: "year",
            type: "uint16",
          },
        ],
        internalType: "struct BookDatabase.Book",
        name: "newBook",
        type: "tuple",
      },
    ],
    name: "addBook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "books",
    outputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "count",
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
        internalType: "uint32",
        name: "id",
        type: "uint32",
      },
      {
        components: [
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "uint16",
            name: "year",
            type: "uint16",
          },
        ],
        internalType: "struct BookDatabase.Book",
        name: "newBook",
        type: "tuple",
      },
    ],
    name: "editBook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "id",
        type: "uint32",
      },
    ],
    name: "removeBook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040526000600160006101000a81548163ffffffff021916908363ffffffff16021790555034801561003257600080fd5b503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050608051610e5e61008260003960006102a10152610e5e6000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806306661abd1461005c57806368d748ca1461007a578063b19a4635146100ab578063e9e7ff0c146100c7578063feaeb5ab146100e3575b600080fd5b6100646100ff565b6040516100719190610621565b60405180910390f35b610094600480360381019061008f919061068c565b610105565b6040516100a2929190610766565b60405180910390f35b6100c560048036038101906100c0919061096d565b6101bf565b005b6100e160048036038101906100dc919061068c565b610288565b005b6100fd60048036038101906100f891906109b6565b6103b4565b005b60025481565b600060205280600052604060002060009150905080600001805461012890610a41565b80601f016020809104026020016040519081016040528092919081815260200182805461015490610a41565b80156101a15780601f10610176576101008083540402835291602001916101a1565b820191906000526020600020905b81548152906001019060200180831161018457829003601f168201915b5050505050908060010160009054906101000a900461ffff16905082565b6001600081819054906101000a900463ffffffff16809291906101e190610aa1565b91906101000a81548163ffffffff021916908363ffffffff1602179055505080600080600160009054906101000a900463ffffffff1663ffffffff1663ffffffff16815260200190815260200160002060008201518160000190816102469190610c79565b5060208201518160010160006101000a81548161ffff021916908361ffff1602179055509050506002600081548092919061028090610d4b565b919050555050565b3373ffffffffffffffffffffffffffffffffffffffff167f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1614610316576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161030d90610ddf565b60405180910390fd5b60008060008363ffffffff1663ffffffff16815260200190815260200160002060010160009054906101000a900461ffff1661ffff1611156103b1576000808263ffffffff1663ffffffff1681526020019081526020016000206000808201600061038191906105ab565b6001820160006101000a81549061ffff02191690555050600260008154809291906103ab90610dff565b91905055505b50565b60008060008463ffffffff1663ffffffff1681526020019081526020016000206040518060400160405290816000820180546103ef90610a41565b80601f016020809104026020016040519081016040528092919081815260200182805461041b90610a41565b80156104685780601f1061043d57610100808354040283529160200191610468565b820191906000526020600020905b81548152906001019060200180831161044b57829003601f168201915b505050505081526020016001820160009054906101000a900461ffff1661ffff1661ffff168152505090506104a581600001518360000151610578565b1580156104cc57506104ca826000015160405180602001604052806000815250610578565b155b156105055781600001516000808563ffffffff1663ffffffff16815260200190815260200160002060000190816105039190610c79565b505b816020015161ffff16816020015161ffff161415801561052d57506000826020015161ffff16115b156105735781602001516000808563ffffffff1663ffffffff16815260200190815260200160002060010160006101000a81548161ffff021916908361ffff1602179055505b505050565b6000808390506000839050805182511480156105a1575080805190602001208280519060200120145b9250505092915050565b5080546105b790610a41565b6000825580601f106105c957506105e8565b601f0160209004906000526020600020908101906105e791906105eb565b5b50565b5b808211156106045760008160009055506001016105ec565b5090565b6000819050919050565b61061b81610608565b82525050565b60006020820190506106366000830184610612565b92915050565b6000604051905090565b600080fd5b600080fd5b600063ffffffff82169050919050565b61066981610650565b811461067457600080fd5b50565b60008135905061068681610660565b92915050565b6000602082840312156106a2576106a1610646565b5b60006106b084828501610677565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156106f35780820151818401526020810190506106d8565b60008484015250505050565b6000601f19601f8301169050919050565b600061071b826106b9565b61072581856106c4565b93506107358185602086016106d5565b61073e816106ff565b840191505092915050565b600061ffff82169050919050565b61076081610749565b82525050565b600060408201905081810360008301526107808185610710565b905061078f6020830184610757565b9392505050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6107d3826106ff565b810181811067ffffffffffffffff821117156107f2576107f161079b565b5b80604052505050565b600061080561063c565b905061081182826107ca565b919050565b600080fd5b600080fd5b600080fd5b600067ffffffffffffffff8211156108405761083f61079b565b5b610849826106ff565b9050602081019050919050565b82818337600083830152505050565b600061087861087384610825565b6107fb565b90508281526020810184848401111561089457610893610820565b5b61089f848285610856565b509392505050565b600082601f8301126108bc576108bb61081b565b5b81356108cc848260208601610865565b91505092915050565b6108de81610749565b81146108e957600080fd5b50565b6000813590506108fb816108d5565b92915050565b60006040828403121561091757610916610796565b5b61092160406107fb565b9050600082013567ffffffffffffffff81111561094157610940610816565b5b61094d848285016108a7565b6000830152506020610961848285016108ec565b60208301525092915050565b60006020828403121561098357610982610646565b5b600082013567ffffffffffffffff8111156109a1576109a061064b565b5b6109ad84828501610901565b91505092915050565b600080604083850312156109cd576109cc610646565b5b60006109db85828601610677565b925050602083013567ffffffffffffffff8111156109fc576109fb61064b565b5b610a0885828601610901565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610a5957607f821691505b602082108103610a6c57610a6b610a12565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610aac82610650565b915063ffffffff8203610ac257610ac1610a72565b5b600182019050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302610b2f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610af2565b610b398683610af2565b95508019841693508086168417925050509392505050565b6000819050919050565b6000610b76610b71610b6c84610608565b610b51565b610608565b9050919050565b6000819050919050565b610b9083610b5b565b610ba4610b9c82610b7d565b848454610aff565b825550505050565b600090565b610bb9610bac565b610bc4818484610b87565b505050565b5b81811015610be857610bdd600082610bb1565b600181019050610bca565b5050565b601f821115610c2d57610bfe81610acd565b610c0784610ae2565b81016020851015610c16578190505b610c2a610c2285610ae2565b830182610bc9565b50505b505050565b600082821c905092915050565b6000610c5060001984600802610c32565b1980831691505092915050565b6000610c698383610c3f565b9150826002028217905092915050565b610c82826106b9565b67ffffffffffffffff811115610c9b57610c9a61079b565b5b610ca58254610a41565b610cb0828285610bec565b600060209050601f831160018114610ce35760008415610cd1578287015190505b610cdb8582610c5d565b865550610d43565b601f198416610cf186610acd565b60005b82811015610d1957848901518255600182019150602085019450602081019050610cf4565b86831015610d365784890151610d32601f891682610c3f565b8355505b6001600288020188555050505b505050505050565b6000610d5682610608565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610d8857610d87610a72565b5b600182019050919050565b7f596f7520646f6e27742068617665207065726d697373696f6e00000000000000600082015250565b6000610dc96019836106c4565b9150610dd482610d93565b602082019050919050565b60006020820190508181036000830152610df881610dbc565b9050919050565b6000610e0a82610608565b915060008203610e1d57610e1c610a72565b5b60018203905091905056fea26469706673582212202282898e708851731428cc6f005dbfd92d4bfd406ac22c4e684cdd2fdedc4d2664736f6c63430008180033";

type BookDatabaseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BookDatabaseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BookDatabase__factory extends ContractFactory {
  constructor(...args: BookDatabaseConstructorParams) {
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
      BookDatabase & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BookDatabase__factory {
    return super.connect(runner) as BookDatabase__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BookDatabaseInterface {
    return new Interface(_abi) as BookDatabaseInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): BookDatabase {
    return new Contract(address, _abi, runner) as unknown as BookDatabase;
  }
}
