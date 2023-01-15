import { Schema, model } from "mongoose"

const schema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    weather: {
        type: String,
    },
    activities: {
        type: String
    }
})

export default model('City', schema)