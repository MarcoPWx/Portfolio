'use client';

import dynamic from 'next/dynamic';
import type { EcosystemWidgetProps } from './types';

// Dynamically import the ecosystem widget with no SSR
const DynamicEcosystemWidget = dynamic(() => import('./EcosystemWidget'), {
  ssr: false,
  loading: () => null,
});

export function ClientEcosystemWidget(props: Partial<EcosystemWidgetProps>) {
  return <DynamicEcosystemWidget {...(props as EcosystemWidgetProps)} />;
}
