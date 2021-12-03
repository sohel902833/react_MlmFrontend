import axios from "axios";
import { url as baseUrl } from "./URL";
export const axiosPost = async (url, token, body) => {
  let data = {};
  const hitUrl = `${baseUrl}${url}`;
  await axios
    .post(hitUrl, body, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      data = res;
    })
    .catch((err) => {});
  return data;
};
export const axiosPut = async (url, token, body) => {
  let data = {};
  const hitUrl = `${baseUrl}${url}`;
  await axios
    .put(hitUrl, body, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      data = res;
    })
    .catch((err) => {});
  return data;
};
export const axiosDelete = async (url, token, body) => {
  let data = {};
  const hitUrl = `${baseUrl}${url}`;
  console.log(hitUrl);
  await axios
    .delete(hitUrl, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      data = res;
    })
    .catch((err) => {});
  return data;
};
export const axiosGet = async (url, token) => {
  let data = {};
  const hitUrl = `${baseUrl}${url}`;
  await axios
    .get(hitUrl, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      data = res;
    })
    .catch((err) => {});
  return data;
};
