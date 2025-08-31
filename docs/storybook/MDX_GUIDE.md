# Storybook MDX Authoring Guide

This project uses native MDX for Storybook docs. Follow these conventions when creating or updating docs pages:

- File location: place MDX docs with the component near its source (e.g. `src/components/ui/Button.docs.stories.mdx`).
- Title grouping: set a top-level group to organize the sidebar.
  - Foundation/* – tokens, theme, design primitives
  - UI/* – component docs (e.g. `UI/Button/Docs`)
  - Guides/* – guide/reference pages (e.g. `Guides/Accessibility & Testing`)
- Meta block: include a title and a `docs` tag.

Example (component docs):

```mdx
import { Meta, Title, Subtitle, Description } from '@storybook/blocks';
import { Button } from './Button';

<Meta of={Button} title="UI/Button/Docs" tags={['docs']} />

<Title>Button</Title>
<Subtitle>Actions with variants, sizes, icons</Subtitle>
<Description>
Concise overview of usage, props, and accessibility.
</Description>
```

Example (guide page):

```mdx
import { Meta, Title, Subtitle, Description } from '@storybook/blocks';

<Meta title="Guides/Accessibility & Testing" tags={['docs']} />

<Title>Accessibility & Testing</Title>
<Subtitle>Keyboard navigation, ARIA patterns, and aXe</Subtitle>
<Description>Guidance and testing recipes.</Description>
```

Notes
- Prefer `of={Component}` when documenting a specific component so ArgsTable can infer props.
- Group names drive sidebar order: Foundation, UI, then Guides (see Storybook storySort in `.storybook/preview.ts`).
- Keep titles unique, avoid duplication across groups.
- Use `Source` and `ArgsTable` from `@storybook/blocks` for examples and prop tables.

