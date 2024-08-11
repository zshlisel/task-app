import db from "../controllers/db.js";

/**
 * Updates the name of a user with the given userId.
 * @param {number} userId - The ID of the user.
 * @param {string} newName - The new email to set.
 * @returns {Promise<{ok: boolean}>} A promise that resolves to an object indicating the success of the operation.
 */
export const updateUserName = async (userId, newName) => {
    try {
        const result = await db.none('update person set name = ${} where id = ${userId},', {
            userId,
            newName
        })
        return result;
    } catch (e) {
        console.error('error updating name', e)
    }
}

export const uploadPhoto = async (url, userId) => {
    try {
        const result = await db.none('update person set photo_url = ${url} where id = ${userId}',{url, userId})
        return {ok: true}
    } catch (e) {
        console.error('error uploading profile photo', e)
    }
}