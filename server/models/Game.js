const { Schema, model } = require('mongoose');

// add ref to singleGame page. 
const gameSchema = new Schema(
    {
        gameName: {
            type: String,
            require: true,
        },

        date: {
            type: String, 
            default: Date.now
        }, 

        time: {
            type: String,
            require: true,
        },

        sport: {
            type: String,
            required: true,
        }, 

        number_of_players: {
            type: String, 
            min: 1, 
            max: 10
        },

        skill_level: {
            type: String,
            required: true,
        }, 

        location: {
            type: String,
            required: true,
        }, 

        gameCreator: {
            type: String,
            required: true,
        },

        joinedUsers: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          ],
    }, 
     
);

const Game = model('Game', gameSchema);

module.exports = Game;