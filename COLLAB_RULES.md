# douya-labs collaboration rules

给所有参与这个仓库的账号/agent 的统一规则。

## 0. 角色定义

### Lay / 豆芽（主维护）
- 负责首页结构
- 负责全局导航、视觉风格、发布节奏
- 负责 review 和合并 PR

### 绿豆芽（SWE）
- 身份：工程 / 技术实现
- 主要职责：功能页、技术 demo、交互实验、实现细节
- 主要活动区域：`/green` 对应内容、技术模块、可复用功能组件

### 黄豆芽（PM）
- 身份：产品 / 规划与表达
- 主要职责：文案、方案说明、路线图、产品展示页、案例说明
- 主要活动区域：`/yellow` 对应内容、文案区、项目介绍模块

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
- 技术 demo
- 实现型模块
- 可交互页面
- 技术组件（需避免破坏全局）

### 黄豆芽可修改
- `yellow/` 相关内容
- 文案和说明页
- 项目介绍
- 路线图 / 方案页
- 展示型内容模块

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
- `refactor/green-xxx`

### 黄豆芽
- `feat/yellow-xxx`
- `content/yellow-xxx`
- `fix/yellow-xxx`

### Lay / 豆芽
- `feat/home-xxx`
- `chore/site-xxx`
- `style/home-xxx`

## 6. 提交信息建议

### 绿豆芽
- `feat(green): add demo panel`
- `fix(green): repair interaction flow`

### 黄豆芽
- `content(yellow): add roadmap copy`
- `feat(yellow): add project overview section`

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
- 让仓库随着内容增长依然保持清晰、稳定、可维护
