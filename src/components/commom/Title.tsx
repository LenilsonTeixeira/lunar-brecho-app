export interface TitleProps {
    name: string
}

export default function Title({ name }: TitleProps) {
  return (
    <div className="flex gap-2 items-center mb-3">
        <h2 className="font-bold text-xl leading-10 text-slate-800">{ name }</h2>
    </div>
  )
}