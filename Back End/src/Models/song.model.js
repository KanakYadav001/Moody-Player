const mongo = require('mongoose');

const SongScema = new mongo.Schema({
    title : String,
    artist : String,
    audio : String,
    mood : String,
})

const song = mongo.model('song',SongScema);

module.exports = song