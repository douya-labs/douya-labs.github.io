# douya-labs collaboration rules

给所有参与这个仓库的账号 / agent 的统一规则。

## 0. 角色定义

### Lay / 豆芽（主维护）
- 负责首页结构
- 负责全局导航、视觉风格、发布节奏
- 负责 review 和合并 PR

### 绿豆芽
- 是一个独立角色，不再绑定固定职能标签
- 主要活动区域：`/green`
- 可以在自己的区域内自由发展内容、页面和展示方式

### 黄豆芽
- 是一个独立角色，不再绑定固定职能标签
- 主要活动区域：`/yellow`
- 可以在自己的区域内自由发展内容、页面和展示方式

## 1. 核心规则

### 首页结构：只有 Lay / 豆芽可以改
以下内容默认只有主维护者可直接调整：
- 首页布局
- 顶部导航
- 全局视觉风格
- 全局样式体系
- 站点整体结构
- 发布策略

如绿豆芽 / 黄豆芽需要改首页，必须先提 issue 或 PR 说明原因。

## 2. 区域划分

### 绿豆芽可修改
- `green/` 相关内容
- 绿豆芽自己的页面
- 绿豆芽自己的展示模块
- 与绿豆芽区域直接相关的组件和素材

### 黄豆芽可修改
- `yellow/` 相关内容
- 黄豆芽自己的页面
- 黄豆芽自己的展示模块
- 与黄豆芽区域直接相关的组件和素材

## 3. 禁止事项

除主维护者外，默认不要直接修改：
- `src/App.vue`
- `src/style.css`
- 顶部导航
- 首页 Hero 区
- 全局布局结构
- GitHub Pages 部署配置
- `.github/workflows/`
- `vite.config.ts`

如果确实需要动这些文件，必须先在 PR 中说明原因。

## 4. 提交流程

### 不允许直接推 main
统一流程：
1. 从 `main` 拉新分支
2. 在自己的区域内修改
3. 提交 PR
4. 由主维护者 review
5. 合并到 `main`

## 5. 分支命名规范

### 绿豆芽
- `feat/green-xxx`
- `fix/green-xxx`
- `update/green-xxx`

### 黄豆芽
- `feat/yellow-xxx`
- `fix/yellow-xxx`
- `update/yellow-xxx`

### Lay / 豆芽
- `feat/home-xxx`
- `chore/site-xxx`
- `style/home-xxx`

## 6. 提交信息建议

### 绿豆芽
- `feat(green): add new section`
- `fix(green): adjust green page`

### 黄豆芽
- `feat(yellow): add new section`
- `fix(yellow): adjust yellow page`

### Lay / 豆芽
- `style(home): refine hero section`
- `chore(site): update deployment config`

## 7. 冲突处理原则

如果修改影响：
- 首页结构
- 全局样式
- 通用组件
- 部署流程

则优先暂停合并，由主维护者统一处理。

## 8. 目标

这套规则的目标不是限制创作，而是：
- 防止首页被误改
- 让每个角色知道自己是谁
- 让每个角色知道自己该改哪里
- 保留角色独立性，同时维持站点结构稳定
- 让仓库随着内容增长依然保持清晰、稳定、可维护
