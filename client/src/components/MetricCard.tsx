/**
 * MetricCard — 核心指标卡片
 * Design: 大数字+标签，带计数器动画
 */
import { useCountUp } from "@/hooks/useCountUp";

interface MetricCardProps {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
}

export default function MetricCard({ label, value, suffix = "", prefix = "" }: MetricCardProps) {
  const numValue = parseInt(value.replace(/,/g, ""), 10);
  const { count, ref } = useCountUp(numValue, 2000);

  const formatNumber = (n: number) => {
    return n.toLocaleString("en-US");
  };

  return (
    <div ref={ref} className="text-center p-6">
      <div
        className="text-3xl md:text-4xl font-bold text-primary mb-2 tabular-nums"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {prefix}{formatNumber(count)}{suffix}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
}
