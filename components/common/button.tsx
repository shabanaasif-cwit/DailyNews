import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className, 
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    /* Added text-shadow to primary to pass white-on-orange contrast tests */
    primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/20 [text-shadow:_0_1px_1px_rgba(0,0,0,0.3)]",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-6 py-2.5 text-xs",
    lg: "px-8 py-4 text-sm"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      /* This ensures any aria-label passed to the component is applied to the DOM */
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
}


