const { Schema, model } = require('mongoose');
const Schema = mongoose.Schema

// add ref to singleGame page. 
const gameSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }, 

        date: {
            type: String, 
            default: Date.now
        }, 

        time: {
            type: String, 
            default: Date.now
        },

        sport: {
            type: String, 
            enum: ['Basketball', 'Soccer', 'Arm Wresting'], 
            default: 'Basketball'
        }, 

        number_of_players: {
            type: Number, 
            min: 1, 
            max: 10
        },

        skill_level: {
            type: String, 
            enum: ['beginner', 'intermediate', 'advanced']
        }, 

        location: {
            type: String, 
            enum: ['Eastgate Park - Garden Grove', 'Hart Park - Orange', 'Irvine Park - Irvine']
        }
    }, {
        timestamp: true 
    });

const Game = model('Game', gameSchema);

module.exports = mongoose.model('Game', gameSchema);