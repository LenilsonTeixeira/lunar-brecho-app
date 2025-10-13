type Props = {
  label?: string;
  value: string;
  className?: string;
};

const ProductDetailItem = ({ label, value, className = '' }: Props) => {
  return (
    <p className={`text-slate-800 ${className}`}>
      {label ? `${label}: ` : ''}
      {value}
    </p>
  );
};

export default ProductDetailItem;
