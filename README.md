# douya-labs.github.io

一个面向日常浏览的 AI Daily 站点。

## 现在这个站点是什么
- 首页是 AI 圈值得看的内容列表
- 点进列表项后，可以看单条详情页
- 内容来源于每日整理的 AI Daily 数据
- 结构尽量简单，方便后续每天持续更新

## 路由
- `/`：首页列表
- `/item/:slug`：单条详情页

## 开发
```bash
npm install
npm run dev
npm run build
```

## 部署
当前使用 GitHub Pages + GitHub Actions 自动部署。
推送到 `main` 后会自动发布到：

- <https://douya-labs.github.io/>
