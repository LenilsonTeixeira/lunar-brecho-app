export interface ThumbnailsProps {
    images: string[];
    alt: string;
    selectedImage: string;
    onSelect: (image: string) => void;
  }

const Thumbnails = ({ images, alt, onSelect, selectedImage }: ThumbnailsProps) => {
    return (
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-hidden justify-between sm:justify-normal sm:w-[18.7%] w-full">
          {images.map((img, idx) => (
            <img
              key={idx}
              onClick={() => onSelect(img)}
              src={img}
              alt={alt}
              className={`shadow-md w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border p-1 ${
                selectedImage === img ? 'border-slate-200' : 'border-slate-100'
              }`}
            />
          ))}
        </div>
      );
}

export default Thumbnails