import { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider";

const AxiousSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
const UseAxiousSecure = () => {
  const { OUT } = useContext(AuthContext);
  useEffect(() => {
    AxiousSecure?.interceptors?.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error tracked in the interceptor", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("logout the user");
          OUT()
            .then()
            .catch((error) => console.log(error));
        }
      }
    );
  }, [OUT]);

  return AxiousSecure;
};

export default UseAxiousSecure;
