import FeatureFlagsDemo from '@/components/admin/FeatureFlagsDemo';

const FeatureFlags = () => {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-800'>Feature Flags</h1>
          <p className='text-slate-600 mt-2'>Gerencie as funcionalidades disponíveis no sistema</p>
        </div>
      </div>

      {/* Feature Flags Demo Component */}
      <FeatureFlagsDemo />
    </div>
  );
};

export default FeatureFlags;
