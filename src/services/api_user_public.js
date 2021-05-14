import axios from "axios"
import { http_root } from "../assets/constants/_constants"

const instance = axios.create({
    baseURL: http_root,
    timeout: 20000,
})

/**
 * GET ../users/exists/:username
 * Check the status of a user
 * @param {String} name The name of the user
 */
export async function getUserStatus(name) {
    try {
        const res = await instance.get("users/status/" + name)
        if (res.data.res_status == "success") {
            return res.data.status
        } else {
            return 0
        }
    } catch (err) {
        throw new Error(err)
    }
}

/*
All the public user routes

GET ../users/status/:username
GET ../users/activation/:activation_token
POST ../users/new
POST ../users/signin
GET ../users/token

*/
