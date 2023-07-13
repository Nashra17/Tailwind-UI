const fs = require("fs/promises");

const addToDb = async (data, path) => {
    try {
        const dbData = await fs.readFile(path, "utf8");
        const parsedData = JSON.parse(dbData);
        parsedData.push(data);
        await fs.writeFile(path, JSON.stringify(parsedData));
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

module.exports.addToDb = addToDb;

const jwt = require('jsonwebtoken')
const secret = "TOP_SECRET*@(#($@#"

module.exports.generateToken = (payload)=>{
    return jwt.sign(payload,secret,{
        expiresIn:'1h'
    })
}

module.exports.verifyToken = (token)=>{
    try {
        const payload = jwt.verify(token,secret)
        return payload
    } catch (error) {
        console.log(error)
        return null
    }
}