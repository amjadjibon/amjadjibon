interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'itertools',
    description:
      'Golang iterator utility library — ergonomic, generic iteration primitives for Go 1.22+.',
    href: 'https://github.com/amjadjibon/itertools',
  },
  {
    title: 'memsh',
    description:
      'A virtual in-memory shell. Runs shell-like commands against an in-memory filesystem — useful for sandboxing and testing.',
    href: 'https://github.com/amjadjibon/memsh',
  },
  {
    title: 'munin',
    description:
      'A terminal UI framework written in Odin. Explores low-level TUI rendering without Go or Rust.',
    href: 'https://github.com/amjadjibon/munin',
  },
  {
    title: 'valkyrie',
    description: 'A CLI application framework for the Odin programming language.',
    href: 'https://github.com/amjadjibon/valkyrie',
  },
  {
    title: 'agentic',
    description:
      'Curated AI agents built with LangGraph — composable, production-ready agent patterns in Python.',
    href: 'https://github.com/amjadjibon/agentic',
  },
  {
    title: 'mlx-llm-api',
    description:
      'OpenAI-compatible API server for running local LLMs via Apple MLX on Apple Silicon.',
    href: 'https://github.com/amjadjibon/mlx-llm-api',
  },
  {
    title: 'raftd',
    description:
      'Distributed key-value store built on the Hashicorp Raft consensus algorithm and gRPC.',
    href: 'https://github.com/amjadjibon/raftd',
  },
  {
    title: 'htemplx',
    description:
      'Full-stack Go web starter using HTMX and Templ — a productive alternative to heavy JS frameworks.',
    href: 'https://github.com/amjadjibon/htemplx',
  },
  {
    title: 'dbank',
    description: 'Digital banking backend in Go — account management, transactions, and transfers.',
    href: 'https://github.com/amjadjibon/dbank',
  },
  {
    title: 'termchess',
    description: 'A fully playable chess playground in the terminal, built with Go and Bubble Tea.',
    href: 'https://github.com/amjadjibon/termchess',
  },
  {
    title: 'finextractpro',
    description:
      'Financial data extraction tool — parses and structures financial documents using TypeScript.',
    href: 'https://github.com/amjadjibon/finextractpro',
  },
  {
    title: 'vessel',
    description: 'Docker Desktop — a TypeScript-based UI for managing Docker containers locally.',
    href: 'https://github.com/amjadjibon/vessel',
  },
]

export default projectsData
