/**
 * Section — 章节容器
 * Design: 商业白皮书风格，带编号和标题的章节
 */
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export default function Section({ id, number, title, subtitle, children, className = "", fullWidth = false }: SectionProps) {
  const { isInView, ref } = useInView(0.1);

  return (
    <section id={id} className={`py-16 md:py-24 ${className}`} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={fullWidth ? "" : "container max-w-5xl"}
      >
        <div className={fullWidth ? "container max-w-5xl" : ""}>
          <div className="flex items-baseline gap-4 mb-2">
            <span
              className="text-5xl md:text-6xl font-bold text-primary/10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {number}
            </span>
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-10" />
        </div>
        <div className={fullWidth ? "" : ""}>{children}</div>
      </motion.div>
    </section>
  );
}
