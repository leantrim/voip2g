import axios from "axios";

// axios.interceptors.response.use(null(error) => {
//   const expectedError = error.status >= 400 && error.status < 500;

//   if (!expectedError) {
//   }

//   return Promise.reject(error);
// });

function setAuthHeader(jwt: any) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const exportedObject = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAuthHeader,
};

export default exportedObject;
