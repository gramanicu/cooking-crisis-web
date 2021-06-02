/**
 * This file has functions for all the friends API`s
 */

import axios from "axios"
import { http_root } from "../../assets/constants/_constants"

const instance = axios.create({
    baseURL: http_root,
    timeout: 20000,
})

/**
 * GET ../friends/list
 * Get all the friends of a user
 * @param {String} jwt_acc The access token
 * @returns The friend list
 */
export async function getFriendList(jwt_acc) {
    try {
        const res = await instance.get("friends/list", {
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
 * POST ../friends/add/:username
 * Add a user as a friend
 * @param {String} jwt_acc The access token
 * @param {String} username The IGN of the other user
 * @returns If the request was sent
 */
export async function sendFriendRequest(jwt_acc, username) {
    try {
        const res = await instance.post(
            `friends/add/${username}`,
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
 * PUT ../friends/answer
 * Respond to a friend request
 * @param {String} jwt_acc The access token
 * @param {String} req_id The id of the friend request
 * @param {Boolean} accept If the request is accepted
 * @returns If the operation was successful
 */
export async function answerFriendRequest(jwt_acc, req_id, accept) {
    const answer = accept ? "accept" : "deny";

    try {
        const res = await instance.put(
            "friends/answer",
            {
                request_id: req_id,
                answer: answer
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
 * GET ../friends/requests
 * Get all the friend requests of a user
 * @param {String} jwt_acc The access token of the user
 * @returns The incoming friend requests
 */
export async function getFriendRequests(jwt_acc) {
    try {
        const res = await instance.get("friends/requests", {
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
 * DELETE ../friends/remove/:link_id
 * Remove a friend, using the "friendship id"
 * @param {String} jwt_acc The access token
 * @param {String} link_id The id of the relationship
 * @returns If the operation was successful
 */
 export async function removeFriend(jwt_acc, link_id) {
    try {
        const res = await instance.delete(`friends/remove/${link_id}`, {
            headers: {
                Authorization: `Bearer ${jwt_acc}`,
            },
        })

        if (res.data.res_status == "error") {
            return false
        }

        return true
    } catch (err) {
        return false
    }
}


