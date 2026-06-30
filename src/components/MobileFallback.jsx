import React from 'react';
import { PROJECTS } from '../data/projects';

function MobileFallback() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 px-5 py-8 flex flex-col gap-6">
      {/* Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-sm text-emerald-400">
        🖥️ This portfolio is an interactive desktop OS — best experienced on a laptop or desktop browser. Here's a quick summary for mobile.
      </div>

      {/* About */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl">
          👤
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">Shourya Mathur</h1>
          <p className="text-emerald-400 text-xs">Full Stack Developer · Jaipur, India</p>
        </div>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed -mt-2">
        3rd year CS student at JECRC University building real products — not just coursework.
        Full-stack development with React, Node.js, and FastAPI, focused on shipping AI-integrated applications.
      </p>

      {/* Projects */}
      <div>
        <h2 className="text-white font-semibold text-sm mb-3">Projects</h2>
        <div className="flex flex-col gap-3">
          {PROJECTS.map(p => (
            <div key={p.id} className="bg-zinc-900/60 border border-zinc-700/40 rounded-xl p-4">
              <h3 className="text-white text-sm font-medium">{p.title}</h3>
              <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {p.tech.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono">
                    {t}
                  </span>
                ))}
              </div>
              {p.github && (
                <a // <-- Added the missing opening tag back here
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-emerald-400 text-xs"
                >
                  View on GitHub ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-2 mt-2">
        <h2 className="text-white font-semibold text-sm mb-1">Contact</h2>
        <a href="mailto:shourya06175@gmail.com" className="text-emerald-400 text-sm">📬 shourya06175@gmail.com</a>
        <a href="https://github.com/lost-user-23" target="_blank" rel="noopener noreferrer" className="text-zinc-400 text-sm">🐙 github.com/lost-user-23</a>
        <a href="https://linkedin.com/in/shourya-mathur-4820b0383" target="_blank" rel="noopener noreferrer" className="text-zinc-400 text-sm">💼 LinkedIn</a>
        
        <a // <-- Added the missing opening tag back here
          href="/Resume.pdf"
          download="Shourya_Mathur_Resume.pdf"
          className="mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm font-medium w-fit"
        >
          ⬇ Download Resume
        </a>
      </div>
    </div>
  )
}

export default MobileFallback;