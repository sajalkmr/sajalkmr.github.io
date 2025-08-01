'use client'

import dynamic from 'next/dynamic';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';
import { VisitorMapProps } from '../types/visitor';

const VisitorMapComponent = dynamic(
  () => import('./VisitorMap').then(mod => ({ default: mod.VisitorMap })),
  {
    ssr: false,
    loading: () => (
      <div className="container mx-auto px-0 sm:px-4 max-w-5xl">
        <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner size="lg" />
            <span className="text-yellow-500 text-sm sm:text-base md:text-lg font-medium">
              Loading visitor map...
            </span>
          </div>
        </div>
      </div>
    )
  }
);

export const DynamicVisitorMap: React.FC<VisitorMapProps> = (props) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="container mx-auto px-0 sm:px-4 max-w-5xl">
          <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-red-500 text-lg font-semibold">
                Failed to load visitor map
              </div>
              <div className="text-gray-400 text-sm">
                Please refresh the page to try again
              </div>
            </div>
          </div>
        </div>
      }
    >
      <VisitorMapComponent {...props} />
    </ErrorBoundary>
  );
};