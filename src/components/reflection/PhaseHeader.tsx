interface Props {
  title: string;
  className?: string;
}

export const PhaseHeader = ({ title, className = "text-gray-700" }: Props) => {
  return (
    <h2 className={`text-xl font-bold mb-4 border-b pb-2 ${className}`}>
      {title}
    </h2>
  )
};
