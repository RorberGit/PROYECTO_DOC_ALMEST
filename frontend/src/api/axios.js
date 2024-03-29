import axios from "axios";
import { RoutesURLRoot } from "../contants";

export default axios.create({
  baseURL: RoutesURLRoot.APIURL,
});

export const axiosToken = axios.create({
  baseURL: RoutesURLRoot.APIURL,
  headers: { "Content-Type": "application/json" },
});
