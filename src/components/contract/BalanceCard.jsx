import React from 'react';

function BalanceCard(props) {
  if (props.tokenAmount === null) {
    return null
  }
  return (
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">
              Served from the blockchain
        </span>

            <p>
              Total {props.tokenAmount}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard;
