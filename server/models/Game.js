const { Schema, model } = require('mongoose');

// add ref to singleGame page. 
const gameSchema = new Schema(
    {
        date: {
            type: Date, 
            default: Date.now
        }, 

        time: {
            type: Date, 
            default: Date.now
        },

        sport: {
            type: Array, 
            enum: ['Basketball', 'Soccer', 'Arm Wresting'], 
            default: 'Basketball'
        }, 

        number_of_players: {
            type: Number, 
            min: 1, 
            max: 10
        },

        skill_level: {
            type: Array, 
            enum: ['beginner', 'intermediate', 'advanced']
        }, 

        location: {
            type: Array, 
            enum: ['Eastgate Park - Garden Grove', 'Hart Park - Orange', 'Irvine Park - Irvine']
        }
    }, {
        timestamp: true 
    });

const Game = model('Game', gameSchema);

module.exports = Game;