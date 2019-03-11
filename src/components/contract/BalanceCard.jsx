import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function BalanceCard(props) {
  if (props.tokenAmount === null) {
    return null
  }
  return (
    <Card style={{ marginTop: "30px" }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Served from the blockchain
        </Typography>
        <Typography variant="h5" component="h2">
          Total {props.tokenAmount}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default BalanceCard;
