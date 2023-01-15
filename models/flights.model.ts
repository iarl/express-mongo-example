import { Schema, model } from "mongoose"

const schema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    originId: {
        type: Number,
        required: true
    },
    destinationId: {
        type: Number,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    airplaneId: {
        type: Number,
        required: true
    }
})

export default model('Flights', schema)