import React from 'react';

function UnlockMetamask(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col s6 offset-s3">
          <div className="card-panel center">
            <span className="red-text text-darken-2 flow-text"> {props.message}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnlockMetamask;
