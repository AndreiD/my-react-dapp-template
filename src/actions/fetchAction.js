import axios from 'axios';

const baseUrl = 'https://api.github.com/users/';


export const received_error = (data) => {
  return {
    type: "RECEIVED_ERROR",
    data
  };
};

export const fetchedData = (data) => {
  return {
    type: "FETCHED_USER_DATA",
    data
  }
};

export const fetchGithubData = (username) => {
  return (dispatch) => {
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
