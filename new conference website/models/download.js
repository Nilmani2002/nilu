const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
    download: String,
    link: String
});
const Download = mongoose.model('download', downloadSchema);

module.exports = Download;