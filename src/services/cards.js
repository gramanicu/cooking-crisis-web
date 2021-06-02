/**
 * This file has functions for all the cards API`s
 */

import axios from "axios"
import { http_root } from "../assets/constants/_constants"

const instance = axios.create({
    baseURL: http_root,
    timeout: 20000,
})

/**
 * GET ../cards/view
 * Get all the cards in the game
 * @returns The array of cards
 */
export async function getUserStatus() {
    try {
        const res = await instance.get(`cards/view`)

        if (res.data.res_status == "error") {
            return undefined
        }

        return res.data.data
    } catch (err) {
        return undefined
    }
}

/**
 * GET ../cards/view/:card_id
 * Get a card with a specific id
 * @param {String} card_Id The id of the card
 * @returns The array of cards
 */
export async function getUserStatus(card_id) {
    try {
        const res = await instance.get(`cards/view/${card_id}`)

        if (res.data.res_status == "error") {
            return undefined
        }

        return res.data.data
    } catch (err) {
        return undefined
    }
}
