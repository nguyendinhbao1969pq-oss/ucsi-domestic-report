/**
 * InsightCard — 关键洞察便签卡片
 * Design: 模拟便利贴效果，突出关键发现
 */
import { motion } from "framer-motion";

interface InsightCardProps {
  title: string;
  content: string;
  color?: "blue" | "green" | "amber" | "red";
}

const colorMap = {
  blue: "border-l-[#1E3A5F] bg-[#1E3A5F]/5",
  green: "border-l-[#059669] bg-[#059669]/5",
  amber: "border-l-[#D97706] bg-[#D97706]/5",
  red: "border-l-[#DC2626] bg-[#DC2626]/5",
};

export default function InsightCard({ title, content, color = "blue" }: InsightCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 25px -5px rgba(0,0,0,0.08)" }}
      className={`border-l-4 ${colorMap[color]} rounded-r-lg p-5 transition-all`}
    >
      <div className="flex items-center gap-2 mb-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary/60">
          <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="currentColor" />
        </svg>
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          关键洞察
        </span>
      </div>
      <h4 className="font-semibold text-foreground mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </motion.div>
  );
}
