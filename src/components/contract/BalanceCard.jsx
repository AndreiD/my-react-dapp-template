import React from 'react';

function BalanceCard(props) {
  if (props.tokenBalance === null) {
    return null
  }
  return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              from the blockchain
        </span>
            <p>
              Total {props.tokenBalance}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard;
