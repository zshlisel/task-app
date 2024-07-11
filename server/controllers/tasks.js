import db from "./db.js";


/**
 * Retrieves all tasks for a specific user that have not been deleted.
 * 
 * @param {number} userId - The ID of the user whose tasks are to be retrieved.
 * @returns {Promise<Array<{id: number, title: string, done: boolean}>>} A promise that resolves to an array of task objects, each containing the task's ID, title, and completion status.
 */
export const getTasks = async (userId) => {
    const result = await db.manyOrNone('select * from task where deleted_at is null and user_id = ${userId}',{userId});
    
    let resArr = result.map(task => ({ id: task.id, title: task.title, done: task.status !== 'active'}));
    return resArr;
}


/**
 * Creates a new task for a specific user.
 * 
 * @param {string} title - The title of the task to be created.
 * @param {number} userId - The ID of the user who owns the task.
 * @returns {Promise<{title: string, done: boolean, id: number}>} A promise that resolves to an object containing the task's title, completion status, and ID.
 */
export const createTask = async (title, userId) => {
    const result = await db.one('insert into task (title, user_id) values (${title}, ${userId}) returning *', {
        title,
        userId
    });
    return {
        title: result.title,
        done: false,
        id: result.id
    }
}


/**
 * Marks a task as complete.
 * 
 * @param {number} id - The ID of the task to be marked as complete.
 * @param {number} userId - The ID of the user who owns the task.
 * @returns {Promise<{ok: boolean, error?: string}>} A promise that resolves to an object indicating the success or failure of the operation.
 */
export const markAsComplete = async (id, userId) => {
    try {
        const result = await db.none("update task set status = 'done' where user_id = ${userId} and id = ${id}", {
            id,
            userId
        })
        return { ok: true };
    } catch (e) {
        console.error(e);
        return { ok: false, error: e.message };
    }
};


/**
 * Marks a task as deleted by setting the deleted_at timestamp.
 * 
 * @param {number} userId - The ID of the user who owns the task.
 * @param {number} id - The ID of the task to be deleted.
 * @returns {Promise<{ok: boolean}>} A promise that resolves to an object indicating the success of the operation.
 */
export const deleteTask = async (userId, id) => {
    await db.none("update task set deleted_at = now() where user_id = ${userId} and id = ${id}", {
        id,
        userId
    })
    return {ok: true};
};