// ============================================================
// UCSI预科招生 · 国内市场深度调研报告 — 数据中心
// Design: 商业白皮书风格 (Executive Briefing)
// ============================================================

// --- 图片资源 ---
export const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505700504/YLXRrdjjrA85pgERnrA5UP/hero-banner-8xKkvv4D5rgzTa8ZHDLDPb.webp",
  marketAnalysis: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505700504/YLXRrdjjrA85pgERnrA5UP/market-analysis-KyvFfnDtYgwXYe595bVaB2.webp",
  competition: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505700504/YLXRrdjjrA85pgERnrA5UP/competition-landscape-86zcVQ2RZvTMLAz56tAJSG.webp",
  parentStudent: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505700504/YLXRrdjjrA85pgERnrA5UP/parent-student-kqLTdhXC9gUdviZhMABsyg.webp",
  actionPlan: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505700504/YLXRrdjjrA85pgERnrA5UP/action-plan-fCmiKF8aUvcUDGdHk6faPw.webp",
};

// --- 导航章节 ---
export const NAV_SECTIONS = [
  { id: "overview", label: "报告概览" },
  { id: "market", label: "行业现状" },
  { id: "competitors", label: "竞争格局" },
  { id: "channels", label: "渠道生态" },
  { id: "painpoints", label: "家长痛点" },
  { id: "costs", label: "获客成本" },
  { id: "ucsi", label: "UCSI优势" },
  { id: "action", label: "行动方案" },
];

// --- 核心指标 ---
export const KEY_METRICS = [
  { label: "留学行业市场规模", value: "7000", suffix: "亿+", prefix: "" },
  { label: "2024赴马中国学生", value: "56198", suffix: "人", prefix: "" },
  { label: "5年增长率", value: "274", suffix: "%", prefix: "" },
  { label: "UCSI QS排名", value: "269", suffix: "", prefix: "#" },
];

// --- 中国学生赴马来西亚留学增长趋势 ---
export const STUDENT_GROWTH_DATA = [
  { year: "2019", students: 10358, growth: 0 },
  { year: "2020", students: 8876, growth: -14.3 },
  { year: "2021", students: 12345, growth: 39.1 },
  { year: "2022", students: 20150, growth: 63.2 },
  { year: "2023", students: 33216, growth: 64.8 },
  { year: "2024", students: 56198, growth: 69.2 },
];

// --- 留学目的地费用对比 ---
export const COST_COMPARISON_DATA = [
  { country: "英国", tuition: 25, living: 15, total: 40 },
  { country: "美国", tuition: 28, living: 15, total: 43 },
  { country: "澳大利亚", tuition: 20, living: 12, total: 32 },
  { country: "新加坡", tuition: 15, living: 10, total: 25 },
  { country: "日本", tuition: 8, living: 7, total: 15 },
  { country: "马来西亚", tuition: 4, living: 4, total: 8 },
];

// --- 竞争对手矩阵 ---
export const COMPETITOR_DATA = {
  headAgencies: [
    { name: "新东方前途", type: "头部机构", scale: "全国50+分公司", strength: "品牌知名度最高", weakness: "价格高、服务标准化", marketShare: "15%", price: "3-8万" },
    { name: "启德教育", type: "头部机构", scale: "全国30+分公司", strength: "亚洲留学专长", weakness: "顾问流动性大", marketShare: "8%", price: "2-6万" },
    { name: "金吉列", type: "头部机构", scale: "全国50+分公司", strength: "院校资源丰富", weakness: "服务质量参差", marketShare: "7%", price: "1.5-5万" },
    { name: "新通教育", type: "头部机构", scale: "全国20+分公司", strength: "语培+留学一体", weakness: "马来业务占比小", marketShare: "5%", price: "2-5万" },
  ],
  mediumAgencies: [
    { name: "114留学网", type: "中型机构", focus: "马来西亚专线", strength: "马来资源深", weakness: "品牌知名度低" },
    { name: "学翼国际", type: "中型机构", focus: "东南亚留学", strength: "价格有竞争力", weakness: "服务范围有限" },
    { name: "环球教育", type: "中型机构", focus: "多国留学", strength: "渠道广", weakness: "马来不是主力" },
  ],
  smallStudios: [
    { name: "个人工作室/博主", type: "小型", count: "数千家", strength: "获客成本低、灵活", weakness: "服务能力有限、无资质保障" },
    { name: "马来当地华人中介", type: "小型", count: "数百家", strength: "本地资源强", weakness: "国内获客难" },
  ],
};

// --- 线上渠道数据 ---
export const CHANNEL_DATA = [
  { platform: "小红书", cac: 10, conversionRate: 8, userProfile: "18-34岁女性为主", contentType: "图文笔记+聚光投流", difficulty: 3, potential: 5 },
  { platform: "抖音", cac: 30, conversionRate: 3, userProfile: "1-3线城市全年龄", contentType: "短视频+直播", difficulty: 4, potential: 4 },
  { platform: "微信生态", cac: 5, conversionRate: 15, userProfile: "家长群体", contentType: "公众号+社群+朋友圈", difficulty: 2, potential: 5 },
  { platform: "知乎", cac: 25, conversionRate: 5, userProfile: "高知群体", contentType: "问答+知+推广", difficulty: 3, potential: 3 },
  { platform: "百度SEM", cac: 200, conversionRate: 3, userProfile: "主动搜索用户", contentType: "竞价广告", difficulty: 5, potential: 2 },
  { platform: "快手", cac: 15, conversionRate: 2, userProfile: "3-5线城市", contentType: "短视频+直播", difficulty: 3, potential: 3 },
];

// --- 家长痛点数据 ---
export const PAIN_POINTS = [
  {
    id: 1,
    title: "信息不对称与信任危机",
    severity: 95,
    icon: "shield-alert",
    description: "2017年取消资质审批后行业门槛极低，\"保录取\"骗局频发，超30%从业者用学历光环包装但服务质量堪忧。家长难以辨别真伪信息。",
    solution: "大学直接授权招生，全流程透明可追踪，消除中间环节信任风险",
  },
  {
    id: 2,
    title: "费用焦虑与性价比追求",
    severity: 88,
    icon: "wallet",
    description: "中产家庭留学预算下调，\"性价比为王\"成主流心态。担心\"花钱少=质量差\"的心理矛盾普遍存在。",
    solution: "UCSI预科学费约4万/年，总费用10万/年，QS269排名证明质量",
  },
  {
    id: 3,
    title: "学历认证与就业前景",
    severity: 85,
    icon: "graduation-cap",
    description: "担心海外学历不被国内认可，海归学历加速贬值的舆论环境让家长犹豫。关注回国后考公考编、落户政策。",
    solution: "中国教育部首批认证，QS前300可享上海等城市落户优惠政策",
  },
  {
    id: 4,
    title: "安全与生活适应",
    severity: 78,
    icon: "heart",
    description: "对东南亚国家安全的刻板印象，担心语言不通、饮食不适应，独生子女家长的分离焦虑。",
    solution: "马来西亚华人占23%，中文广泛通行，中马免签，4小时直飞",
  },
  {
    id: 5,
    title: "升学路径不清晰",
    severity: 82,
    icon: "route",
    description: "超80%中职生及家长希望通过留学实现学历提升，但不知道中职/高考失利还能申请什么学校，对预科课程认知几乎为零。",
    solution: "UCSI预科接受高中均分70%+，中职生也可申请，1年直升本科",
  },
  {
    id: 6,
    title: "申请流程复杂",
    severity: 72,
    icon: "file-text",
    description: "涉及材料准备、语言考试、申请、签证、住宿等多个环节，担心错过截止日期。DIY容易踩坑但又不信任中介。",
    solution: "提供全流程一站式服务，每步可追踪，从申请到入学全程陪伴",
  },
];

// --- 获客成本对比 ---
export const CAC_COMPARISON = [
  { channel: "小红书（自然流量）", cac: 10, roi: 50, note: "最优渠道" },
  { channel: "小红书（聚光投流）", cac: 30, roi: 20, note: "可规模化" },
  { channel: "微信私域", cac: 5, roi: 80, note: "需要积累" },
  { channel: "抖音信息流", cac: 50, roi: 10, note: "品牌曝光" },
  { channel: "知乎知+", cac: 40, roi: 12, note: "深度种草" },
  { channel: "百度SEM", cac: 200, roi: 3, note: "成本过高" },
  { channel: "线下宣讲会", cac: 80, roi: 15, note: "转化率高" },
  { channel: "口碑转介绍", cac: 0, roi: 100, note: "终极目标" },
];

// --- UCSI竞争优势对比 ---
export const UCSI_ADVANTAGE = [
  { dimension: "QS排名", ucsi: "#269", taylor: "#259", sunway: "#446", inti: "未排名", help: "未排名" },
  { dimension: "预科学费/年", ucsi: "~4万", taylor: "~7.5万", sunway: "~6万", inti: "~3.5万", help: "~3万" },
  { dimension: "教育部认证", ucsi: "首批认证", taylor: "认证", sunway: "认证", inti: "认证", help: "认证" },
  { dimension: "预科时长", ucsi: "1年", taylor: "1年", sunway: "1年", inti: "1-1.5年", help: "1年" },
  { dimension: "直升本科", ucsi: "保障直升", taylor: "竞争性", sunway: "竞争性", inti: "有条件", help: "有条件" },
  { dimension: "特色学科", ucsi: "音乐全球32", taylor: "酒管全球1", sunway: "商科", inti: "工程", help: "IT" },
  { dimension: "入学门槛", ucsi: "均分70%", taylor: "均分75%", sunway: "均分75%", inti: "均分65%", help: "均分60%" },
];

// --- 行动方案时间线 ---
export const ACTION_TIMELINE = [
  {
    phase: "第一阶段",
    period: "0-3个月",
    title: "基础搭建期",
    color: "#1E3A5F",
    tasks: [
      "确认UCSI大学代理资质与佣金结构",
      "注册个体户（经营范围含留学服务）",
      "搭建小红书矩阵账号（2-3个）",
      "建立微信私域体系（个人号+社群）",
      "制作首批30篇内容素材库",
      "完成小红书企业号认证+聚光开户",
    ],
    kpi: "引流100+精准客户到微信",
    budget: "5000-10000元",
  },
  {
    phase: "第二阶段",
    period: "3-6个月",
    title: "流量起量期",
    color: "#059669",
    tasks: [
      "小红书聚光投流启动（日预算100-300元）",
      "开通抖音账号，发布短视频内容",
      "建立学生大使体系（在读生分享）",
      "与2-3家语培机构建立异业合作",
      "举办首场线上说明会/直播",
      "优化转化漏斗，提升加微率",
    ],
    kpi: "月均引流200+客户，成交10-15单",
    budget: "10000-30000元/月",
  },
  {
    phase: "第三阶段",
    period: "6-12个月",
    title: "规模扩张期",
    color: "#D97706",
    tasks: [
      "拓展至知乎、百度等搜索渠道",
      "在二三线城市举办线下宣讲会",
      "建立下级代理/合伙人网络",
      "开发线上申请辅助工具/小程序",
      "建立口碑转介绍激励机制",
      "考虑组建2-3人小团队",
    ],
    kpi: "年招生50-100人，月收入5-10万",
    budget: "30000-50000元/月",
  },
];

// --- 收益估算 ---
export const REVENUE_MODEL = [
  { students: 10, commission: 4000, totalRevenue: 40000, monthlyCost: 5000, annualProfit: -20000, note: "起步亏损期" },
  { students: 30, commission: 4000, totalRevenue: 120000, monthlyCost: 8000, annualProfit: 24000, note: "开始盈利" },
  { students: 50, commission: 4000, totalRevenue: 200000, monthlyCost: 12000, annualProfit: 56000, note: "稳定盈利" },
  { students: 100, commission: 4500, totalRevenue: 450000, monthlyCost: 20000, annualProfit: 210000, note: "规模化盈利" },
  { students: 200, commission: 5000, totalRevenue: 1000000, monthlyCost: 35000, annualProfit: 580000, note: "高速增长" },
];

// --- 行业竞争格局市场份额 ---
export const MARKET_SHARE_DATA = [
  { name: "头部机构（新东方/启德/金吉列等）", value: 35, fill: "#1E3A5F" },
  { name: "中型专业机构", value: 25, fill: "#2563EB" },
  { name: "小型工作室/个人博主", value: 25, fill: "#059669" },
  { name: "院校直招/自助申请", value: 15, fill: "#D97706" },
];

// --- 线上渠道效果雷达图数据 ---
export const CHANNEL_RADAR_DATA = [
  { metric: "获客成本", xiaohongshu: 90, douyin: 60, wechat: 95, zhihu: 55, baidu: 20 },
  { metric: "转化率", xiaohongshu: 80, douyin: 50, wechat: 90, zhihu: 60, baidu: 40 },
  { metric: "可规模化", xiaohongshu: 85, douyin: 90, wechat: 40, zhihu: 50, baidu: 70 },
  { metric: "内容门槛", xiaohongshu: 80, douyin: 50, wechat: 70, zhihu: 60, baidu: 90 },
  { metric: "用户精准度", xiaohongshu: 85, douyin: 55, wechat: 90, zhihu: 75, baidu: 65 },
];
