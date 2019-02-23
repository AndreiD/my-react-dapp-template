import React from 'react';

const Contact = () => {
  return (
    <div className="container">
      <h4 className="center">Contact</h4>



      <div className="section">


        <div className="row">

          <h2 className="title">Thank you</h2>

          <div className="content">
            <h5>Thank you for contacting us.</h5>
          </div>

        </div>


        <div className="col s12 l6">

          <div className="card-panel red white-text">Your email is required.</div>
          <form method="POST" className="card-panel" id="suggest-form">

            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" name="email" className="validate" value="" />
                <label for="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input pid="name" type="text" name="name" className="validate" value="" />
                <label for="name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="city" type="text" name="shop_city" className="validate" value="" />
                <label for="city">Message</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 right-align">
                <button className="btn-large green" type="submit" name="action" value="suggests">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Contact;
