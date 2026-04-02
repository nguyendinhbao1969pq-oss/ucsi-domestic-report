/**
 * SideNav — 侧边导航栏
 * Design: 商业白皮书风格，固定左侧，跟随滚动高亮当前章节
 */
import { useState, useEffect } from "react";
import { NAV_SECTIONS } from "@/lib/reportData";
import { motion } from "framer-motion";

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));
      const scrollY = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 backdrop-blur-sm border border-border rounded-lg p-2 shadow-md"
        aria-label="Toggle navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 h-full z-40 bg-white/95 backdrop-blur-md border-r border-border shadow-sm
          transition-transform duration-300 w-56
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="pt-8 pb-4 px-5">
          <div className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-1">
            调研报告
          </div>
          <div className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            UCSI预科 · 国内市场
          </div>
        </div>

        <div className="h-px bg-border mx-5 mb-4" />

        <ul className="space-y-0.5 px-3">
          {NAV_SECTIONS.map((section, idx) => (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-all duration-200 flex items-center gap-3
                  ${activeSection === section.id
                    ? "bg-primary/8 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                <span className="text-xs font-mono w-5 text-right opacity-50">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span>{section.label}</span>
                {activeSection === section.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 w-0.5 h-6 bg-primary rounded-r"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-6 left-0 right-0 px-5">
          <div className="text-[10px] text-muted-foreground/60 leading-relaxed">
            报告生成日期<br />2026年4月2日
          </div>
        </div>
      </nav>
    </>
  );
}
