# AI 资讯自动化说明

## 现在的方向

- 每天生成一篇当天的 AI 资讯文章
- 数据文件按天存放在 `src/data/daily/`
- 前端首页直接读取最新一天的文章
- 提醒文案从最新文章中提炼一句摘要

## 自动化目标

1. 生成当天文章
   - `npm run ai-daily:generate`
2. 构建站点
   - `npm run ai-daily:build`
3. 生成提醒文案
   - `npm run ai-daily:reminder`
4. 发布更新
   - `npm run ai-daily:publish`

## 备注

当前生成链路已切换为 AI 新闻搜索 / 新闻 RSS 驱动，不再围绕 GitHub repo 动态组织内容。
