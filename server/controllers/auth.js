import db from "./db.js";
import bcrypt from 'bcryptjs';


async function encryptPassword(pass) {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(pass, salt);
        console.log(hash)
        return hash;
    } catch (e) {
        console.error('Error Encrypting Password', e);
        throw e;
    }
}

async function verifyPassword(password, hashedPassword) {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      if (match){
        console.log('match')
      }else{
        console.log('not match')
      }
      return match;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  }




/**
 * Authenticates a user based on their username and password.
 * 
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 * @returns {Promise<{ok: boolean, userId?: number}>} A promise that resolves to an object indicating the authentication result. If successful, it includes the user's ID.
 */
export async function login(username, password) {
    if (typeof username ==='string'){
        console.log('s')
    }else{
        console.log('el')
    }
    try {
        const user = await db.oneOrNone('SELECT * FROM person WHERE name = ${username}', { username });
        console.log('user', user)
        if (user) {
            const verify = await verifyPassword(password, user.pass)
            if (verify) {
                return { ok: true, userId: user.id };
            }
        }
        
        return { ok: false };
    } catch (e) {
        console.error(e);
        throw e;
    }
}


/**
 * Creates a new user in the database.
 * 
 * @param {string} name - The username for the new user.
 * @param {string} pass - The password for the new user.
 * @param {string} email - The email address for the new user.
 * @returns {Promise<{name: string, email: string, userId: number}>} A promise that resolves to an object containing the new user's name, email, and userId.
 */
export async function createUser(name, pass, email) {
    let passHash = await encryptPassword(pass)
    console.log(`${pass} is ${passHash}`)
    const result = await db.one('insert into person (name,email, pass) values (${name},${email}, ${passHash}) returning *', {
        name,
        passHash,
        email
    });
    console.log('result', result)
    return {
        name: result.name,
        email: result.email,
        userId: result.id
    };
}