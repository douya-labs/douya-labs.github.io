export type PaperItem = {
  title: string
  summary: string
  whyItMatters: string
  source: string
  href: string
  announced: string
}

export type PaperCategory = {
  key: string
  title: string
  description: string
  papers: PaperItem[]
}

export const llmPaperCategories: PaperCategory[] = [
  {
    key: 'reasoning',
    title: 'Reasoning · 后训练 · 推理策略',
    description:
      '这一组更偏 reasoning pipeline、RL/post-training、推理安全与多语言数学能力，适合看大模型“怎么变得更会想”。',
    papers: [
      {
        title: 'Self-Improvement of Large Language Models: A Technical Overview and Future Outlook',
        summary:
          '一篇很适合拿来做总览的技术综述，聚焦大模型自改进、自反思与持续提升的主要路径。',
        whyItMatters:
          '如果你想快速建立“最新 reasoning / self-improvement 版图”，这类 overview paper 的性价比很高。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=Self-Improvement%20of%20Large%20Language%20Models%3A%20A%20Technical%20Overview%20and%20Future%20Outlook',
      },
      {
        title: 'Revisiting On-Policy Distillation: Empirical Failure Modes and Simple Fixes',
        summary:
          '关注 on-policy distillation 在长链路 post-training 中的失效模式，以及一些简单但有效的修复思路。',
        whyItMatters:
          '如果你关心 reasoning model 的 post-training 稳定性，这篇非常贴近工程现实。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=Revisiting%20On-Policy%20Distillation%3A%20Empirical%20Failure%20Modes%20and%20Simple%20Fixes',
      },
      {
        title: 'TAPO: Translation Augmented Policy Optimization for Multilingual Mathematical Reasoning',
        summary:
          '讨论如何把翻译增强和 policy optimization 结合起来，提升多语言数学推理表现。',
        whyItMatters:
          'reasoning 不再只看英文，跨语言能力已经开始成为下一阶段的重要竞争点。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=TAPO%3A%20Translation%20Augmented%20Policy%20Optimization%20for%20Multilingual%20Mathematical%20Reasoning',
      },
      {
        title: 'EcoThink: A Green Adaptive Inference Framework for Sustainable and Accessible Agents',
        summary:
          '从推理成本与可持续性出发，讨论 agent 在不同任务上如何自适应地分配推理开销。',
        whyItMatters:
          '今年一个明显趋势就是：不只是追求更强 reasoning，还要追求更便宜、更可部署的 reasoning。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=EcoThink%3A%20A%20Green%20Adaptive%20Inference%20Framework%20for%20Sustainable%20and%20Accessible%20Agents',
      },
    ],
  },
  {
    key: 'agents',
    title: 'Agents · Tool Use · Security',
    description:
      '这一组偏 agent 能力、技能蒸馏、工具使用 benchmark，以及 system prompt / reasoning vulnerability 这类安全问题。',
    papers: [
      {
        title: 'Trace2Skill: Distill Trajectory-Local Lessons into Transferable Agent Skills',
        summary:
          '从 agent 的轨迹里提炼可迁移技能，试图让经验不只是一次性 rollout，而能沉淀成能力。',
        whyItMatters:
          '这条路线和 agent memory / skill library 非常相关，值得你重点看。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=Trace2Skill%3A%20Distill%20Trajectory-Local%20Lessons%20into%20Transferable%20Agent%20Skills',
      },
      {
        title: 'FinMCP-Bench: Benchmarking LLM Agents for Real-World Financial Tool Use under the Model Context Protocol',
        summary:
          '围绕 MCP 场景做真实金融工具使用评测，重点是 agent 的工具调用能力是否真的可靠。',
        whyItMatters:
          'MCP / tool-use 已经从 demo 进入 benchmark 阶段，这类 paper 很能说明行业重心。',
        source: 'arXiv · submitted 2026-03-25',
        announced: '2026-03-25',
        href: 'https://www.semanticscholar.org/search?q=FinMCP-Bench%3A%20Benchmarking%20LLM%20Agents%20for%20Real-World%20Financial%20Tool%20Use%20under%20the%20Model%20Context%20Protocol',
      },
      {
        title: 'Beyond Content Safety: Real-Time Monitoring for Reasoning Vulnerabilities in Large Language Models',
        summary:
          '不只看内容安全，而是把监控目标扩展到推理链路里的脆弱性与被利用路径。',
        whyItMatters:
          'reasoning model 越强，攻击面往往越不只是输出内容，而是中间思维流程和策略。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=Beyond%20Content%20Safety%3A%20Real-Time%20Monitoring%20for%20Reasoning%20Vulnerabilities%20in%20Large%20Language%20Models',
      },
      {
        title: 'The System Prompt Is the Attack Surface: How LLM Agent Configuration Shapes Security and Creates Exploitable Vulnerabilities',
        summary:
          '讨论 system prompt 与 agent 配置如何直接决定攻击面，提示工程不再只是效果问题，也是安全问题。',
        whyItMatters:
          '对任何在做 agent product 的团队，这类 paper 都非常现实。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=The%20System%20Prompt%20Is%20the%20Attack%20Surface%3A%20How%20LLM%20Agent%20Configuration%20Shapes%20Security%20and%20Creates%20Exploitable%20Vulnerabilities',
      },
    ],
  },
  {
    key: 'multimodal',
    title: 'Multimodal · 科学模型 · 长视频理解',
    description:
      '这一组能看到 2026 的另一个明显趋势：MLLM 不再只是“看图说话”，而是开始卷结构化推理、长视频、科学场景与 trillion-scale 基座。',
    papers: [
      {
        title: 'LanteRn: Latent Visual Structured Reasoning',
        summary:
          '把视觉推理往更结构化、更可解释的方向推进，不只是简单把图像 token 丢给语言模型。',
        whyItMatters:
          '如果你对“多模态到底有没有真正 reasoning”这个问题敏感，这篇值得看。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=LanteRn%3A%20Latent%20Visual%20Structured%20Reasoning',
      },
      {
        title: 'Bridging Perception and Reasoning: Token Reweighting for RLVR in Multimodal LLMs',
        summary:
          '讨论多模态场景里 perception token 和 reasoning token 的权重分配问题，把 RLVR 推到 MLLM。',
        whyItMatters:
          '这是“多模态后训练怎么做”里很具体也很关键的一步。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=Bridging%20Perception%20and%20Reasoning%3A%20Token%20Reweighting%20for%20RLVR%20in%20Multimodal%20LLMs',
      },
      {
        title: 'Intern-S1-Pro: Scientific Multimodal Foundation Model at Trillion Scale',
        summary:
          '主打科学场景的 trillion-scale 多模态基础模型，体量和 ambition 都很夸张。',
        whyItMatters:
          '它代表一个很清楚的方向：领域专用的超大多模态 foundation model 开始出现。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=Intern-S1-Pro%3A%20Scientific%20Multimodal%20Foundation%20Model%20at%20Trillion%20Scale',
      },
      {
        title: 'VideoTIR: Accurate Understanding for Long Videos with Efficient Tool-Integrated Reasoning',
        summary:
          '面向长视频理解，把工具调用和推理过程结合起来，试图缓解长视频理解中的 hallucination 和 token 压力。',
        whyItMatters:
          '长视频 + tool-integrated reasoning 是多模态 agent 很自然的一步。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=VideoTIR%3A%20Accurate%20Understanding%20for%20Long%20Videos%20with%20Efficient%20Tool-Integrated%20Reasoning',
      },
    ],
  },
  {
    key: 'efficiency',
    title: 'Efficiency · Compression · Quantization · Evaluation',
    description:
      '这组更偏部署与工程：压缩、量化、token 效率，以及 LLM judge 这类评测可靠性问题。',
    papers: [
      {
        title: 'GlowQ: Group-Shared LOw-Rank Approximation for Quantized LLMs',
        summary:
          '继续往量化部署深挖，试图在精度与成本之间找到更好的折中。',
        whyItMatters:
          '部署侧今年的主题很明确：不是只有更大模型，也要更便宜地跑起来。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=GlowQ%3A%20Group-Shared%20LOw-Rank%20Approximation%20for%20Quantized%20LLMs',
      },
      {
        title: 'SliderQuant: Accurate Post-Training Quantization for LLMs',
        summary:
          '面向 post-training quantization 的改进方案，目标是在不大动训练流程的前提下提高量化精度。',
        whyItMatters:
          '如果模型最终要落地，这类 paper 的价值经常比“再涨一点 benchmark”还大。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=SliderQuant%3A%20Accurate%20Post-Training%20Quantization%20for%20LLMs',
      },
      {
        title: 'Large Language Model as Token Compressor and Decompressor',
        summary:
          '把 LLM 本身当成 token compressor / decompressor 看待，试图在 context 与效率之间找新的路径。',
        whyItMatters:
          '这类工作很适合和 memory / context compression 一起看，启发性强。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=Large%20Language%20Model%20as%20Token%20Compressor%20and%20Decompressor',
      },
      {
        title: 'RubricEval: A Rubric-Level Meta-Evaluation Benchmark for LLM Judges in Instruction Following',
        summary:
          '不是继续做 judge，而是反过来评估 LLM judge 本身在 rubric 级别到底靠不靠谱。',
        whyItMatters:
          '2026 里 “谁来评估模型” 本身已经变成研究问题，这篇就卡在这个点上。',
        source: 'arXiv · submitted 2026-03-26',
        announced: '2026-03-26',
        href: 'https://www.semanticscholar.org/search?q=RubricEval%3A%20A%20Rubric-Level%20Meta-Evaluation%20Benchmark%20for%20LLM%20Judges%20in%20Instruction%20Following',
      },
    ],
  },
]

export const llmPapersMeta = {
  title: '最新大模型论文速览',
  subtitle: '按 reasoning、agents、多模态、部署效率四条线，快速看近几天值得点开的新 paper。',
  updatedAt: '2026-03-28',
  note: '这页是人工精选，不追求“全”，追求你扫一眼就知道最近该看什么。论文入口改为稳定的 Semantic Scholar 搜索页，优先保证点击可打开、不出现 404；打开后可继续进入论文摘要页或 PDF。',
}
