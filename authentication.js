import axios from "axios";

const BASE_URL = '192.168.1.161/api/auth';

export const Login = async (username, password) => {
    const res = await axios.post(`${BASE_URL}/login`, { username, password });
  return res.data.token;

}


export const SignUp = async(email,username,password) => {
    const res = await axios.post(`${BASE_URL}/signup`, {email, username,password});
    return res.data.token;
}