'use client'

import dynamic from 'next/dynamic';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';
import { ClientMapProps } from '../types/visitor';

const ClientMapComponent = dynamic(
  () => import('./ClientMap').then(mod => ({ default: mod.ClientMap })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <span className="text-yellow-500 text-sm sm:text-base md:text-lg font-medium">
            Loading map...
          </span>
        </div>
      </div>
    )
  }
);

export const DynamicClientMap: React.FC<ClientMapProps> = (props) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-red-500 text-lg font-semibold">
              Failed to load map
            </div>
            <div className="text-gray-400 text-sm">
              Map functionality is currently unavailable
            </div>
          </div>
        </div>
      }
    >
      <ClientMapComponent {...props} />
    </ErrorBoundary>
  );
};