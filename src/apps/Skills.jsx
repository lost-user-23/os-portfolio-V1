import { SKILLS } from "../data/skills"

const colorMap = {
    blue: "bg-blue-500/10 border-blue-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20",
    violet: "bg-violet-500/10 border-violet-500/20",
    orange: "bg-orange-500/10 border-orange-500/20"
}

const labelColor = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    violet: "text-violet-400",
    orange: "text-orange-400"
}

const badgeColor = {
    blue: "bg-blue-500/10 text-blue-300",
    emerald: "bg-emerald-500/10 text-emerald-300",
    violet: "bg-violet-500/10 text-violet-300",
    orange: "bg-orange-500/10 text-orange-300"
}

function Skills() {

    return (
        <div className="h-full flex flex-col gap-4 text-sm">
            <p className="text-zinc-500 text-xs">
                {SKILLS.reduce((acc, s) => acc + s.items.length, 0)} technologies across {SKILLS.length} categories
            </p>
            <div className="flex flex-col gap-3 overflow-auto">
                {SKILLS.map(skill => (
                    <div
                        key={skill.category}
                        className={`rounded-xl border p-4 flex flex-col gap-3 ${colorMap[skill.color]}`}
                    >
                        <h3 className={`text-xs font-semibold uppercase tracking-wider ${labelColor[skill.color]}`}>
                            {skill.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skill.items.map(item => (
                                <span
                                    key={item}
                                    className={`text-xs px-2.5 py-1 rounded-full font-mono ${badgeColor[skill.color]}`}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Skills