function About() {
  return (
    <div className="h-full flex flex-col gap-6 text-sm">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl">
          👤
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Shourya Mathur</h1>
          <p className="text-emerald-400 text-xs mt-0.5">Full Stack Developer · AI Integrations · Jaipur, India</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-zinc-400 leading-relaxed">
        3rd year CS student at JECRC University building real products — not just coursework. 
        I specialize in full-stack development with React, Node.js, and FastAPI, with a focus 
        on shipping AI-integrated applications at the product level.
      </p>

      {/* Quick facts */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'University', value: 'JECRC University' },
          { label: 'Degree', value: 'B.Tech CSE' },
          { label: 'Focus', value: 'Full Stack + AI' },
          { label: 'Status', value: '🟢 Open to internships' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700/40">
            <p className="text-zinc-500 text-xs mb-1">{label}</p>
            <p className="text-zinc-200 text-xs font-medium">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About