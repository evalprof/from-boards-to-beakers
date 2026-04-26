export function Stats() {
  const stats = [
    { n: "15", l: "Games" },
    { n: "15", l: "Activity Sheets" },
    { n: "30+", l: "At-Home Labs" },
    { n: "K–8", l: "Grade Range" },
  ];
  return (
    <div className="bg-white border-b border-ink-100 py-[0.9rem] px-8 flex justify-center gap-14 flex-wrap">
      {stats.map((s) => (
        <div key={s.l} className="text-center">
          <div className="font-display font-black text-2xl text-teal">
            {s.n}
          </div>
          <div className="text-[0.72rem] text-ink-400 uppercase tracking-[0.08em] font-bold">
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}
