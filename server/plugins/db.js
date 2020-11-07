
module.exports = app => {
    const mongoose = require('mongoose')
    // mongodb默认设置
    mongoose.connect('mongodb://127.0.0.1:27017/moba',{
        useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false
    })
}