import React from 'react';

function Resume() {
  return (
    <div className="h-full flex flex-col gap-3 p-4 bg-zinc-900 text-white">
      {/* Download button */}
      <div className="flex items-center justify-between shrink-0">
        <p className="text-zinc-500 text-xs">Shourya_Mathur_Resume.pdf</p>
        <a
          href="/Resume.pdf"
          download="Shourya_Mathur_Resume.pdf"
          onMouseDown={(e) => e.stopPropagation()} // <-- Fixed the missing handler syntax here
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-medium transition-colors"
        >
          ⬇ Download
        </a>
      </div>
 
      {/* PDF viewer */}
      <div className="flex-1 w-full rounded-lg border border-zinc-700/40 overflow-hidden min-h-[500px]">
        <iframe
          src="/Resume.pdf"
          className="w-full h-full border-0"
          title="Resume"
        />
      </div>
    </div>
  )
}
 
export default Resume;