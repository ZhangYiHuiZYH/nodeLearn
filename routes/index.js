const router = require('koa-router')()
const fs = require('fs-extra')

router.get('/', async (ctx, next) => {
  let exists = fs.exists('D:\tal\shuangshi-blackboard/log.log')
  console.info(exists)
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
