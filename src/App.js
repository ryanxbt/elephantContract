import React, { useState, useEffect } from "react";
import "./styles.css";
import { getNft, transferNft } from './components/interact';
import { Button } from 'react-bootstrap';
import Papa from "papaparse";

export default function App() {
  const [tokenId, setTokenId] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tempArray = [];

  useEffect(() => {
    getMintedNft();
  }, []);

  const getMintedNft = async () => {
    // const res = await getNft();
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
  }

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
