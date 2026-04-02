/**
 * Home — UCSI预科招生国内市场深度调研报告
 * Design: 商业白皮书 (Executive Briefing) 风格
 * - 深靛蓝 (#1E3A5F) + 翡翠绿 (#059669) 配色
 * - Playfair Display + Space Grotesk + Noto Sans SC 字体
 * - 大量留白、结构化叙事、交互式图表
 */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Legend, AreaChart, Area, ComposedChart,
} from "recharts";
import SideNav from "@/components/SideNav";
import Section from "@/components/Section";
import InsightCard from "@/components/InsightCard";
import MetricCard from "@/components/MetricCard";
import { useInView } from "@/hooks/useInView";
import {
  IMAGES, KEY_METRICS, STUDENT_GROWTH_DATA, COST_COMPARISON_DATA,
  COMPETITOR_DATA, CHANNEL_DATA, PAIN_POINTS, CAC_COMPARISON,
  UCSI_ADVANTAGE, ACTION_TIMELINE, REVENUE_MODEL, MARKET_SHARE_DATA,
  CHANNEL_RADAR_DATA,
} from "@/lib/reportData";

const CHART_COLORS = ["#1E3A5F", "#059669", "#D97706", "#2563EB", "#DC2626", "#7C3AED"];

function HeroSection() {
  return (
    <section id="overview" className="relative min-h-[80vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Kuala Lumpur skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/70 to-[#0B1426]/20" />
      </div>
      <div className="relative z-10 container max-w-5xl pb-16 pt-32 lg:pl-64">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-amber-400/80 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Market Research Report · 2026
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            马来西亚大学预科招生<br />
            <span className="text-amber-400">国内市场深度调研</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
            聚焦UCSI思特雅大学中国预科项目，深度剖析国内留学中介行业竞争格局、
            线上线下渠道生态、家长核心痛点与可执行行动方案。
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">
              竞争格局分析
            </span>
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">
              渠道生态研究
            </span>
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">
              家长痛点洞察
            </span>
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">
              行动方案规划
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricsBar() {
  return (
    <div className="bg-white border-y border-border shadow-sm lg:ml-56">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {KEY_METRICS.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketSection() {
  const { isInView, ref } = useInView(0.2);
  return (
    <Section id="market" number="01" title="行业现状" subtitle="中国留学市场与马来西亚赛道全景">
      <div className="space-y-12">
        {/* 市场概述 */}
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              中国留学市场规模已突破<strong className="text-foreground">7000亿元</strong>，
              2024年出国留学人数达71万人。在"性价比为王"的新趋势下，马来西亚从"小众备选"
              跃升为"绝对主力"目的地。2024年中国学生赴马申请量达<strong className="text-foreground">56,198人</strong>，
              占全球申请量的33.34%，五年暴涨274%。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              留学中介行业自2017年取消资质审批后，准入门槛极低，市场参与者从头部上市公司到个人博主，
              竞争格局高度碎片化。行业正从"信息差赚钱"向"服务质量竞争"转型，
              自媒体获客能力成为机构生存的关键分水岭。
            </p>
            <InsightCard
              title="马来西亚是增长最快的留学目的地"
              content="中国学生申请量5年增长274%，远超英美澳等传统目的地。本科申请是主力，占总申请量50%以上。"
              color="green"
            />
          </div>
          <div className="md:col-span-2">
            <img
              src={IMAGES.marketAnalysis}
              alt="市场分析"
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>

        {/* 增长趋势图 */}
        <div ref={ref} className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            中国学生赴马来西亚留学申请量趋势
          </h3>
          <p className="text-sm text-muted-foreground mb-6">2019-2024年 · 数据来源: EMGS</p>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={STUDENT_GROWTH_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" tick={{ fontSize: 13 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 13 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 13 }} unit="%" />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: 13 }}
                formatter={(value: number, name: string) =>
                  name === "students" ? [`${value.toLocaleString()} 人`, "申请人数"] : [`${value}%`, "同比增长"]
                }
              />
              <Legend formatter={(value) => value === "students" ? "申请人数" : "同比增长率"} />
              <Bar yAxisId="left" dataKey="students" fill="#1E3A5F" radius={[4, 4, 0, 0]} barSize={45} />
              <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#059669" strokeWidth={2.5} dot={{ r: 5, fill: "#059669" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* 费用对比 */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            各国留学年均费用对比
          </h3>
          <p className="text-sm text-muted-foreground mb-6">单位: 万元人民币/年 · 含学费+生活费</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={COST_COMPARISON_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 13 }} unit="万" />
              <YAxis dataKey="country" type="category" tick={{ fontSize: 13 }} width={70} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: 13 }}
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = { tuition: "学费", living: "生活费" };
                  return [`${value}万/年`, labels[name] || name];
                }}
              />
              <Legend formatter={(v) => v === "tuition" ? "学费" : "生活费"} />
              <Bar dataKey="tuition" stackId="a" fill="#1E3A5F" radius={[0, 0, 0, 0]} />
              <Bar dataKey="living" stackId="a" fill="#059669" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <InsightCard
            title="马来西亚留学费用仅为英美的1/5"
            content="年均总费用约8-10万人民币，是普通工薪家庭可承受的范围。UCSI预科学费约4万/年，在马来西亚私立大学中也属于低位。"
            color="green"
          />
        </div>
      </div>
    </Section>
  );
}

function CompetitorSection() {
  const [activeTab, setActiveTab] = useState<"head" | "medium" | "small">("head");
  return (
    <Section id="competitors" number="02" title="竞争格局" subtitle="国内留学中介行业竞争态势全景">
      <div className="space-y-12">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              国内留学中介市场高度碎片化，头部机构（新东方、启德、金吉列等）占据约35%市场份额，
              但其马来西亚业务占比极小。中型专业机构和小型工作室/个人博主各占约25%。
              值得注意的是，院校直招和学生自助申请的比例正在快速上升，已达15%。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              头部机构面临"大而不精"的困境——服务标准化导致个性化不足，顾问流动性大影响服务连续性。
              这恰恰为专注马来西亚赛道的垂直玩家创造了差异化空间。
            </p>
          </div>
          <div className="md:col-span-2">
            <img src={IMAGES.competition} alt="竞争格局" className="rounded-lg shadow-md w-full" />
          </div>
        </div>

        {/* 市场份额饼图 */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            留学中介市场份额分布
          </h3>
          <p className="text-sm text-muted-foreground mb-6">按机构类型划分</p>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ResponsiveContainer width="100%" height={300} className="max-w-sm">
              <PieChart>
                <Pie
                  data={MARKET_SHARE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {MARKET_SHARE_DATA.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, "市场份额"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {MARKET_SHARE_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm text-muted-foreground flex-1">{item.name}</span>
                  <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 竞争对手详情 */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="flex border-b border-border">
            {[
              { key: "head" as const, label: "头部机构" },
              { key: "medium" as const, label: "中型机构" },
              { key: "small" as const, label: "小型/个人" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3.5 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.key
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "head" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-semibold text-foreground">机构</th>
                      <th className="text-left py-3 px-2 font-semibold text-foreground">规模</th>
                      <th className="text-left py-3 px-2 font-semibold text-foreground">核心优势</th>
                      <th className="text-left py-3 px-2 font-semibold text-foreground">主要劣势</th>
                      <th className="text-left py-3 px-2 font-semibold text-foreground">收费</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPETITOR_DATA.headAgencies.map((c) => (
                      <tr key={c.name} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-3 px-2 font-medium">{c.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{c.scale}</td>
                        <td className="py-3 px-2 text-muted-foreground">{c.strength}</td>
                        <td className="py-3 px-2 text-muted-foreground">{c.weakness}</td>
                        <td className="py-3 px-2 text-muted-foreground">{c.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "medium" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-semibold">机构</th>
                      <th className="text-left py-3 px-2 font-semibold">专注方向</th>
                      <th className="text-left py-3 px-2 font-semibold">优势</th>
                      <th className="text-left py-3 px-2 font-semibold">劣势</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPETITOR_DATA.mediumAgencies.map((c) => (
                      <tr key={c.name} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-3 px-2 font-medium">{c.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{c.focus}</td>
                        <td className="py-3 px-2 text-muted-foreground">{c.strength}</td>
                        <td className="py-3 px-2 text-muted-foreground">{c.weakness}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "small" && (
              <div className="space-y-4">
                {COMPETITOR_DATA.smallStudios.map((c) => (
                  <div key={c.name} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{c.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{c.count}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">优势: </span>
                        <span className="text-foreground">{c.strength}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">劣势: </span>
                        <span className="text-foreground">{c.weakness}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <InsightCard
          title="头部机构的马来西亚业务占比极小，这是你的机会"
          content="新东方、启德等头部机构的核心业务集中在英美澳，马来西亚只是'附带'产品。专注马来西亚的垂直玩家可以在服务深度和专业度上形成碾压优势。"
          color="amber"
        />
      </div>
    </Section>
  );
}

function ChannelSection() {
  return (
    <Section id="channels" number="03" title="渠道生态" subtitle="线上线下获客渠道全景分析">
      <div className="space-y-12">
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          留学行业的获客渠道正在经历深刻变革。传统的百度SEM获客成本已飙升至200元/点击，
          而小红书等新媒体平台的私信咨询成本仅10元左右。能否掌握自媒体获客能力，
          已成为留学机构能否生存和扩张的关键分水岭。
        </p>

        {/* 渠道效果对比图 */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            各平台获客效果对比
          </h3>
          <p className="text-sm text-muted-foreground mb-6">获客成本 vs 转化率 · 气泡大小代表潜力评分</p>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={CHANNEL_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="platform" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: 13 }}
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = { cac: "获客成本", conversionRate: "转化率" };
                  return [name === "cac" ? `${value}元` : `${value}%`, labels[name] || name];
                }}
              />
              <Legend formatter={(v) => v === "cac" ? "获客成本(元)" : "转化率(%)"} />
              <Bar dataKey="cac" fill="#1E3A5F" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="conversionRate" fill="#059669" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 渠道详情卡片 */}
        <div className="grid md:grid-cols-2 gap-6">
          {CHANNEL_DATA.slice(0, 4).map((ch, idx) => (
            <motion.div
              key={ch.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                  {ch.platform}
                </h4>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i < ch.potential ? "bg-primary" : "bg-border"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">获客成本</div>
                  <div className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                    {ch.cac}元
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">转化率</div>
                  <div className="text-xl font-bold text-[#059669]" style={{ fontFamily: "var(--font-heading)" }}>
                    {ch.conversionRate}%
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-muted-foreground shrink-0">用户画像:</span>
                  <span className="text-foreground">{ch.userProfile}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground shrink-0">内容形式:</span>
                  <span className="text-foreground">{ch.contentType}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 小红书重点分析 */}
        <div className="bg-gradient-to-br from-[#1E3A5F]/5 to-[#059669]/5 rounded-xl border border-border p-8">
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            小红书：留学赛道的核心战场
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                10元
              </div>
              <div className="text-sm text-muted-foreground">单条私信咨询成本</div>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-2xl font-bold text-[#059669] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                0.06元
              </div>
              <div className="text-sm text-muted-foreground">平均点击价格</div>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-2xl font-bold text-[#D97706] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                15-20%
              </div>
              <div className="text-sm text-muted-foreground">行业标准佣金比例</div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            实操案例显示：半年时间运营留学账号涨粉5000+，引流3500多个留学客户到微信，
            团队转化成交近200单。另一案例中，仅2个月做新西兰留学就成交12个学生，累计佣金7万+。
            小红书留学赛道的核心逻辑是"只负责引流，不做成交"——将客户引流到微信后，
            由专业留学顾问完成转化。
          </p>
          <InsightCard
            title="小红书是你的第一战场"
            content="获客成本最低（10元/私信）、用户精准度最高（18-34岁女性为主）、入局门槛最低（个体户即可投流）。建议优先集中资源攻克小红书渠道。"
            color="blue"
          />
        </div>
      </div>
    </Section>
  );
}

function PainPointSection() {
  return (
    <Section id="painpoints" number="04" title="家长痛点" subtitle="决策过程中的核心焦虑与需求洞察">
      <div className="space-y-12">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <p className="text-muted-foreground leading-relaxed mb-4">
              理解家长和学生的核心痛点，是制定有效营销策略的基础。通过对大量留学论坛、
              社交媒体讨论和行业报告的分析，我们识别出六大核心痛点，并按严重程度排序。
              每个痛点都对应着UCSI预科项目的独特解决方案。
            </p>
          </div>
          <div className="md:col-span-2">
            <img src={IMAGES.parentStudent} alt="家长与学生" className="rounded-lg shadow-md w-full" />
          </div>
        </div>

        {/* 痛点严重度图 */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            家长痛点严重程度评估
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={PAIN_POINTS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis dataKey="title" type="category" tick={{ fontSize: 11 }} width={140} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: 13 }}
                formatter={(value: number) => [`${value}/100`, "严重程度"]}
              />
              <Bar dataKey="severity" radius={[0, 4, 4, 0]} barSize={24}>
                {PAIN_POINTS.map((_, idx) => (
                  <Cell key={idx} fill={idx < 2 ? "#DC2626" : idx < 4 ? "#D97706" : "#1E3A5F"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 痛点详情卡片 */}
        <div className="grid md:grid-cols-2 gap-6">
          {PAIN_POINTS.map((pp, idx) => (
            <motion.div
              key={pp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-xl border border-border p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                  pp.severity >= 90 ? "bg-red-500" : pp.severity >= 80 ? "bg-amber-500" : "bg-primary"
                }`}>
                  {pp.severity}
                </div>
                <h4 className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                  {pp.title}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pp.description}</p>
              <div className="bg-[#059669]/5 border-l-2 border-[#059669] rounded-r-md p-3">
                <div className="text-xs font-semibold text-[#059669] mb-1">UCSI解决方案</div>
                <p className="text-sm text-foreground">{pp.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CostSection() {
  return (
    <Section id="costs" number="05" title="获客成本" subtitle="各渠道获客成本与投资回报率深度对比">
      <div className="space-y-12">
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          获客成本（CAC）是决定业务可持续性的核心指标。在留学行业，不同渠道的获客成本差异巨大——
          从百度SEM的200元/点击到口碑转介绍的零成本。选择正确的渠道组合，
          直接决定了你能否在激烈竞争中存活并盈利。
        </p>

        {/* 获客成本对比图 */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            各渠道获客成本 vs 投资回报率
          </h3>
          <p className="text-sm text-muted-foreground mb-6">获客成本越低、ROI越高的渠道越值得优先投入</p>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={CAC_COMPARISON}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="channel" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: 13 }}
                formatter={(value: number, name: string) =>
                  name === "cac" ? [`${value}元`, "获客成本"] : [`${value}x`, "ROI倍数"]
                }
              />
              <Legend formatter={(v) => v === "cac" ? "获客成本(元)" : "ROI倍数"} />
              <Bar yAxisId="left" dataKey="cac" fill="#1E3A5F" radius={[4, 4, 0, 0]} barSize={30} />
              <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#059669" strokeWidth={2.5} dot={{ r: 5, fill: "#059669" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* 渠道优先级推荐 */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#059669]/5 border border-[#059669]/20 rounded-xl p-6">
            <div className="text-xs font-semibold text-[#059669] tracking-wider uppercase mb-3">第一优先级</div>
            <h4 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>小红书 + 微信私域</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              小红书负责公域获客（10元/私信），微信负责私域转化（15%转化率）。
              这是成本最低、效果最好的组合，适合0-6个月的起步期。
            </p>
          </div>
          <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded-xl p-6">
            <div className="text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase mb-3">第二优先级</div>
            <h4 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>抖音 + 知乎</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              抖音用于品牌曝光和规模化获客，知乎用于深度种草和SEO长尾流量。
              适合6-12个月的扩张期。
            </p>
          </div>
          <div className="bg-[#D97706]/5 border border-[#D97706]/20 rounded-xl p-6">
            <div className="text-xs font-semibold text-[#D97706] tracking-wider uppercase mb-3">长期建设</div>
            <h4 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>口碑 + 线下</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              口碑转介绍是终极目标（零成本、60%转化率），线下宣讲会适合二三线城市深耕。
              需要12个月以上的积累。
            </p>
          </div>
        </div>

        <InsightCard
          title="获客成本决定生死线"
          content="假设每个学生佣金4000元，百度SEM获客成本200元+转化率3%意味着每成交1单需花费6600元，直接亏损。而小红书10元获客+8%转化率，每成交1单仅需125元，利润空间巨大。"
          color="red"
        />
      </div>
    </Section>
  );
}

function UCSISection() {
  return (
    <Section id="ucsi" number="06" title="UCSI竞争优势" subtitle="思特雅大学预科项目在竞品中的定位">
      <div className="space-y-12">
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          在马来西亚私立大学预科项目中，UCSI凭借"QS排名最高+学费最低+直升保障"的三重优势，
          形成了独特的竞争壁垒。以下是与主要竞品的详细对比分析。
        </p>

        {/* 对比表格 */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              马来西亚主要私立大学预科项目对比
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left py-3 px-4 font-semibold">维度</th>
                  <th className="text-center py-3 px-4 font-semibold bg-primary/5 text-primary">UCSI</th>
                  <th className="text-center py-3 px-4 font-semibold">泰莱 Taylor's</th>
                  <th className="text-center py-3 px-4 font-semibold">双威 Sunway</th>
                  <th className="text-center py-3 px-4 font-semibold">英迪 INTI</th>
                  <th className="text-center py-3 px-4 font-semibold">精英 HELP</th>
                </tr>
              </thead>
              <tbody>
                {UCSI_ADVANTAGE.map((row, idx) => (
                  <tr key={row.dimension} className={`border-b border-border/50 ${idx % 2 === 0 ? "" : "bg-muted/10"}`}>
                    <td className="py-3 px-4 font-medium">{row.dimension}</td>
                    <td className="py-3 px-4 text-center bg-primary/5 font-semibold text-primary">{row.ucsi}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.taylor}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.sunway}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.inti}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.help}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 三重优势 */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-[#1E3A5F] to-[#2563EB] rounded-xl p-6 text-white"
          >
            <div className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>#269</div>
            <h4 className="font-semibold text-lg mb-2">QS排名最高</h4>
            <p className="text-white/80 text-sm leading-relaxed">
              马来西亚私立大学中QS排名最高，超越泰莱(#259差距极小)，远超双威(#446)。
              QS前300可享上海等城市落户优惠。
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-[#059669] to-[#10B981] rounded-xl p-6 text-white"
          >
            <div className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>~4万</div>
            <h4 className="font-semibold text-lg mb-2">预科学费最低</h4>
            <p className="text-white/80 text-sm leading-relaxed">
              预科学费约4万人民币/年，仅为泰莱(7.5万)的一半，双威(6万)的2/3。
              总费用约10万/年，普通家庭可承受。
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-[#D97706] to-[#F59E0B] rounded-xl p-6 text-white"
          >
            <div className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>100%</div>
            <h4 className="font-semibold text-lg mb-2">直升保障</h4>
            <p className="text-white/80 text-sm leading-relaxed">
              完成预科课程后保障直升UCSI本科，无需额外考试。
              泰莱和双威的预科升本科是竞争性的，存在不确定性。
            </p>
          </motion.div>
        </div>

        <InsightCard
          title="UCSI预科的核心卖点：排名最高、学费最低、直升保障"
          content="这三个优势的组合在竞品中是独一无二的。营销时应反复强调这个'不可能三角'——通常排名高意味着学费高，但UCSI打破了这个规律。"
          color="green"
        />
      </div>
    </Section>
  );
}

function ActionSection() {
  return (
    <Section id="action" number="07" title="行动方案" subtitle="从零到一的可执行路线图">
      <div className="space-y-12">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <p className="text-muted-foreground leading-relaxed">
              基于以上调研结论，我们为你制定了分三个阶段的行动方案。
              核心策略是"线上获客为主、线下转化为辅"，优先攻克小红书+微信组合，
              逐步扩展到全渠道矩阵。
            </p>
          </div>
          <div className="md:col-span-2">
            <img src={IMAGES.actionPlan} alt="行动方案" className="rounded-lg shadow-md w-full" />
          </div>
        </div>

        {/* 时间线 */}
        <div className="space-y-8">
          {ACTION_TIMELINE.map((phase, idx) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white rounded-xl border border-border shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-4 p-6 border-b border-border" style={{ borderLeftWidth: 4, borderLeftColor: phase.color }}>
                <div className="text-3xl font-bold opacity-20" style={{ fontFamily: "var(--font-display)", color: phase.color }}>
                  {phase.phase}
                </div>
                <div>
                  <h4 className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                    {phase.title}
                  </h4>
                  <span className="text-sm text-muted-foreground">{phase.period}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-3">
                      核心任务
                    </div>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5"
                            style={{ backgroundColor: phase.color + "15", color: phase.color }}>
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">
                        关键KPI
                      </div>
                      <p className="text-sm font-medium text-foreground">{phase.kpi}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">
                        预算范围
                      </div>
                      <p className="text-sm font-medium text-foreground">{phase.budget}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 收益估算 */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            收益估算模型
          </h3>
          <p className="text-sm text-muted-foreground mb-6">基于不同招生规模的年度收益预测</p>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={REVENUE_MODEL}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="students" tick={{ fontSize: 12 }} label={{ value: "年招生人数", position: "insideBottom", offset: -5, fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: 13 }}
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = { totalRevenue: "总收入", annualProfit: "年利润" };
                  return [`${(value / 10000).toFixed(1)}万元`, labels[name] || name];
                }}
                labelFormatter={(v) => `年招生 ${v} 人`}
              />
              <Legend formatter={(v) => v === "totalRevenue" ? "总收入" : "年利润"} />
              <Area type="monotone" dataKey="totalRevenue" stroke="#1E3A5F" fill="#1E3A5F" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="annualProfit" stroke="#059669" fill="#059669" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-semibold">年招生</th>
                  <th className="text-right py-2 px-3 font-semibold">单人佣金</th>
                  <th className="text-right py-2 px-3 font-semibold">总收入</th>
                  <th className="text-right py-2 px-3 font-semibold">月运营成本</th>
                  <th className="text-right py-2 px-3 font-semibold">年利润</th>
                  <th className="text-left py-2 px-3 font-semibold">阶段</th>
                </tr>
              </thead>
              <tbody>
                {REVENUE_MODEL.map((r) => (
                  <tr key={r.students} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2 px-3 font-medium">{r.students}人</td>
                    <td className="py-2 px-3 text-right text-muted-foreground">{r.commission.toLocaleString()}元</td>
                    <td className="py-2 px-3 text-right font-medium">{(r.totalRevenue / 10000).toFixed(1)}万</td>
                    <td className="py-2 px-3 text-right text-muted-foreground">{(r.monthlyCost / 10000).toFixed(1)}万</td>
                    <td className={`py-2 px-3 text-right font-semibold ${r.annualProfit >= 0 ? "text-[#059669]" : "text-red-500"}`}>
                      {r.annualProfit >= 0 ? "+" : ""}{(r.annualProfit / 10000).toFixed(1)}万
                    </td>
                    <td className="py-2 px-3 text-muted-foreground">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <InsightCard
          title="年招生30人即可开始盈利"
          content="按每人佣金4000元计算，年招生30人可实现总收入12万，扣除月均运营成本8000元后，年利润约2.4万。规模化至200人时，年利润可达58万。关键是前3-6个月的获客能力建设。"
          color="amber"
        />
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0B1426] text-white/60 py-12 lg:ml-56">
      <div className="container max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="text-white font-semibold text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              UCSI预科招生 · 国内市场深度调研报告
            </div>
            <p className="text-sm max-w-md">
              本报告基于公开数据、行业报告和实操案例整理，仅供决策参考。
              数据截至2026年4月，市场情况可能随时间变化。
            </p>
          </div>
          <div className="text-sm">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-2">数据来源</div>
            <ul className="space-y-1">
              <li>EMGS马来西亚教育全球服务中心</li>
              <li>QS世界大学排名2026</li>
              <li>中国教育部留学服务中心</li>
              <li>行业公开报告与实操案例</li>
            </ul>
          </div>
        </div>
        <div className="h-px bg-white/10 my-8" />
        <div className="text-xs text-white/30 text-center">
          Report generated on April 2, 2026 · For internal decision-making use only
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <SideNav />
      <div className="lg:ml-56">
        <HeroSection />
        <MetricsBar />
        <MarketSection />
        <CompetitorSection />
        <ChannelSection />
        <PainPointSection />
        <CostSection />
        <UCSISection />
        <ActionSection />
        <Footer />
      </div>
    </div>
  );
}
