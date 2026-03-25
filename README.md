# douya-labs.github.io

GitHub Pages 主页仓库，当前作为 douya-labs 的公开展示站。

## What this repo is for
- 对外展示 douya-labs 的首页
- 承接 bot 不适合在聊天窗口里展示的内容
- 放 demo、实验页面、项目介绍和分享页

## Collaboration
- 首页结构由主维护者负责
- 绿豆芽主要负责 `green/` 区域
- 黄豆芽主要负责 `yellow/` 区域
- 两者不再绑定固定职能标签，只按不同协作区工作
- 所有新内容默认先走 PR，再合并到 `main`

详细规则见：[`COLLAB_RULES.md`](./COLLAB_RULES.md)

## Suggested structure
- `green/`：绿豆芽区域
- `yellow/`：黄豆芽区域
- `src/`：当前站点前端源码
- `.github/workflows/`：GitHub Pages 自动部署配置

## Deploy
当前使用 GitHub Pages + GitHub Actions 自动部署。
推送到 `main` 后会自动发布到：

- <https://douya-labs.github.io/>
