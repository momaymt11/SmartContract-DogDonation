import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Input,
  Button,
  InputGroup,
  InputGroupText,
  CardText,
  Progress,
} from "reactstrap";

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
  const [owner, setowner] = useState("");

  async function mataconnect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const singer = provider.getSigner();
    meta_connect = new ethers.Contract(ADDRESS, ABI, singer);
    console.log("Connected :", meta_connect);
    getDog();
    getOwner();
  }

  async function getDog() {
    let res = await meta_connect.getDogs();
    let res2 = await meta_connect.balance();
    setDogs(res);
    setbalance(ethers.BigNumber.from(res2["_hex"]));

    console.log("res2 =>", ethers.utils.formatEther(balance));
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

  async function getOwner() {
    let res = await meta_connect.owner();
    setowner(res);
    console.log("owner =>", res);
  }

  useEffect(() => {
    mataconnect();
  }, []);
  return (
    <div
      style={{
        background: "whitesmoke",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <center style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h1>Dog Donation</h1>
        <br />
        <h2>balance : {ethers.utils.formatEther(balance)} ETH / 1 ETH</h2>
        <Progress
          animated
          color="success"
          value={ethers.utils.formatEther(balance) * 100}
          style={{ width: "45vh" }}
        />
        <Container
          fluid="xl"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {dogs.map((items) => (
            <Card
              style={{
                margin: "10px",
                maxWidth: "230px",
                boxShadow: "1px 5px 10px -1px rgba(0,0,0,0.25)",
                WebkitBoxShadow: "1px 5px 10px -1px rgba(0,0,0,0.25)",
                MozBoxShadow: "1px 5px 10px -1px rgba(0,0,0,0.25)",
              }}
              key={items}
            >
              <CardTitle tag="h5">{items[1]}</CardTitle>
              <img src={items[4]} height="150" />
              <CardBody>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  donate amount :
                  {ethers.utils.formatEther(
                    ethers.BigNumber.from(items[5]["_hex"])
                  )}
                  ETH
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  city : {items[2]}
                </CardSubtitle>
                <CardText>note : {items[3]} </CardText>

                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                ></CardSubtitle>
              </CardBody>

              <br />
              <InputGroup style={{ padding: "10px" }}>
                <Input
                  onChange={(e) => {
                    setDonatetodog(e.target.value);
                  }}
                ></Input>
                <InputGroupText>$</InputGroupText>
              </InputGroup>
              <Button
                style={{ margin: "10px", marginTop: "0px" }}
                color="success"
                outline
                onClick={async () => {
                  let id = parseInt(items[0]["_hex"], 16);
                  await doDonationstoDog(id);
                }}
              >
                Donate
              </Button>
            </Card>
          ))}
        </Container>

        <br />
        <InputGroup style={{ width: "45vh" }}>
          <Input
            onChange={(e) => {
              setDonate(e.target.value);
            }}
          ></Input>
          <Button
            color="success"
            onClick={async () => {
              await doDonations();
            }}
          >
            Donate to Website
          </Button>
        </InputGroup>

        <br />
        <h5>owner : {owner}</h5>
      </center>
    </div>
  );
}

export default App;
