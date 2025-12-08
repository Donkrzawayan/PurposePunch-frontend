import { cn } from "../../utils/cn";

interface Props {
  title: string;
  className?: string;
}

export const PhaseHeader = ({ title, className = '' }: Props) => {
  return (
    <h2 className={cn("text-xl text-gray-700 font-bold mb-4 border-b pb-2", className)}>
      {title}
    </h2>
  )
};
