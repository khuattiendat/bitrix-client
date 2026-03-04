import { useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";

export default function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);

      // đổi trạng thái mỗi giây để nhấp nháy
      setBlink(now.getSeconds() % 2 === 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return (
    <div className="py-1 h-full min-w-[240px]">
      <div
        className={`
        ${blink ? "bg-transparent" : "bg-[#91b33e]"} 
        text-white px-3 py-1.5 rounded-lg 
        flex items-center gap-2 font-bold
        transition-colors duration-300
         h-full
      `}
      >
        <ClockCircleOutlined />
        <span className="text-[30px] font-medium">
          {displayHour}:{minutes}
        </span>
        <span className="text-base font-normal">{ampm}</span>
        <span className="border-l border-white/30 pl-2 text-base font-normal">
          CLOCK IN
        </span>
      </div>
    </div>
  );
}
