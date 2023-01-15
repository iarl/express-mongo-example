import { Schema, model } from "mongoose"


const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPw: {
        type: String,
        required: true
    }
})

export default model('User', schema)