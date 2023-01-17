import { Schema, model } from "mongoose"


const schema = new Schema({
    username: {
        type: String,
        unique: true,
        //
        validate: {
            validator: (v: any) => {
                //return /\d{3}-\d{3}-\d{4}/.test(v)
                return /^[a-zA-z]([._-](?![._-])|[a-zA-Z0-9]){6,12}[a-zA-z]$/.test(v)
            },
            message: (props: any) => {
                return `${props.path} must have length 6-12, starts and ends with alphabetic, contains alphanumeric symbols and [._-], got '${props.value}'`
        },
        required: [true, 'Username is required']
        }
    },
    hashedPw: {
        type: String,
        required: [true, 'Password is required']
    },
    accessToken: {
        type: String
    }
})

export default model('User', schema)