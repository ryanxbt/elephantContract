var Web3 = require("web3");
var axios = require('axios');

var web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax-test.network/ext/bc/C/rpc'));
console.log(web3);

const getTokenID = (ipfsLink) => {
  const parts = ipfsLink.split("/");
  if (parts.length > 3) {
    const json = parts[parts.length - 1].split(".");
    return json[json.length - 2];
  } else {
    return null;
  }
};

export const getNft = async () => {
  // if (window.ethereum) {
  //   window.web3 = new Web3(window.ethereum);
  //   window.ethereum.enable();
  // } else if (window.web3) {
  //   window.web3 = new Web3(window.web3.currentProvider);
  // } else {
  //   window.alert(
  //     "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //   );
  // }
  // var web3 = window.web3;
  const Arkius = require("../assets/abi/Arkius.json");
  console.log(Arkius.abi);
  const contractAddress = web3.utils.toChecksumAddress(
    process.env.REACT_APP_CONTRACT_ADDRESS_TESTNET
  );
  const contract = new web3.eth.Contract(Arkius.abi, contractAddress);
  
  const totalAmount = await contract.methods.totalToken().call();

  var nftList = [];
  var nftItem = '';
  for(let i = 1 ; i <= totalAmount ; i++){
    const ownerAddress = await contract.methods.ownerOf(i).call();
    if(ownerAddress === "0x791A6891cd4802200AA2cFfAc6770041B5ab643e"){
      nftItem = await contract.methods.tokenURI(i).call();
      // console.log('nftItem - ', nftItem);
      const tokenID = getTokenID(nftItem);
      // console.log('tokenID - ', tokenID);
      await axios.get(nftItem).then(res => {
        res.data["tokenID"] = tokenID;
        // console.log(res.data);
        nftList.push(res.data);
      });
    }    
  }

  // console.log('nftList - ', nftList);

  return nftList;
};

export const transferNft = async (tokenId) => {
  console.log('tokenId - ', tokenId);

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
  var web3 = window.web3;

  const Arkius = require("../assets/abi/Arkius.json");
  const contractAddress = web3.utils.toChecksumAddress(
    process.env.REACT_APP_CONTRACT_ADDRESS_TESTNET
  );
  const contract = new web3.eth.Contract(Arkius.abi, contractAddress);

  for(let i = 0 ; i < tokenId.length; i++ ){
    // const res = await contract.methods.approve('0xfeb63a01ca567d867a302b7efd2e622b0e33f2af', tokenId[i]).send({from: "0x294Fa0cd606feF90209f0d9154821D92FCB32580"});
    // console.log('address - ', tokenId[i][0]);
    // console.log('tokenId - ', tokenId[i][1]);

    const res = await contract.methods.transferFrom("0x791A6891cd4802200AA2cFfAc6770041B5ab643e", tokenId[i][0], tokenId[i][1])
      .send({from: "0x791A6891cd4802200AA2cFfAc6770041B5ab643e"});
    console.log('res - ', res);
  }
}