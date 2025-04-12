interface StepperProps {
    currentStep: number;
    steps: string[];
  }
  
  const Stepper = ({ currentStep, steps }: StepperProps) => {
    return (
      <div className="w-full mt-20 px-2 sm:px-4 bg-slate-800 border-y fixed top-0 left-0 z-50 overflow-x-auto">
        <ol className="flex flex-wrap sm:flex-nowrap justify-start sm:justify-center items-center w-full gap-2 sm:gap-4 py-3 text-sm font-medium text-center text-slate-800 sm:text-base">
          {steps.map((label, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
  
            return (
              <li
                key={index}
                className={`flex items-center min-w-0 ${
                  isActive ? "text-sky-500" : "text-slate-50"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
                    isActive
                      ? "border-sky-500"
                      : isCompleted
                      ? "border-emerald-400"
                      : "border-slate-50"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="truncate">{label}</span>
                {index !== steps.length - 1 && (
                  <div
                    className={`transition-all duration-300 ease-in-out rounded-full h-0.5 ml-2 sm:ml-4 ${
                      index < currentStep - 1
                        ? "bg-emerald-400 w-6 sm:w-12"
                        : index === currentStep - 1
                        ? "bg-sky-500 w-4 sm:w-10"
                        : "bg-slate-400 w-3 sm:w-8"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  };
  
  export default Stepper;
  