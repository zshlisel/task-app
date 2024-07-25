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

export async function verifyPassword(password, hashedPassword) {
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