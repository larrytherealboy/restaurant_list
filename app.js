//  載入套件
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// 載入自訂連接埠、主路由
const port = 3000
const routes = require('./routes')


// 載入mongoose連線設定
require('./config/mongoose')


const app = express()

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static_files, body-parser, method-override
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// 引用路由器
app.use(routes)


// start and listening express server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})