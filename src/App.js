import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const ADDRESS = "0x10e1bc34ae1a5c3a70c0cb59e6457ceb0a4dd9e9";
const ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "city",
        type: "string",
      },
      {
        internalType: "string",
        name: "note",
        type: "string",
      },
      {
        internalType: "string",
        name: "img",
        type: "string",
      },
    ],
    name: "addDog",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "doDonatetoDog",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "doDonation",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "balance",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Dogs",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "city",
        type: "string",
      },
      {
        internalType: "string",
        name: "note",
        type: "string",
      },
      {
        internalType: "string",
        name: "img",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDogs",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "city",
            type: "string",
          },
          {
            internalType: "string",
            name: "note",
            type: "string",
          },
          {
            internalType: "string",
            name: "img",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct donation.Dog[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let meta_connect;
function App() {
  const [donate, setDonate] = useState(0);
  const [donatetodog, setDonatetodog] = useState(0);
  const [dogs, setDogs] = useState([]);
  const [balance, setbalance] = useState(0);

  async function mataconnect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const singer = provider.getSigner();
    meta_connect = new ethers.Contract(ADDRESS, ABI, singer);
    console.log("Connected :", meta_connect);
    getDog();
  }

  async function getDog() {
    let res = await meta_connect.getDogs();
    let res2 = await meta_connect.balance();
    setDogs(res);
    setbalance(parseInt(res2["_hex"], 16));
    console.log(res2);
  }

  async function doDonations() {
    try {
      let res = await meta_connect.doDonation({
        value: ethers.utils.parseEther(donate),
      });
      console.log(res);
      alert("Donation Success !");
    } catch (error) {
      alert("Error : Pls check your token volume");
    }
  }

  async function doDonationstoDog(id) {
    try {
      let res = await meta_connect.doDonatetoDog(id, {
        value: ethers.utils.parseEther(donatetodog),
      });
      console.log(res);
      alert("Donation Success !");
    } catch (error) {
      alert("Error : Pls check your token volume");
    }
  }

  useEffect(() => {
    mataconnect();
  }, []);
  return (
    <div style={{ background: "whitesmoke", height: "100vh" }}>
      <center>
        <h1>Dog Donation</h1>
        <br />
        <h2>balance : {balance}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {dogs.map((items) => (
            <div
              style={{
                background: "white",
                margin: "8px",
                border: "1px solid gray",
                borderRadius: "8px",
                flex: 1,
                padding: "5px",
              }}
              key={items}
            >
              <h3> name : {items[1]} </h3>
              <h4> city : {items[2]} </h4>
              <h5> note : {items[3]} </h5>
              <h5> donate amount : {parseInt(items[5]["_hex"], 16)} </h5>
              <img src={items[4]} height="150" />
              <br />
              <input
                onChange={(e) => {
                  setDonatetodog(e.target.value);
                }}
              ></input>
              <br />
              <button
                onClick={() => {
                  let id = parseInt(items[0]["_hex"], 16);
                  doDonationstoDog(id);
                }}
              >
                Donate to this dog
              </button>
            </div>
          ))}
        </div>

        <br />
        <button
          onClick={() => {
            getDog();
          }}
        >
          refresh data
        </button>
        <br />
        <input
          onChange={(e) => {
            setDonate(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            doDonations();
          }}
        >
          Donate
        </button>
        <br />
      </center>
    </div>
  );
}

export default App;
