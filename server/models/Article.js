/*
 * @Author:  tokukanya116
 * @Date: 2020-11-12 10:56:27
 * @LastEditTime: 2020-11-12 11:04:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blogc:\Users\Administrator.DESKTOP-19074G5\Desktop\testblog\moba\server\models\Article.js
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    body: { type: String }
})

// 导出mongoose模型
module.exports = mongoose.model('Article', schema)