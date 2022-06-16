import React, { useState, useEffect } from "react";
import "./styles.css";
import { getNft, transferNft } from './components/interact';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { CSVLink, CSVDownload } from "react-csv";
import NFTCard from './NFTCard';

export default function App() {
  const [nftList, setNftList] = useState([]);
  const [boughtNft, setBoughtNft] = useState([["name", "description", "image", "tokenId"]]);
  const [tokenId, setTokenId] = useState([]);
  var content = '';

  useEffect(() => {
    getMintedNft();
  }, []);

  const getMintedNft = async () => {
    const res = await getNft();
    setNftList(res);
  }

  const buyClick = (data, index) => {
    var selectedNft = [data.name, data.description, data.image, index + 1];
    const temp = [...boughtNft, selectedNft];
    // console.log('temp - ', temp);
    setBoughtNft([...temp]);

    const tempId = [...tokenId, index + 1];
    console.log('tempId - ', tempId);
    setTokenId([...tempId]);
  }

  const transferClick = () => {
    transferNft(tokenId);
  }

  content =
    <Row md={5} className="g-4 mb-5">
      {nftList.map((data, index) => {
        return (
          <NFTCard key={index} index = {index} data={data}
            boughtNft={boughtNft} setBoughtNft={setBoughtNft}
            tokenId={tokenId} setTokenId={setTokenId} />
        )
      })}
    </Row>

  return (
    <div className="App p-5">
      <h2 className='text-center mb-5'>
        Please click buy button to add item to transfer list and click process button to transfer!
      </h2>
      {content}
      <div className='d-flex justify-content-between'>
        <CSVLink data={boughtNft}>Export as CSV</CSVLink>
        <Button variant="primary" onClick={() => transferClick()}>
          Transfer
        </Button>
      </div>
    </div>
  );
}
