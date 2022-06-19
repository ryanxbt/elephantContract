import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./styles.css";
import { getNft, transferNft } from './components/interact';
import { Button } from 'react-bootstrap';
import Papa from "papaparse";

export default function App() {
  const [csvData, setCsvData] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tempArray = [];
  const [walletDate, setdata] = useState({address: "", Balance: null});

  useEffect(() => {
    getMintedNft();
  }, []);

  const getMintedNft = async () => {
    // const res = await getNft();
    console.log('aaaa')
    getNft().then(res => {
      setIsLoading(false);
      console.log('res - ', res);
      setNftData(res);
    });    
  }

  const batchClick = () => {
    console.log('csvData - ', csvData);
    csvData.map((data) => {
      if(data[1] !== undefined){
        console.log(data[1]);
        nftData.map((nft) => {
          // console.log('nft - ', nft);
          if(nft.name === data[1]){
            var selectedData = [data[0], nft.tokenID];
            // console.log('selectedData - ', selectedData);
            tempArray.push(selectedData);
            console.log('tempArray - ', tempArray);
            transferNft(tempArray);
          }
        })
      }
    });
    
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => accountChangeHandler(res[0]));
      console.log("metamask");
    } else {
      alert("install metamask extension!");
    }
  };

  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
  
    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });
  
    // Setting a balance
    getbalance(account);
  };

  return (
    <div className="App p-5">
      {isLoading ?
        <>
          <h2 className='text-center mb-5'>
            Loading ...
          </h2>
        </>
      :
        <>
          <h2 className='text-center mb-5'>
            Please click batch process!
          </h2>
          <div className='d-flex justify-content-between'>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => {
                const files = e.target.files;
                // console.log(files);
                if (files) {
                  // console.log(files[0]);
                  Papa.parse(files[0], {
                    complete: function(results) {
                      // console.log("Finished:", results.data);
                      setCsvData(results.data);
                    }}
                  )
                }
              }}
            />
            <Button variant="primary" onClick={() => batchClick()}>
              Batch process
            </Button>
          </div>
        </>
      }     
    </div>
  );
}
