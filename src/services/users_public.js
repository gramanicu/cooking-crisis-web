/**
 * This file has functions for all the public user API`s
 */

import axios from "axios"
import { http_root } from "../assets/constants/_constants"

const instance = axios.create({
    baseURL: http_root,
    timeout: 20000,
})

/**
 * GET ../users/status/:username
 * Check the status of a user
 * @param {String} name The name of the user
 * @returns The status of a user (as a number)
 */
export async function getUserStatus(name) {
    try {
        const res = await instance.get(`users/status/${name}`)
        return res.data.status
    } catch (err) {
        return 0
    }
}

/**
 * GET ../users/exists/:username
 * Check if a user with the specified name exist
 * @param {String} name The searched name
 * @returns If the user exists (that name is used)
 */
export async function doesUserExist(name) {
    try {
        // If req fails, it will enter "catch"
        await instance.get(`users/exists/${name}`)
        return true
    } catch {
        return false
    }
}

/**
 * POST ../users/token
 * Use the refresh token to get a new access JWT
 * @param {String} refreshToken The refresh token
 * @returns An access JWT and it's ttl
 * (jwt_access_token and access_expiry)
 */
export async function getAccessToken(refreshToken) {
    try {
        const res = await instance.get(`users/token/${refreshToken}`)

        return {
            jwt_access_token: res.data.jwt_access_token,
            access_expiry: res.data.access_expiry,
        }
    } catch {
        return undefined
    }
}

/**
 * GET ../users/activation/:activation_token
 * Activate an account using the activation token (provided in the activation link)
 * @param {String} activation_token The activation token
 * @returns If the account was successfully activated
 */
export async function activateAccount(activation_token) {
    try {
        await instance.get(`users/token/${activateAccount}`)
        return true
    } catch (err) {
        return false
    }
}

/**
 * POST ../users/signin
 * Sign a user in, using the IGN (username) and password
 * @param {String} username The name of the user (IGN)
 * @param {String} password The password of the user
 * @returns Sign in info (jwt_access_token, jwt_refresh_token, access_expiry)
 */
export async function signIn(username, password) {
    try {
        const res = await instance.post("users/signin", {
            username: username,
            password: password,
        })

        if (res.data.res_status == "success") {
            return {
                jwt_access_token: res.data.jwt_access_token,
                jwt_refresh_token: res.data.jwt_refresh_token,
                access_expiry: res.data.access_expiry,
            }
        } else {
            return undefined
        }
    } catch (err) {
        return undefined
    }
}

/**
 * POST ../users/new
 * Create a new user account
 * @param {String} username The name of the user (IGN)
 * @param {String} email The email address of the user
 * @param {String} password The password of the user
 * @returns If the account was created
 */
export async function signUp(username, email, password) {
    try {
        await instance.post("users/new", {
            username: username,
            email: email,
            password: password,
        })

        return true
    } catch (err) {
        return false
    }
}
