const { Schema, model } = require('mongoose');
const Schema = mongoose.Schema

const gameSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }, 

        game: {
            type: String, 
            enum: ['Basketball', 'Soccer', 'Arm Wresting'], 
            default: 'Basketball'
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