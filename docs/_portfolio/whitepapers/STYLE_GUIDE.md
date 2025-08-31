# Context Engineer: Lean Edition v2 — Style Guide

Purpose
- Ensure consistent narrative voice, terminology, and structure across all v2 edits.
- Reduce review cycles by standardizing patterns (headings, diagrams, references).

Voice and Perspective
- Narrative: neutral third-person. Avoid first-person author voice ("I/we") except inside direct quotes or exercises addressed to the reader.
- Characters: use Developer A, Developer B, and Manager for narrative scenes. Use generic role labels (Engineer, Finance Lead, Facilitator) elsewhere.
- Tone: clear, direct, instructional; avoid hype.

Terminology and Concepts
- Context Trinity (files): DEVLOG.md (append-only decisions), EPIC_MANAGEMENT.md (feature state), SYSTEM_STATUS.md (operational status). PROJECT_CONTEXT.md is the immutable ruleset.
- Four Pillars: Persistent Context; Living Documentation; Explicit State; Cost-Conscious Architecture.
- Principles: Compression Law; Living Memory Law; Cost Physics Law; Integration Law.
- Golden Retriever Syndrome: enthusiastic rebuilding without situational awareness.

Style Rules
- Chapter openers: prefer a timestamp/location line for narrative chapters (e.g., "December 17, 2024, 9:15 AM").
- Replace product-specific names with generics (e.g., QuizMentor → quiz app; Omni Hypothesis → Integration Hypothesis).
- Limit MongoDB mentions to ~4–5 strategic references across the document.
- Data/Logs: use fenced blocks with minimal commentary; prefer compact tables or bullet stats.
- Diagrams: ASCII in fenced blocks, <= 80 columns where practical. Label key entities explicitly (e.g., PROJECT_CONTEXT.md).
- Decisions vs. Intentions: prefer facts about what exists/was decided over plans.
- Avoid ambiguous phrases ("mostly done"); use explicit state lists with "Working" vs. "Not Working".

Headings and Structure
- Parts (I–IV), Chapters (H2), Subsections (H3/H4) with consistent title casing.
- Include "Discovery → Principle" sub-section at the end of experiment chapters.
- Keep anti-patterns consolidated in Chapter 8.
- Appendices: A (Exercises), B (Templates/Tools), C (Cost Calculators), D (Glossary), E (Implementation Playbooks).

Code and Fences
- Use language tags: markdown, bash, python, typescript, yaml, ts, javascript where applicable.
- Inline file names in code: prefer comments or headings above snippets (e.g., "# .github/workflows/ci.yml").
- Avoid overly long code excerpts unless necessary; prefer representative slices.

Cross-Referencing
- Use clear references: "See Chapter 7: The Context Engineering Framework (Four Pillars)" or "See Appendix B: Templates and Tools".
- Keep Appendix B references pointing to "The Essential Toolkit" in Chapter 7.

Metrics and Claims
- When citing productivity or cost, include method or short formula (see Measurement Methodology in Chapter 7).
- Prefer weekly commit/LOC trend lines for before/after comparisons.

Language Conventions
- Prefer "AI" over specific provider names unless necessary.
- Use "team", "engineer", or role nouns instead of "we" in narrative.
- Keep contractions sparingly; prefer formal tone in core chapters.

Change Management
- For each chapter revision, include a PR/diff summary (2–3 sentences), a checklist of applied rules, and any cross-reference updates.

Exceptions
- Direct quotes in Slack/chat transcripts may retain first-person.
- Exercises and direct instructions can use second-person ("you").

Version
- v2 (2025-08-28)

