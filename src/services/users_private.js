/**
 * This file has functions for all the private user API`s
 */

import axios from "axios"
import { http_root } from "../../assets/constants/_constants"

const instance = axios.create({
    baseURL: http_root,
    timeout: 20000,
})

/**
 * GET ../users/account
 * Get the account data for a user
 * @param {String} jwt_acc The access token
 * @returns The account data for the user
 */
export async function getAccountData(jwt_acc) {
    try {
        const res = await instance.get("users/status/", {
            headers: {
                Authorization: `Bearer ${jwt_acc}`,
            },
        })

        if (res.data.res_status == "error") {
            return undefined
        }

        return res.data
    } catch (err) {
        return undefined
    }
}

/**
 * PATCH ../users/password
 * Change the password for a user
 * @param {String} jwt_acc The access token
 * @param {String} old_pwd The old password
 * @param {String} new_pwd The new password
 * @returns If the password was changed
 */
export async function changePassword(jwt_acc, old_pwd, new_pwd) {
    try {
        // If req fails, it will enter "catch"
        const res = await instance.patch(
            "users/password",
            {
                old_password: old_pwd,
                new_password: new_pwd,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt_acc}`,
                },
            }
        )

        if (res.data.res_status == "error") {
            return false
        }

        return true
    } catch {
        return false
    }
}

/**
 * PATCH ../users/signout
 * Signs a user out
 * @param {String} jwt_acc The access token
 * @param {String} jwt_ref The refresh token
 * @returns If the user was signed out
 */
export async function signOut(jwt_acc, jwt_ref) {
    try {
        // If req fails, it will enter "catch"
        const res = await instance.patch(
            "users/signout",
            {
                refresh_token: jwt_ref,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt_acc}`,
                },
            }
        )

        if (res.data.res_status == "error") {
            return false
        }

        return true
    } catch {
        return false
    }
}
