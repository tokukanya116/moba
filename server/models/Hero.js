const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    // 使用数组形式,保证数据层关联具体数组每一项的id
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: { //六边形数据
        difficult: { type: Number }, //难度
        skills: { type: Number }, //技能
        attack: { type: Number }, //攻击
        survice: { type: Number }, //生存
    },
    skills: [{ //技能数据
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    items1: [
        //装备1,为顺风出装(只要两个关键字段用于检索就好)
        //注意:关连的应该是装备库,而不是英雄->我们可以做到类似装备重复展示
        { type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }
    ],
    items2: [
        //装备2,为顺逆风出装(只要两个关键字段用于检索就好)
        //注意:关连的应该是装备库,而不是英雄->我们可以做到类似装备重复展示
        { type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }
    ],
    usageTips: { type: String }, //使用技巧
    battleTips: { type: String }, //战斗机巧
    teamTips: { type: String }, //团战技巧
    partners: [{ //英雄搭配(由当前英雄引申的,所以要关联ID模型)
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String },
    }],
})

// 导出mongoose模型
module.exports = mongoose.model('Hero', schema)