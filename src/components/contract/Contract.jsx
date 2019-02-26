import React from 'react';

function Contract(props) {
  console.log("props from contract: ", props)
  if (props.tokenAmount === null) {
    return (<p className="center">Loading...</p>);
  }
  return (
    <div className="container">
      <div className="row">
        <h3>Token Amount....</h3>
        <p>=> {props.tokenAmount}</p>
      </div>
    </div>
  )
}

export default Contract;
