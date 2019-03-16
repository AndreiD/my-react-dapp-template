import React from 'react';

class SplashModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
    }
  }

  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };

  render() {
    if (!this.state.isShow) {
      return null;
    }

    return (
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col s12">
          <div className="card-panel green darken-4 z-depth-0">
            <div className="card-content white-text">
              <span className="card-title"><i className="material-icons circle left">info_outline</i>CONNECT YORU WALLET</span>
              <p>This is a secure way to access your wallet.
MetaMask is a browser extension that allows you to access your wallet quickly, safely & easily. It is more secure because you never enter your private key on a website. It protects you from phishing & malicious websites.</p>
              <div className="card-action">
                <button className="btn primary">CONNECT METAMASK</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default SplashModal;
