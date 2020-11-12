/*
 * @Author: your name
 * @Date: 2020-11-12 15:27:43
 * @LastEditTime: 2020-11-12 16:48:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \blogc:\Users\Administrator.DESKTOP-19074G5\Desktop\testblog\moba\server\models\Ad.js
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    items: [{
        image: { type: String },
        url: { type: String },
    }]
})

// 导出mongoose模型
module.exports = mongoose.model('Ad', schema)