import React from 'react';

const Contact = () => {
  return (
    <div className="container">
      <h4 className="center">Contact</h4>



      <div className="section">


        <div className="row">

          <h2 class="title">Thank you</h2>

          <div class="content">
            <h5>Thank you for contacting us.</h5>
          </div>

        </div>


        <div class="col s12 l6">

          <div class="card-panel red white-text">Your email is required.</div>
          <form method="POST" class="card-panel" id="suggest-form">

            <div class="row">
              <div class="input-field col s12">
                <input id="email" type="email" name="email" class="validate" value="" />
                <label for="email">Email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input pid="name" type="text" name="name" class="validate" value="" />
                <label for="name">Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="city" type="text" name="shop_city" class="validate" value="" />
                <label for="city">Message</label>
              </div>
            </div>
            <div class="row">
              <div class="col s12 right-align">
                <button class="btn-large green" type="submit" name="action" value="suggests">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Contact;
