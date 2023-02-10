const mongoose = require('mongoose');

const inspirationSchema = new mongoose.Schema({
    inspiration: String
});
const Inspiration = mongoose.model('inspiration', inspirationSchema);

module.exports = Inspiration;