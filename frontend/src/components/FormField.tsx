

interface FormFieldProps {
    label: string;
    placeholder: string;
    type: string;
    isTextArea?: boolean;
    value: string | number;
    handleChange: (value: string) => void;
}

const FormField = ({
    label,
    placeholder,
    type,
    isTextArea,
    value,
    handleChange
}: FormFieldProps) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {label && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{label}</span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={(e)=> handleChange(e.target.value)}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]  focus:outline-none focus-visible:ring-[#1dc071] focus-visible:ring-[1px] transition-all"
        />
      ) : (
        <input
          required
          value={value}
          onChange={(e)=> handleChange(e.target.value)}
          type={type}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]  focus:outline-none focus-visible:ring-[#1dc071] focus-visible:ring-[1px] transition-all"
        />
      )}
    </label>
  )
}

export default FormField