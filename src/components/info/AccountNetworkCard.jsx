import React from 'react';

function AccountNetworkCard(props) {
  if (!props.networkName || !props.selectedAddress) {
    return null;
  }
  // mask account ?
  var maskedAddress = props.selectedAddress.substr(0, 5) + '***' + props.selectedAddress.substr(38, props.selectedAddress.length)
  return (
    <div className="right-align grey-text" style={{ margin: "10px" }}>
      {props.networkName && <span className="card-title"><i className="material-icons left white-text">network_check</i> network: {props.networkName}</span>}
      {maskedAddress && <span><i className="material-icons left white-text">account_box</i> account: {maskedAddress}</span>}
    </div>
  );
}

export default AccountNetworkCard
