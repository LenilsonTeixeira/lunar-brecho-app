export interface TitleProps {
    texts: string[]
}

export default function Title(props: TitleProps) {
  return (
    <div className="flex gap-2 items-center mb-3">
        <p className="text-slate-700 font-bold">{props.texts[0]} <span className="text-slate-700 font-medium">{props.texts[1]}</span></p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-slate-700"></p>
    </div>
  )
}