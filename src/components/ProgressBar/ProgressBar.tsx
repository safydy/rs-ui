import React from 'react';

export type ProgressBarVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
    /**
     * Current progress value (0-100)
     */
    value: number;
    /**
     * Color variant
     */
    variant?: ProgressBarVariant;
    /**
     * Progress bar size/height
     */
    size?: ProgressBarSize;
    /**
     * Whether to display the percentage text
     */
    showPercentage?: boolean;
    /**
     * Whether to display striped pattern
     */
    striped?: boolean;
    /**
     * Whether to animate the striped pattern
     */
    animated?: boolean;
    /**
     * Label displayed above the progress bar
     */
    label?: string;
    /**
     * Minimum value (default: 0)
     */
    min?: number;
    /**
     * Maximum value (default: 100)
     */
    max?: number;
    /**
     * Additional CSS class names
     */
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
                                                            value,
                                                            variant = 'primary',
                                                            size = 'md',
                                                            showPercentage = false,
                                                            striped = false,
                                                            animated = false,
                                                            label,
                                                            min = 0,
                                                            max = 100,
                                                            className = '',
                                                        }) => {
    // Ensure the value is within bounds
    const clampedValue = Math.min(Math.max(value, min), max);

    // Calculate the percentage
    const percentage = Math.round(((clampedValue - min) / (max - min)) * 100);

    // Size styles for the bar height
    const sizeStyles: Record<ProgressBarSize, string> = {
        xs: 'h-1',
        sm: 'h-2',
        md: 'h-4',
        lg: 'h-6',
    };

    // Text size based on bar size
    const textSizeStyles: Record<ProgressBarSize, string> = {
        xs: 'text-xs',
        sm: 'text-xs',
        md: 'text-xs',
        lg: 'text-sm',
    };

    // Color variants for the filled part
    const variantStyles: Record<ProgressBarVariant, string> = {
        primary: 'bg-blue-600',
        secondary: 'bg-gray-600',
        success: 'bg-green-600',
        danger: 'bg-red-600',
        warning: 'bg-yellow-500',
        info: 'bg-cyan-600',
    };

    // Striped pattern styles
    const stripedStyles = striped ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1rem_1rem]' : '';

    // Animation styles
    const animatedStyles = animated && striped ? 'animate-progress-stripes' : '';

    // Only show the percentage text inside the bar if the size is large enough
    const showTextInside = size === 'lg' && showPercentage;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                    {showPercentage && !showTextInside && (
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
                    )}
                </div>
            )}

            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden">
                <div
                    className={`
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            ${stripedStyles}
            ${animatedStyles}
            rounded-full transition-all duration-300 ease-in-out
            flex items-center justify-center
          `}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={clampedValue}
                    aria-valuemin={min}
                    aria-valuemax={max}
                >
                    {showTextInside && (
                        <span className={`${textSizeStyles[size]} font-semibold text-white`} data-testid="progress-value-text">
              {percentage}%
            </span>
                    )}
                </div>
            </div>
        </div>
    );
};