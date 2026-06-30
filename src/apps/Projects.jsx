import { PROJECTS } from '../data/projects'

const colorMap = {
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  blue:    'bg-blue-500/10 border-blue-500/20 text-blue-400',
  violet:  'bg-violet-500/10 border-violet-500/20 text-violet-400',
  orange:  'bg-orange-500/10 border-orange-500/20 text-orange-400',
}

const badgeColor = {
  emerald: 'bg-emerald-500/10 text-emerald-400',
  blue:    'bg-blue-500/10 text-blue-400',
  violet:  'bg-violet-500/10 text-violet-400',
  orange:  'bg-orange-500/10 text-orange-400',
}

function Projects() {
  return (
    <div className="h-full flex flex-col gap-4 text-sm">
      <p className="text-zinc-500 text-xs">
        {PROJECTS.length} projects · click links to open repo
      </p>

      <div className="flex flex-col gap-3 overflow-auto">
        {PROJECTS.map(project => (
          <div
            key={project.id}
            className={`rounded-xl border p-4 flex flex-col gap-2 ${colorMap[project.color]}`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-white text-sm">{project.title}</h3>
              <div className="flex gap-2 shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                    onMouseDown={e => e.stopPropagation()}
                  >
                    GitHub ↗
                  </a>
                )}
                {project.live && project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                    onMouseDown={e => e.stopPropagation()}
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.tech.map(t => (
                <span
                  key={t}
                  className={`text-xs px-2 py-0.5 rounded-full font-mono ${badgeColor[project.color]}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects