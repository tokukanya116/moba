module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require('../../models/Category');
    //子路由用于保存接口方法
    // 新增
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body);
        res.send(model);
    });
    // 修改
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success:true
        });
    });
    // 获取(查找)
    router.get('/categories', async (req, res) => {
        // 限制查找10条数据
        const items = await Category.find().limit(10);
        res.send(items);
    });
    // 获取编辑当前选中id
    router.get('/categories/:id', async (req, res) => {
        // 限制查找10条数据
        const items = await Category.findById(req.params.id);
        res.send(model);
    })
    //使用子路由并挂载子路由
    app.use('/admin/api', router);
}