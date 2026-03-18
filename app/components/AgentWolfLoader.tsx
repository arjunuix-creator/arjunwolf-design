'use client';

import dynamic from 'next/dynamic';

const AgentWolf = dynamic(() => import('./AgentWolf'), { ssr: false });

export default function AgentWolfLoader() {
  return <AgentWolf />;
}
