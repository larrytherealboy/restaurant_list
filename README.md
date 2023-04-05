# 我的餐廳清單
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/84850988/228586842-1010d86c-c68e-49e0-ad8e-1a62d6e5e7d6.png">
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/84850988/228586927-ab5a9f7e-2010-4e81-a030-c05ca9c11166.png">
<img width="772" alt="image" src="https://user-images.githubusercontent.com/84850988/228587089-cddc7a09-0219-4046-80fc-e4dd8dee2529.png">

## 功能介紹
* 使用者可以新增一家餐廳
* 使用者可以瀏覽一家餐廳的詳細資訊
* 使用者可以瀏覽全部所有餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳


## 開始使用
1. 安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 透過終端機進入資料夾，輸入：
npm install -y
4. 設定環境變數連線 MongoDB
MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
5. 輸入以下程式碼以啟動專案：
npm run start
6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
Express is running on http://localhost:3000
7. 欲停止伺服器請輸入：
ctrl + c

## 開發工具
* Node.js 14.16.0
* Express 4.16.4
* Express-Handlebars 3.0.0
* Bootstrap 5.1.1
* MongoDB
* mongoose 5.9.7