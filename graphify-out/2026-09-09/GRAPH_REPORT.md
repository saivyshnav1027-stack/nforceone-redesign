# Graph Report - Nforceone  (2026-09-09)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 30 nodes · 25 edges · 7 communities (4 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e5faffef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- extract_brand.js
- devDependencies
- ui.spec.js
- scripts
- playwright.config.js

## God Nodes (most connected - your core abstractions)
1. `@playwright/test` - 2 edges
2. `scripts` - 2 edges
3. `author` - 1 edges
4. `keywords` - 1 edges
5. `license` - 1 edges
6. `main` - 1 edges
7. `{ chromium }` - 1 edges
8. `fs` - 1 edges
9. `path` - 1 edges
10. `@playwright/test` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (7 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.22
Nodes (8): author, description, keywords, license, main, name, type, version

### Community 2 - "extract_brand.js"
Cohesion: 0.50
Nodes (3): { chromium }, fs, path

### Community 3 - "devDependencies"
Cohesion: 0.67
Nodes (3): devDependencies, @playwright/test, @playwright/test

## Knowledge Gaps
- **16 isolated node(s):** `author`, `description`, `keywords`, `license`, `main` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `author`, `description`, `keywords` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._