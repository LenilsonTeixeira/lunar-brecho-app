export interface TitleProps {
  name: string;
}

const Title = ({ name }: TitleProps) => {
  return (
    <div className='flex gap-2 items-center mb-3'>
      <h2 className='font-bold text-lg sm:text-xl leading-8 sm:leading-10 text-slate-800'>
        {name}
      </h2>
    </div>
  );
};

export default Title;
