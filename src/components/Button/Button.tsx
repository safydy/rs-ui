import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className = '',
            variant = 'primary',
            size = 'md',
            isLoading = false,
            disabled = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg focus:ring-4 focus:outline-none';

        const variantStyles = {
            primary: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 text-white',
            secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-300 text-white',
            success: 'bg-green-600 hover:bg-green-700 focus:ring-green-300 text-white',
            danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-300 text-white',
            warning: 'bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 text-white',
            info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 text-white',
            light: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-100 text-gray-900',
            dark: 'bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 text-white',
        };

        const sizeStyles = {
            xs: 'px-3 py-1.5 text-xs',
            sm: 'px-3 py-2 text-sm',
            md: 'px-5 py-2.5 text-sm',
            lg: 'px-5 py-3 text-base',
            xl: 'px-6 py-3.5 text-base',
        };

        const widthStyles = fullWidth ? 'w-full' : '';

        const loadingOrDisabled = isLoading || disabled;

        return (
            <button
                ref={ref}
                className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${widthStyles}
          ${loadingOrDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
                disabled={loadingOrDisabled}
                {...props}
            >
                {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';