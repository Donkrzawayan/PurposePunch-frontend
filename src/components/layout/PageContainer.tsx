interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className = '' }: Props) => (
  <div className={`${className} mx-auto space-y-8 pb-12`}>
    {children}
  </div>
);
