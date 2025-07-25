import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    disabled?: boolean;
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
        const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg ' +
            'focus:ring-2 focus:outline-none cursor-pointer ' +
            'transition-colors duration-200 ease-in-out ';

        const variantStyles = {
            primary: 'bg-blue-500 hover:bg-blue-400 focus:ring-blue-200 text-white',
            secondary: 'bg-gray-500 hover:bg-gray-400 focus:ring-gray-200 text-white',
            success: 'bg-green-500 hover:bg-green-400 focus:ring-green-200 text-white',
            danger: 'bg-red-500 hover:bg-red-400 focus:ring-red-200 text-white',
            warning: 'bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-200 text-white',
            info: 'bg-cyan-500 hover:bg-cyan-400 focus:ring-cyan-200 text-white',
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
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="mr-2" data-testid="icon-left">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2" data-testid="icon-right">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';