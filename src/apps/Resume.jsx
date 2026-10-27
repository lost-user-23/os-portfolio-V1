const RESUME_URL = '/Resume.pdf'

function Resume() {
  return (
    <div className="h-full flex flex-col gap-3 p-4 bg-zinc-900 text-white">
      {/* Download button */}
      <div className="flex items-center justify-between shrink-0">
        <p className="text-zinc-400 text-xs">Shourya_Mathur_Resume.pdf</p>
        <a
          href={RESUME_URL}
          download="Shourya_Mathur_Resume.pdf"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-medium transition-colors"
        >
          ⬇ Download
        </a>
      </div>

      {/* PDF viewer. The children render only if the browser cannot show a PDF inline. */}
      <div className="flex-1 w-full min-h-0 rounded-lg border border-zinc-700/40 overflow-hidden">
        <object
          data={RESUME_URL}
          type="application/pdf"
          aria-label="Resume PDF"
          className="w-full h-full"
        >
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center p-6">
            <p className="text-zinc-300 text-sm">Your browser cannot display the PDF here.</p>
            <div className="flex gap-3 text-xs">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline underline-offset-2"
              >
                Open in a new tab
              </a>
              <a
                href={RESUME_URL}
                download="Shourya_Mathur_Resume.pdf"
                className="text-emerald-400 underline underline-offset-2"
              >
                Download it
              </a>
            </div>
          </div>
        </object>
      </div>
    </div>
  )
}

export default Resume
