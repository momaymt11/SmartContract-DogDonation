import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const ADDRESS = "0xa9C0b1aF507c6A9585755e4acB462fD8BAbA85Ce";
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
    name: "getDog",
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
        ],
        internalType: "struct donation.Dog[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let meta_connect;
function App() {
  const [donate, setDonate] = useState(0);
  const [dogs, setDogs] = useState([]);

  async function mataconnect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const singer = provider.getSigner();
    meta_connect = new ethers.Contract(ADDRESS, ABI, singer);
    console.log("Connected :", meta_connect);
    getDogs();
  }

  async function getDogs() {
    let res = await meta_connect.getDog();
    setDogs(res);
    console.log(res);
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

  useEffect(() => {
    mataconnect();
  }, []);
  return (
    <div style={{ background: "whitesmoke", height: "100vh" }}>
      <center>
        <h1>Dog Donation</h1>
        <br />
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
                // height: "150px",
                flex: 1,
                padding: "5px",
              }}
              key={items}
            >
              <h3> name : {items[1]} </h3>
              <h4> city : {items[2]} </h4>
              <h5> note : {items[3]} </h5>
              <img src={items[4]} height="150" />
            </div>
          ))}
        </div>

        <br />
        <button
          onClick={() => {
            getDogs();
          }}
        >
          getDogs
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
          doDonation
        </button>
        <br />
      </center>
    </div>
  );
}

export default App;
