import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://hotel-managment-server-ten.vercel.app",
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
