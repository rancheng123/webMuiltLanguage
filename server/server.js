const Koa = require('koa');
const app = new Koa();
var fs = require('fs')
var path = require('path')

const Router = require('koa-router');
var router = new Router();

const serve = require('koa-static');
app.use(serve(
    path.resolve(__dirname,'../client'))
);


app.use(router.routes());
app.use(router.allowedMethods());






// 通过jsonp 方式换取语言包
router.get('/requestLanguagePack.js', async (ctx) => {
    var languageType = ctx.request.url.split('?')[1].split(('='))[1]
    var res = fs.readFileSync(
        path.resolve(__dirname,'./languages/'+ languageType +'/data.json'),
        'utf-8'
    )
    console.log(res.toString())
    ctx.body = `window.languagePack = ${res}`;
})



router.get('/api/description', async (ctx) => {
    ctx.body = `你好， 这是后端返回的数据`;
})


app.listen(8377, () => {
    console.log('koa starts at port 8377!');
})
