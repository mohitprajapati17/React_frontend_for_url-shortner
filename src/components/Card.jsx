import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
const Card = ({ title, desc, image, animation = "float", compact = false }) => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 });

  const onMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (x - 0.5) * 14; // left/right
    const rotateX = (0.5 - y) * 14; // up/down
    setTilt({ rx: rotateX, ry: rotateY, scale: 1.02 });
  };

  const onMouseLeave = () => setTilt({ rx: 0, ry: 0, scale: 1 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="gradient-border card-hover w-full max-w-[520px] mx-auto"
      style={{ perspective: 1000 }}
    >
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`card-surface rounded-[11px] p-6 flex flex-col gap-3 ${compact ? "h-72 md:h-80" : "h-96 md:h-[26rem]"}`}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.scale})`,
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "transform 200ms ease-out",
        }}
      >
        <h1 className="text-yellow-400 text-2xl font-bold" style={{ transform: "translateZ(22px)" }}>{title}</h1>
        <p className="text-gray-300 text-base" style={{ transform: "translateZ(14px)" }}> {desc}</p>
        {/* image intentionally removed per latest request */}
      </div>
    </motion.div>
  );
};

export default Card;