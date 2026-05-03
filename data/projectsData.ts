interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'htemplx',
    description:
      'Modern full-stack web starter built with Golang, HTMX, Templ, and Tailwind CSS. A productive alternative to heavyweight JS frameworks for server-driven UIs.',
    href: 'https://github.com/amjadjibon/htemplx',
  },
  {
    title: 'raftd',
    description:
      'Toy implementation of a distributed key-value store using the Raft consensus algorithm and gRPC. Built to deepen understanding of distributed systems fundamentals.',
    href: 'https://github.com/amjadjibon/raftd',
  },
  {
    title: 'termchess',
    description:
      'A fully playable chess playground that runs in the terminal, built with Go and the Bubble Tea TUI framework.',
    href: 'https://github.com/amjadjibon/termchess',
  },
]

export default projectsData
