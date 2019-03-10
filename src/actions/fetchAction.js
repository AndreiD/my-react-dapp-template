import axios from 'axios';
import Web3 from "web3";


const baseUrl = 'https://api.github.com/users/';


export const received_error = (data) => {
  return {
    type: "RECEIVED_ERROR",
    data
  };
};

export const fetchedData = (data) => {
  return {
    type: "FETCHED_ETH_DATA",
    data
  }
};

export const getEthBalance = (username) => {
  return (dispatch) => {
    console.log(Web3)


    return axios.get(baseUrl + username)
      .then(response => {
        console.log('response in fetch', response)
        if (response.data.message === "Not Found") {
          dispatch(received_error("No such user found!"))
        } else {
          dispatch(fetchedData(response.data))
        }
      })
      .catch(error => {
        dispatch(received_error(error.toString()))
        throw (error);
      });
  };
};
