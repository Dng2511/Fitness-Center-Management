import axios from "axios";

const API_URL = "http://172.20.10.6:2701/api/v1/";

export const post = async (url, data) => {
  return axios.post(API_URL + url, data);
};

export const get = async (url) => {
  return axios.get(API_URL + url);
};

export const deleteMethod = async (url) => {
  return axios.delete(API_URL + url);
}
