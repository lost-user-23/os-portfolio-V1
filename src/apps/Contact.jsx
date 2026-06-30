function Contact() {
  const links = [
    {
      label: 'Email',
      value: 'shourya06175@gmail.com',
      href: 'mailto:shourya06175@gmail.com',
      icon: '📬',
    },
    {
      label: 'GitHub',
      value: 'github.com/lost-user-23',
      href: 'https://github.com/lost-user-23',
      icon: '',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/shourya-mathur-4820b0383/',
      href: 'https://www.linkedin.com/in/shourya-mathur-4820b0383/',
      icon: '',
    },
  ]

  return (
    <div className="h-full flex flex-col gap-6 text-sm">
      {/* Header */}
      <div>
        <h2 className="text-white font-semibold text-base">Let's work together</h2>
        <p className="text-zinc-400 text-xs mt-1">
          Open to internships, freelance projects, and interesting collabs.
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3">
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseDown={e => e.stopPropagation()}
            className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-700/40 hover:border-zinc-500/60 hover:bg-zinc-800/60 transition-all group"
          >
            <span className="text-2xl">{link.icon}</span>
            <div>
              <p className="text-zinc-500 text-xs">{link.label}</p>
              <p className="text-zinc-200 text-xs font-medium group-hover:text-white transition-colors">
                {link.value}
              </p>
            </div>
            <span className="ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors text-xs">↗</span>
          </a>
        ))}
      </div>

      {/* Availability badge */}
      <div className="mt-auto flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <p className="text-emerald-400 text-xs font-medium">Available for internships — Summer 2026</p>
      </div>
    </div>
  )
}

export default Contact