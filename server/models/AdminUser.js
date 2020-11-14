/*
 * @Author: your name
 * @Date: 2020-11-12 15:27:43
 * @LastEditTime: 2020-11-13 11:34:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blogc:\Users\Administrator.DESKTOP-19074G5\Desktop\testblog\moba\server\models\Ad.js
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String },
    // set用于加密密码(散列加密算法)
    password: {//select:false表示不显示密码
        type: String, 
        select: false, 
        set(val) {
            //hashSync:此模块默认异步,所以要同步处理 10:加密时间,一般10~12
            return require('bcrypt').hashSync(val, 10);
        }
    },
})

// 导出mongoose模型
module.exports = mongoose.model('AdminUser', schema)