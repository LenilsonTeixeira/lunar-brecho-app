interface BannerProps {
  showBanner: boolean;
  onClose: () => void;
}

const Banner = ({ showBanner, onClose }: BannerProps) => {
  if (!showBanner) return null;

  return (
    <div className='text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] fixed top-0 left-0 w-full z-[60] relative'>
      <p>
        Exclusive Price Drop! Hurry,{' '}
        <span className='underline underline-offset-2'>Offer Ends Soon!</span>
      </p>
      <button
        onClick={onClose}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors'
        aria-label='Fechar banner'
      >
        ✕
      </button>
    </div>
  );
};

export default Banner;
