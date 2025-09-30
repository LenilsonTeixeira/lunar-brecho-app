import { createContext, useContext, ReactNode } from 'react';
import { useFeatureFlags, FeatureFlags } from '@/hooks/useFeatureFlags';

interface FeatureFlagsContextType {
  featureFlags: FeatureFlags;
  isLoading: boolean;
  updateFeatureFlag: (flagName: keyof FeatureFlags, value: boolean) => void;
  updateFeatureFlags: (flags: Partial<FeatureFlags>) => void;
  resetFeatureFlags: () => void;
  isFeatureEnabled: (flagName: keyof FeatureFlags) => boolean;
  areFeaturesEnabled: (flagNames: (keyof FeatureFlags)[]) => boolean;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

interface FeatureFlagsProviderProps {
  children: ReactNode;
}

export const FeatureFlagsProvider = ({ children }: FeatureFlagsProviderProps) => {
  const featureFlagsData = useFeatureFlags();

  return (
    <FeatureFlagsContext.Provider value={featureFlagsData}>{children}</FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlagsContext = () => {
  const context = useContext(FeatureFlagsContext);
  if (context === undefined) {
    throw new Error('useFeatureFlagsContext must be used within a FeatureFlagsProvider');
  }
  return context;
};
