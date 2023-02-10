const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    notice: String,
    link: String
});
const Notice = mongoose.model('notice', noticeSchema);

module.exports = Notice;



