import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'lg' | 'icon'; // Include 'icon' size
  variant?: 'ghost' | 'outline' | 'solid'; // Add variant prop
  as?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className, size, variant, as: Component = 'button' }) => {
  const sizeClasses = size === 'lg' ? 'px-8 py-6' : size === 'sm' ? 'px-4 py-2' : 'p-2'; // Adjust size classes for 'icon'
  const variantClasses = variant === 'ghost' ? 'bg-transparent text-blue-600' : 'bg-blue-600 text-white'; // Example variant styles

  return (
    <Component
      onClick={onClick}
      className={`rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-700 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </Component>
  );
};