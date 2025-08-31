import type { Preview } from '@storybook/nextjs';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: (a, b) => {
        const order = ['Foundation', 'UI', 'Guides'];
        const groupIndex = (title) => {
          if (!title) return Number.MAX_SAFE_INTEGER;
          const group = title.split('/')[0];
          const idx = order.indexOf(group);
          return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
        };
        const ga = groupIndex(a.title);
        const gb = groupIndex(b.title);
        if (ga !== gb) return ga - gb;
        const tcmp = (a.title || '').localeCompare(b.title || '', { numeric: true, sensitivity: 'base' });
        if (tcmp !== 0) return tcmp;
        return (a.id || '').localeCompare(b.id || '', { numeric: true, sensitivity: 'base' });
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0B0F19' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      try {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
          root.style.backgroundColor = '#0B0F19';
        } else {
          root.classList.remove('dark');
          root.style.backgroundColor = '#ffffff';
        }
      } catch {}
      return Story();
    },
  ],
};

export default preview;
