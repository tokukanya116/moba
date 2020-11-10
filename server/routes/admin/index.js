module.exports = app => {
    const express = require('express');
    const router = express.Router({
        // 表示合并url参数,用于各路由访问
        mergeParams: true
    });
    //

    //子路由用于保存接口方法
    // 新增
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    });
    // 修改
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success:true
        });
    });
    // 获取(查找)
    router.get('/', async (req, res) => {
        //动态处理关联字段
        let queryOptions = {}
        // .populate('parent')获取关联ID字段,会直接返回关联的对象
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        // 限制查找10条数据 //
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items);
    });
    // 获取编辑当前选中id
    router.get('/:id', async (req, res) => {
        // 限制查找10条数据
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })
    //使用子路由并挂载子路由 /rest前缀然后用resource全部去动态替代路径
    app.use('/admin/api/rest/:resource', 
    async (req,res,next)=>{ //处理动态模型
        // 转换格式,匹配路由
        const modelName = require('inflection').classify(req.params.resource)
        //动态引入模块
        req.Model = require(`../../models/${modelName}`);
        next()
    },
    router);

    //装备图片上传接口
    const multer = require('multer');
    const upload = multer({dest: __dirname + '/../../uploads'});
    // 表示接受的单个文件上传 upload.single('file')
    app.post('/admin/api/upload',upload.single('file'),async (req,res)=>{
        //获取到的图片sha1码
        const file = req.file;
        //图片的地址拼接
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    })
}