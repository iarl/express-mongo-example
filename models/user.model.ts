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
    },
    accessToken: {
        type: String
    }
})

export default model('User', schema)