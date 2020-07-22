//const BASE_URL = (process.env.CHECK === 'LOCAL') ? "http://localhost:3000/" : "https://ezrentbike.azurewebsites.net/";
const BASE_URL = "http://localhost:3000/";

const baseURL = {
    backEndURL: BASE_URL + 'api/',
    backEndURLAvatar: BASE_URL + "asset/avatar/",
    backEndURLImage: BASE_URL + "asset/image/"
}

export default baseURL;