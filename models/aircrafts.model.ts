import { Schema, model } from "mongoose"
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const schema = new Schema({
    id: {
        type: Number,
        required: [true, 'Aircraft id is required'],
        unique: true
    },
    year: {
        type: Number
    },
    company: {
        type: String,
        required: [true, 'Aircraft company is required']
    },
    model: {
        type: String,
        required: [true, 'Aircraft model is required']
    },
    first_class_seats: {
        type: Number
    },
    economy_class_seats: {
        type: Number
    }
})

schema.plugin(beautifyUnique)

export default model('Aircraft', schema)