const express = require('express');
const app = express();

//Routes>index => jwt的秘钥设定为全局(*不建议这样写,这里只是简单用用,建议额外添加模块*)
app.set('serect','i2u34y12oi3u4y8')
// 使用跨域中间件
app.use(require('cors')())
// 服务器挂在json解析
app.use(express.json())
// 静态文件托管(让本地文件可以通过/uploads这个接口路径访问到)
app.use('/uploads',express.static(__dirname + '/uploads'));

//将模块引用（因为是一个函数所以还需要传参）
require('./plugins/db')(app);
require('./routes/admin')(app);

app.listen(3000,()=>{
    console.log('已监听端口3000')
});
