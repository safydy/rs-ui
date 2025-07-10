import React from 'react';

export type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerType = 'border' | 'dots' | 'grow';

export interface SpinnerProps {
    /**
     * Color variant
     */
    variant?: SpinnerVariant;
    /**
     * Size of the spinner
     */
    size?: SpinnerSize;
    /**
     * Type of spinner animation
     */
    type?: SpinnerType;
    /**
     * Visually hidden label for accessibility
     */
    label?: string;
    /**
     * Additional CSS class names
     */
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
                                                    variant = 'primary',
                                                    size = 'md',
                                                    type = 'border',
                                                    label = 'Loading...',
                                                    className = '',
                                                }) => {
    // Size styles mapped to different dimensions
    const sizeStyles: Record<SpinnerSize, string> = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    };

    // Color variants for the spinner
    const variantStyles: Record<SpinnerVariant, string> = {
        primary: type === 'border' ? 'border-blue-600' : 'text-blue-600',
        secondary: type === 'border' ? 'border-gray-600' : 'text-gray-600',
        success: type === 'border' ? 'border-green-600' : 'text-green-600',
        danger: type === 'border' ? 'border-red-600' : 'text-red-600',
        warning: type === 'border' ? 'border-yellow-600' : 'text-yellow-600',
        info: type === 'border' ? 'border-cyan-600' : 'text-cyan-600',
    };

    // Border width based on size
    const borderWidthStyles: Record<SpinnerSize, string> = {
        xs: 'border-[1.5px]',
        sm: 'border-2',
        md: 'border-2',
        lg: 'border-3',
        xl: 'border-4',
    };

    // Border spinner - classic rotating border
    if (type === 'border') {
        return (
            <div role="status" className={`inline-block ${className}`}>
                <div
                    className={`
            ${sizeStyles[size]}
            ${variantStyles[variant]}
            ${borderWidthStyles[size]}
            border-solid
            rounded-full
            border-r-transparent
            border-b-transparent
            animate-spin
          `}
                />
                <span className="sr-only">{label}</span>
            </div>
        );
    }

    // Growing spinner - pulsating circle
    if (type === 'grow') {
        return (
            <div role="status" className={`inline-block ${className}`}>
                <div
                    className={`
            ${sizeStyles[size]}
            ${variantStyles[variant]}
            rounded-full
            animate-pulse
            bg-current
            opacity-75
          `}
                />
                <span className="sr-only">{label}</span>
            </div>
        );
    }

    // Dots spinner - three bouncing dots
    if (type === 'dots') {
        // Calculate dot size based on the overall spinner size
        const dotSizeClasses: Record<SpinnerSize, string> = {
            xs: 'w-1 h-1',
            sm: 'w-1.5 h-1.5',
            md: 'w-2 h-2',
            lg: 'w-2.5 h-2.5',
            xl: 'w-3 h-3',
        };

        const gapClasses: Record<SpinnerSize, string> = {
            xs: 'space-x-1',
            sm: 'space-x-1.5',
            md: 'space-x-2',
            lg: 'space-x-2.5',
            xl: 'space-x-3',
        };

        return (
            <div role="status" className={`inline-flex items-center ${gapClasses[size]} ${className}`}>
                <div className={`${dotSizeClasses[size]} ${variantStyles[variant]} rounded-full animate-bounce-delay-1 bg-current`}></div>
                <div className={`${dotSizeClasses[size]} ${variantStyles[variant]} rounded-full animate-bounce-delay-2 bg-current`}></div>
                <div className={`${dotSizeClasses[size]} ${variantStyles[variant]} rounded-full animate-bounce-delay-3 bg-current`}></div>
                <span className="sr-only">{label}</span>
            </div>
        );
    }

    // Default fallback
    return (
        <div role="status" className={`inline-block ${className}`}>
            <div className={`${sizeStyles[size]} ${variantStyles[variant]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent`} />
            <span className="sr-only">{label}</span>
        </div>
    );
};