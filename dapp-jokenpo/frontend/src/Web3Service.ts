import Web3, { Address, Contract } from "web3";
import ABI from './abi.json'


type LoginResult = {
    account: string;
    isAdmin: boolean;

}

export type Dashboard = {
    bid?: string;
    address?: string;
    commission?: number;
}

export type Player = {
    wallet: string;
    wins: bigint
}

export type Leaderboard = {
    players?: Player[];
    result?: string;
}

export enum Options {
    NONE = 0,
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3
}

const ADAPTER_ADDRESS = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;

function getWeb3(): Web3 {
    if (!window.ethereum) {
        throw new Error('No Metamask found.');
    }

    return new Web3(window.ethereum);
}

function getContract(web3?: Web3): Contract<[]> {
    if (!web3) {
        web3 = getWeb3();
    }
    return new web3.eth.Contract(ABI, ADAPTER_ADDRESS, { from: localStorage.getItem("account") || undefined });
}

export async function doLogin(): Promise<LoginResult> {

    const web3 = getWeb3();

    const accounts = await web3.eth.requestAccounts();

    if (!accounts || !accounts.length) {
        throw new Error("Wallet not found/allowed.")
    }

    const contract = getContract(web3);

    const ownerAddress = (await contract.methods.owner().call()) as string;
    const isAdmin = web3.utils.hexToString(accounts[0]) === web3.utils.hexToString(ownerAddress);

    localStorage.setItem("account", accounts[0]);
    localStorage.setItem("isAdmin", `${isAdmin}`);

    return {
        account: accounts[0],
        isAdmin
    } as LoginResult
}

export async function getDashboard(): Promise<Dashboard> {
    const contract = getContract();
    const address = await contract.methods.getImplementationAddress().call<Address>();

    if (/^(0x0+)$/.test(address)) {
        return {
            bid: Web3.utils.toWei("0.01", "ether"),
            commission: 10,
            address
        } as Dashboard;
    }
    const bid = await contract.methods.getBid().call<string>();
    const commission = await contract.methods.getCommission().call<string>();

    return { bid: Web3.utils.toWei(bid, "wei"), commission: parseInt(commission), address } as Dashboard;
}

export async function upgrade(newContract: string): Promise<string> {
    const contract = getContract();

    const tx = await contract.methods.upgrade(newContract).send();

    return tx.transactionHash;
}


export async function setComission(newComission: number): Promise<string> {
    const contract = getContract();
    const tx = await contract.methods.setComission(newComission).send();

    return tx.transactionHash;
}

export async function setBid(newBid: string): Promise<string> {
    const contract = getContract();
    const tx = await contract.methods.setBid(newBid).send();

    return tx.transactionHash;
}

export function doLogout() {
    localStorage.removeItem("account");
    localStorage.removeItem("isAdmin");
}

export function isAuthenticated() {
    return localStorage.getItem("account") != null;
}

export function isAdmin() {
    return localStorage.getItem("isAdmin") === "true";
}


export async function play(Option: Options): Promise<string>{
    const web3 = getWeb3();
    const contract = getContract(web3);

    const bid = (await contract.methods.getBid().call()) as string;
    const tx = await contract.methods.play(Option).send({
        value: bid 
    });

    return tx.transactionHash;
}

export async function getResult(): Promise<string>{
    const web3 = getWeb3();
    const contract = getContract(web3);

    return  await contract.methods.getResult().call();
}

export async function getLeaderBoard(): Promise<Leaderboard> {
    const web3 = getWeb3();
    const contract = getContract(web3);

    const players = await contract.methods.getLeaderboard().call();
    const result = await await contract.methods.getResult().call();

    return {
        players,
        result
    } as Leaderboard;
}


export async function getBestPlayers(): Promise<Player[]> {
    const web3 = getWeb3();
    const contract = getContract(web3);

    return await contract.methods.getLeaderboard().call();

}



export function listenEvent(callback: Function){
    
    const web3 = new Web3(`${process.env.REACT_APP_WEBSOCKET_SERVER}`);
    const contract = getContract(web3);

    contract.events.Played({fromBlock: 'latest'}).on("data", (event: any)=> callback(event.returnValues.result));
}