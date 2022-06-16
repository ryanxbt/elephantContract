import React, { useState } from "react";
import { Col, Card, ToggleButton } from 'react-bootstrap';

export default function NFTCard(props) {
  const [checked, setChecked] = useState(false);
  const {boughtNft, setBoughtNft, tokenId, setTokenId} = props;
  let temp = [];
  let tempId = [];

  const handleCheck = (e) => {
    setChecked(e.currentTarget.checked);
    if(e.currentTarget.checked){
      var selectedNft = [props.data.name, props.data.description, props.data.image, props.index + 1];
      temp = [...boughtNft, selectedNft];
      console.log('temp - ', temp);
      setBoughtNft([...temp]);
      
      tempId = [...tokenId, props.index + 1];     
      setTokenId([...tempId]);
    }else{

      tempId = tokenId;
      const id = tempId.indexOf(props.index + 1);
      if (id > -1) {
        tempId.splice(id, 1);
      }
      setTokenId([...tempId]);
    }
  }

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={props.data.image} />
        <Card.Body>
          <Card.Title>
            <div className='d-flex justify-content-between'>
              <ToggleButton
                className="mb-2"
                id={"toggle-check" + props.index}
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                value={props.index}
                onChange={(e) => handleCheck(e)}
              >
                {checked ? "Selected" : "Buy"}
              </ToggleButton>

              {props.data.name}
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col >
  )
}