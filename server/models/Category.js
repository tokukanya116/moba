const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    //mongoose.SchemaTypes.ObjectId代表数据库内的一个关键ID  ref表示关联数据库模型
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

// 导出mongoose模型
module.exports = mongoose.model('Category', schema)