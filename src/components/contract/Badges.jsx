import React from 'react';

function Badges(props) {
  console.log("props from badges: " + props.badges)
  return (
    <div className="container">
      <div className="row">
        <h3>Badges here....</h3>
        <p>{props.badges}</p>
      </div>
    </div>
  )
}

export default Badges;
