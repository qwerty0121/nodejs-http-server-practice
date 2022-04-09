const http = require('http')
const fs = require('fs')
const path = require('path')
const port = 3000
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript'
}

// エラー処理
const errorHandler = (error, response) => {
  if (error.code === 'ENOENT') {
    // リクエストで指定されたリソースが存在しない場合
    fs.readFile('./html/404.html', (error, content) => {
      response.writeHead(404, { 'Content-Type': 'text/html' })
      response.end(content, 'utf-8')
    })
    return
  }

  // それ以外の場合はサーバーエラー
  fs.readFile('./html/500.html', (error, content) => {
    response.writeHead(500, { 'Content-Type': 'text/html' })
    response.end(content, 'utf-8')
  })
}

// httpサーバーの構築
const server = http.createServer((request, response) => {
    console.log(`request: ${request.url}`)

    const url = (request.url === '/') ? '/html/index.html' : request.url
    const filePath = `.${url}`
    const extName = String(path.extname(filePath)).toLowerCase()
    const contentType = `${(mimeTypes[extName] || 'text/html')};charset=utf-8`

    fs.readFile(filePath, (error, content) => {
      if (error) {
        // エラーが発生した場合
        errorHandler(error, response)
        return
      }

      // レスポンスにヘッダーを設定
      response.writeHead(200, { 'Content-Type': contentType })

      // レスポンスの本文を設定
      response.end(content, 'utf-8')
    })
})

// ポート番号を設定
server.listen(port)
console.log(`The server has started and is listening on port number: ${port}`)
