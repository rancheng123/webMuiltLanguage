const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
var router = new Router();
var fs = require('fs')
var path = require('path')
app.use(router.routes());
app.use(router.allowedMethods());
router.get('/requestLanguagePack.js', async (ctx) => {

    var languageType = ctx.request.url.split('?')[1].split(('='))[1]


    var res = fs.readFileSync(
        path.resolve(__dirname,'./languages/'+ languageType +'/data.json'),
        'utf-8'
    )
    console.log(res.toString())

    ctx.body = `window.languagePack = ${res}`;
})


app.listen(8377, () => {
    console.log('koa starts at port 8377!');
})
