/**
 * UCSI预科招生 · 国内市场深度调研报告
 * 设计风格：商业白皮书 · 深靛蓝+翡翠绿配色 · 杂志式排版
 * 包含：全渠道分析、KOL对标、用户画像、代理商体系、行动路线图
 */
import { useState, useEffect, useRef } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ScatterChart, Scatter, ResponsiveContainer, Cell,
} from "recharts";
import {
  channelData, userPersonas, kolBenchmarks,
  agencySystem, channelCostData, actionRoadmap, revenueModel
} from "@/lib/reportData2";

// ===== 工具函数 =====
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return val;
}

// ===== 侧边导航 =====
const navItems = [
  { id: "overview", label: "行业概览" },
  { id: "channels", label: "渠道全景" },
  { id: "kol", label: "KOL对标" },
  { id: "personas", label: "用户画像" },
  { id: "agency", label: "代理体系" },
  { id: "roadmap", label: "行动路线" },
];

function SideNav({ active }: { active: string }) {
  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${active === item.id ? "bg-blue-600 scale-150" : "bg-gray-300 group-hover:bg-blue-400"}`} />
          <span className={`text-xs font-medium transition-all duration-300 ${active === item.id ? "text-blue-600 opacity-100" : "text-gray-400 opacity-0 group-hover:opacity-100"}`}>
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}

// ===== 渠道卡片 =====
function ChannelCard({ channel, onClick }: { channel: typeof channelData[0]; onClick: () => void }) {
  return (
    <div
      className="cursor-pointer rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: channel.bgColor, borderColor: channel.color + "30" }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{channel.icon}</span>
          <div>
            <h3 className="font-bold text-gray-900 text-base">{channel.name}</h3>
            <span className="text-xs text-gray-500">月活 {channel.mau}</span>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: i <= channel.priority ? channel.color : "#E5E7EB" }}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{channel.userProfile}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: channel.color + "20", color: channel.color }}>
          {channel.phase}
        </span>
        <span className="text-xs text-gray-500">获客成本: {channel.acquisitionCost}</span>
      </div>
    </div>
  );
}

// ===== 渠道详情弹窗 =====
function ChannelModal({ channel, onClose }: { channel: typeof channelData[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{channel.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{channel.name}</h2>
              <p className="text-sm text-gray-500">月活用户 {channel.mau}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">✕</button>
        </div>
        <div className="p-6 space-y-5">
          {/* 核心数据 */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "用户画像", value: channel.userProfile },
              { label: "教育标签", value: channel.educationTag },
              { label: "获客成本", value: channel.acquisitionCost },
              { label: "转化率", value: channel.conversionRate },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
          {/* 内容形式 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">内容形式</h3>
            <p className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3">{channel.contentForm}</p>
          </div>
          {/* 运营策略 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">运营策略</h3>
            <ul className="space-y-2">
              {channel.strategy.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          {/* 爆款选题 */}
          {channel.hotTopics.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">爆款选题库</h3>
              <div className="space-y-2">
                {channel.hotTopics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-amber-50 rounded-lg px-3 py-2">
                    <span className="text-amber-500">💡</span>
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 实战数据 */}
          {channel.kpiData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-xs text-green-600 font-medium mb-1">行业实战数据</p>
              <p className="text-sm text-green-800">{channel.kpiData}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== 用户画像卡片 =====
function PersonaCard({ persona, isActive, onClick }: { persona: typeof userPersonas[0]; isActive: boolean; onClick: () => void }) {
  return (
    <div
      className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 ${isActive ? "shadow-lg scale-105" : "hover:shadow-md hover:scale-102"}`}
      style={{
        borderColor: isActive ? persona.color : "#E5E7EB",
        backgroundColor: isActive ? persona.color + "08" : "white",
      }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{persona.icon}</span>
        <div>
          <h3 className="font-bold text-gray-900">{persona.name}</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 rounded-full bg-gray-100 w-20 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${persona.percentage}%`, backgroundColor: persona.color }} />
            </div>
            <span className="text-sm font-medium" style={{ color: persona.color }}>{persona.percentage}%</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div><span className="text-gray-400">年龄：</span>{persona.studentAge}</div>
        <div><span className="text-gray-400">收入：</span>{persona.income}</div>
        <div className="col-span-2"><span className="text-gray-400">地域：</span>{persona.region}</div>
      </div>
    </div>
  );
}

// ===== 主组件 =====
export default function Home() {
  const [activeNav, setActiveNav] = useState("overview");
  const [selectedChannel, setSelectedChannel] = useState<typeof channelData[0] | null>(null);
  const [activePersona, setActivePersona] = useState(0);
  const [activeAgencyTab, setActiveAgencyTab] = useState<"b" | "c">("b");

  // 数字动画
  const { ref: statsRef, inView: statsInView } = useInView();
  const n1 = useCountUp(5800, statsInView);
  const n2 = useCountUp(56198, statsInView);
  const n3 = useCountUp(274, statsInView);
  const n4 = useCountUp(7, statsInView);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((n) => document.getElementById(n.id));
      const scrollY = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveNav(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radarData = channelData.slice(0, 6).map((c) => ({
    channel: c.name,
    优先级: c.priority,
    转化率: c.conversionRate === "最高（信任基础最强）" ? 5 : c.conversionRate === "高（精准流量）" ? 4 : c.conversionRate === "中高（深度种草，决策质量高）" ? 3 : 2,
    获客难度: c.difficulty,
  }));

  const costChartData = channelCostData.map((d) => ({
    name: d.channel,
    获客成本: Math.min(d.cpa, 1000),
    转化质量: d.conversion,
  }));

  const revenueChartData = revenueModel.map((r) => ({
    name: r.scenario,
    年营收: r.revenue,
    年成本: r.cost,
    年利润: r.profit,
  }));

  const persona = userPersonas[activePersona];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SideNav active={activeNav} />
      {selectedChannel && <ChannelModal channel={selectedChannel} onClose={() => setSelectedChannel(null)} />}

      {/* ===== Hero ===== */}
      <section id="overview" className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-emerald-400 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            2025-2026 深度调研报告 · 国内市场版
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            UCSI预科招生<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">国内市场竞争图谱</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed">
            全渠道获客策略 · KOL博主对标 · 用户画像分层 · 双轨代理商体系设计<br />
            帮你在国内社媒战场中找到突破口，建立可持续的招生增长引擎
          </p>

          {/* 核心数据 */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: n1, suffix: "亿", label: "留学市场规模（元）", color: "from-blue-400 to-blue-600" },
              { val: n2, suffix: "人", label: "在马中国学生（2024）", color: "from-emerald-400 to-emerald-600" },
              { val: n3, suffix: "%", label: "5年增长幅度", color: "from-amber-400 to-amber-600" },
              { val: n4, suffix: "大", label: "国内主流获客渠道", color: "from-purple-400 to-purple-600" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
                <div className={`text-3xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.val.toLocaleString()}{item.suffix}
                </div>
                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 渠道全景 ===== */}
      <section id="channels" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-blue-600 rounded-full" />
            <h2 className="text-2xl font-black text-gray-900">国内全渠道获客图谱</h2>
          </div>
          <p className="text-gray-500 ml-4">8大主流渠道深度解析，点击任意渠道查看详细运营策略</p>
        </div>

        {/* 渠道卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {channelData.map((ch) => (
            <ChannelCard key={ch.id} channel={ch} onClick={() => setSelectedChannel(ch)} />
          ))}
        </div>

        {/* 获客成本对比图 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-1">各渠道获客成本对比</h3>
            <p className="text-xs text-gray-400 mb-4">（百度SEM已按比例压缩显示，实际约6000元/客户）</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={costChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={70} />
                <Tooltip formatter={(v: number, name: string) => [name === "获客成本" ? `${v}元` : `${v}%`, name]} />
                <Bar dataKey="获客成本" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-1">渠道优先级雷达图</h3>
            <p className="text-xs text-gray-400 mb-4">综合考量优先级、转化率、获客难度</p>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="channel" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 9 }} />
                <Radar name="优先级" dataKey="优先级" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                <Radar name="转化率" dataKey="转化率" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 渠道优先级表 */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">渠道优先级决策矩阵</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {["渠道", "月活用户", "获客成本", "转化率", "内容形式", "启动阶段", "优先级"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {channelData.map((ch, i) => (
                  <tr key={ch.id} className={`border-t border-gray-50 hover:bg-gray-50 cursor-pointer ${i % 2 === 0 ? "" : "bg-gray-50/50"}`} onClick={() => setSelectedChannel(ch)}>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <span className="mr-2">{ch.icon}</span>{ch.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{ch.mau}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{ch.acquisitionCost}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{ch.conversionRate}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{ch.contentForm}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${ch.phase === "第一阶段" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                        {ch.phase}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <div key={s} className={`w-3 h-3 rounded-sm ${s <= ch.priority ? "bg-blue-500" : "bg-gray-200"}`} />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== KOL对标 ===== */}
      <section id="kol" className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-emerald-400 rounded-full" />
              <h2 className="text-2xl font-black text-white">KOL博主对标分析</h2>
            </div>
            <p className="text-slate-400 ml-4">小红书 & 抖音头部/腰部/尾部博主生态，找准你的差异化定位</p>
          </div>

          {/* KOL金字塔 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* 小红书 */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-red-400">📕</span> 小红书博主矩阵
              </h3>
              <div className="space-y-3">
                {kolBenchmarks.xiaohongshu.map((kol, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${kol.level === "头部" ? "bg-amber-500/20 text-amber-400" : kol.level === "腰部" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                          {kol.level}
                        </span>
                        <span className="font-semibold text-white text-sm">{kol.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">粉丝 {kol.fans}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{kol.contentFocus}</p>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                      <p className="text-xs text-emerald-400">💡 学习要点：{kol.learningPoint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 抖音 */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>🎵</span> 抖音博主矩阵
              </h3>
              <div className="space-y-3">
                {kolBenchmarks.douyin.map((kol, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${kol.level === "头部" ? "bg-amber-500/20 text-amber-400" : kol.level === "腰部" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                          {kol.level}
                        </span>
                        <span className="font-semibold text-white text-sm">{kol.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">粉丝 {kol.fans}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{kol.contentFocus}</p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
                      <p className="text-xs text-blue-400">💡 学习要点：{kol.learningPoint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOL合作策略 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">KOL金字塔合作策略</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { level: "头部KOL", count: "2-3个", cost: "5000-2万/篇", role: "品牌声量", color: "#FBBF24" },
                { level: "腰部KOL", count: "10-15个", cost: "1000-5000/篇", role: "主力转化", color: "#60A5FA" },
                { level: "尾部KOC", count: "30-50个", cost: "200-1000/篇", role: "口碑铺量", color: "#34D399" },
                { level: "素人博主", count: "100+个", cost: "50-200/篇", role: "真实感背书", color: "#A78BFA" },
              ].map((item) => (
                <div key={item.level} className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: item.color + "30", border: `2px solid ${item.color}` }}>
                    {item.count}
                  </div>
                  <p className="font-semibold text-white text-sm">{item.level}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.cost}</p>
                  <p className="text-xs mt-1 font-medium" style={{ color: item.color }}>{item.role}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <p className="text-amber-400 font-semibold text-sm mb-2">📢 第一波：头部KOL</p>
                <p className="text-xs text-slate-300">发布「马来西亚留学全攻略」建立话题，打响品牌声量</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-blue-400 font-semibold text-sm mb-2">🎯 第二波：腰部KOL</p>
                <p className="text-xs text-slate-300">跟进「UCSI预科深度测评」精准种草，承担主要转化</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-emerald-400 font-semibold text-sm mb-2">💬 第三波：KOC+素人</p>
                <p className="text-xs text-slate-300">铺量「我为什么选择UCSI」真实故事，形成「到处都在讨论」氛围</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <p className="text-purple-400 font-semibold text-sm mb-2">🔍 第四波：搜索截流</p>
                <p className="text-xs text-slate-300">优化「UCSI预科」「马来西亚预科」等关键词排名，截流竞品流量</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 用户画像 ===== */}
      <section id="personas" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-purple-600 rounded-full" />
            <h2 className="text-2xl font-black text-gray-900">目标用户画像分层</h2>
          </div>
          <p className="text-gray-500 ml-4">4大核心用户群体，精准定位，差异化内容策略</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {userPersonas.map((p, i) => (
            <PersonaCard key={p.id} persona={p} isActive={activePersona === i} onClick={() => setActivePersona(i)} />
          ))}
        </div>

        {/* 画像详情 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100" style={{ backgroundColor: persona.color + "08" }}>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{persona.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{persona.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span>占比 <strong style={{ color: persona.color }}>{persona.percentage}%</strong></span>
                  <span>决策周期 <strong>{persona.decisionCycle}</strong></span>
                  <span>UCSI匹配度 <strong style={{ color: persona.color }}>{persona.ucsiMatch}</strong></span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* 基本信息 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">基本信息</h4>
              <div className="space-y-2 text-sm">
                {[
                  { label: "学生年龄", value: persona.studentAge },
                  { label: "家长年龄", value: persona.parentAge },
                  { label: "家庭收入", value: persona.income },
                  { label: "主要地域", value: persona.region },
                  { label: "成绩情况", value: persona.score },
                ].map((item) => (
                  <div key={item.label} className="flex gap-2">
                    <span className="text-gray-400 w-20 flex-shrink-0">{item.label}</span>
                    <span className="text-gray-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* 核心痛点 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">核心痛点</h4>
              <div className="space-y-2">
                {persona.painPoints.map((p, i) => (
                  <div key={i} className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-700 mb-1">{p.point}</p>
                    <p className="text-xs text-red-600">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* 决策路径 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">决策路径</h4>
              <div className="space-y-2">
                {persona.decisionPath.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: persona.color }}>
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: persona.color + "10", border: `1px solid ${persona.color}30` }}>
                <p className="text-xs font-semibold mb-1" style={{ color: persona.color }}>核心营销信息</p>
                <p className="text-sm text-gray-700">{persona.keyMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 代理商体系 ===== */}
      <section id="agency" className="bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-amber-500 rounded-full" />
              <h2 className="text-2xl font-black text-gray-900">双轨代理商体系设计</h2>
            </div>
            <p className="text-gray-500 ml-4">B端主动拓展 + C端客户裂变，构建自运转的招生增长飞轮</p>
          </div>

          {/* Tab切换 */}
          <div className="flex gap-2 mb-8">
            {[
              { key: "b", label: "🏢 B端主动拓展型", desc: "机构/个人代理" },
              { key: "c", label: "👨‍👩‍👧 C端客户裂变型", desc: "家长推广大使" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveAgencyTab(tab.key as "b" | "c")}
                className={`flex-1 rounded-xl px-4 py-3 text-left transition-all duration-200 ${activeAgencyTab === tab.key ? "bg-white shadow-md border-2 border-blue-200" : "bg-white/50 border border-gray-200 hover:bg-white"}`}
              >
                <p className={`font-semibold text-sm ${activeAgencyTab === tab.key ? "text-blue-700" : "text-gray-600"}`}>{tab.label}</p>
                <p className="text-xs text-gray-400">{tab.desc}</p>
              </button>
            ))}
          </div>

          {activeAgencyTab === "b" ? (
            <div className="space-y-6">
              {/* B端分级 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agencySystem.bEnd.tiers.map((tier) => (
                  <div key={tier.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: tier.color }}>
                      {tier.name[0]}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{tier.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{tier.annual}</p>
                    <div className="text-2xl font-black text-blue-600 mb-1">{tier.commission}</div>
                    <p className="text-xs text-gray-400 mb-3">元/人</p>
                    {tier.bonus !== "无" && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                        <p className="text-xs text-amber-700">🎁 {tier.bonus}</p>
                      </div>
                    )}
                    <div className="space-y-1">
                      {tier.support.map((s, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs text-gray-600">
                          <span className="text-emerald-500">✓</span> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* 招募渠道 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">代理商招募渠道</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {agencySystem.bEnd.recruitChannels.map((ch) => (
                    <div key={ch.channel} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${ch.potential === "极高" ? "bg-red-500" : ch.potential === "高" ? "bg-amber-500" : "bg-blue-400"}`} />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{ch.channel}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{ch.note}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${ch.potential === "极高" ? "bg-red-100 text-red-700" : ch.potential === "高" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                          潜力：{ch.potential}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* C端三级分销 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6">三级分销裂变体系</h3>
                <div className="space-y-4">
                  {agencySystem.cEnd.levels.map((level, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-transparent border border-blue-100">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-gray-900">{level.level}</h4>
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{level.name}</span>
                          <span className="text-lg font-black text-blue-600">{level.commission}</span>
                          <span className="text-xs text-gray-500">元/人</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{level.condition}</p>
                        <div className="bg-amber-50 rounded-lg px-3 py-2">
                          <p className="text-xs text-amber-700">📝 示例：{level.example}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 激励机制 + 合规 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">激励机制</h3>
                  <div className="space-y-3">
                    {agencySystem.cEnd.incentives.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-amber-500 text-lg">🏆</span>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">合规性设计</h3>
                  <div className="space-y-3">
                    {agencySystem.cEnd.compliance.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-xs text-emerald-700 font-semibold mb-1">⚠️ 重要提示</p>
                    <p className="text-xs text-emerald-600">三级分销是法律允许的上限，切勿超过三级，避免被认定为传销</p>
                  </div>
                </div>
              </div>
              {/* 工具支持 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">推广大使工具包</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {agencySystem.cEnd.tools.map((tool, i) => (
                    <div key={i} className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl mb-2">
                        {["🔗", "🎨", "👥", "📱"][i]}
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{tool.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== 行动路线图 ===== */}
      <section id="roadmap" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-emerald-600 rounded-full" />
            <h2 className="text-2xl font-black text-gray-900">三阶段行动路线图</h2>
          </div>
          <p className="text-gray-500 ml-4">从冷启动到规模化，每个阶段的核心任务与KPI目标</p>
        </div>

        <div className="space-y-6 mb-12">
          {actionRoadmap.map((phase, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4" style={{ backgroundColor: phase.color + "10", borderBottom: `2px solid ${phase.color}20` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: phase.color }}>
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">{phase.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: phase.color }}>
                      {phase.period}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">核心任务</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.tasks.map((task, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-5 h-5 rounded flex items-center justify-center text-xs text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: phase.color }}>
                          {j + 1}
                        </div>
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">阶段KPI目标</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{phase.kpi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 收益估算 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">收益估算模型（基于4000元/人佣金）</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => [`${v}万元`, ""]} />
                  <Legend />
                  <Bar dataKey="年营收" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="年成本" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="年利润" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      {["情景", "月招生", "年招生", "年营收", "年成本", "年利润"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {revenueModel.map((r, i) => (
                      <tr key={i} className="border-t border-gray-50">
                        <td className="px-3 py-3 font-medium text-gray-900">{r.scenario}</td>
                        <td className="px-3 py-3 text-gray-600">{r.monthly}人</td>
                        <td className="px-3 py-3 text-gray-600">{r.annual}人</td>
                        <td className="px-3 py-3 text-blue-600 font-semibold">{r.revenue}万</td>
                        <td className="px-3 py-3 text-amber-600">{r.cost}万</td>
                        <td className="px-3 py-3 font-bold text-emerald-600">{r.profit}万</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">UCSI预科招生 · 国内市场深度调研报告 · 2025-2026</p>
          <p className="text-xs mt-2 text-slate-500">数据来源：ICEF、启德教育、芥末堆、小红书官方、抖音官方等公开数据综合整理</p>
        </div>
      </footer>
    </div>
  );
}
