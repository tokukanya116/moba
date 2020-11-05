const express = require('express');
const app = express();

// 使用跨域中间件
app.use(require('cors')())
app.use(express.json())
// 服务器挂在json解析

//将模块引用（因为是一个函数所以还需要传参）
require('./plugins/db')(app);
require('./routes/admin')(app);

app.listen(3000,()=>{
    console.log('已监听端口3000')
});
