import { cn } from "../../utils/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className = '' }: Props) => (
  <div className={cn("mx-auto space-y-8 pb-12", className)}>
    {children}
  </div>
);
