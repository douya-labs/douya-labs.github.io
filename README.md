# douya-labs.github.io

一个面向日常浏览的 AI 资讯站。

## 现在这个站点是什么
- 首页是一篇当天的 AI 资讯文章
- 内容来源于 AI 新闻搜索与新闻源整理
- 往期内容按天归档
- 首页优先保证易读、中文化、少点击

## 路由
- `/`：今日 AI 资讯首页
- `/daily/:slug`：往期归档页

## 开发
```bash
npm install
npm run dev
npm run build
```

## 自动化
- `npm run ai-daily:generate`：生成当天 AI 资讯文章
- `npm run ai-daily:publish`：构建并提交推送
- `npm run ai-daily:reminder`：输出提醒文案与首页链接

## 部署
当前使用 GitHub Pages + GitHub Actions 自动部署。
推送到 `main` 后会自动发布到：

- <https://douya-labs.github.io/>
