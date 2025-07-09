import React from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
    /**
     * Badge content
     */
    children?: React.ReactNode;
    /**
     * Badge color variant
     */
    variant?: BadgeVariant;
    /**
     * Badge size
     */
    size?: BadgeSize;
    /**
     * Makes the badge fully rounded (pill shape)
     */
    pill?: boolean;
    /**
     * Shows a dot indicator instead of content
     */
    dot?: boolean;
    /**
     * Additional CSS class names
     */
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
                                                children,
                                                variant = 'primary',
                                                size = 'md',
                                                pill = false,
                                                dot = false,
                                                className = '',
                                            }) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium';

    const variantStyles: Record<BadgeVariant, string> = {
        primary: 'bg-blue-200 text-blue-800',
        secondary: 'bg-gray-200 text-gray-800',
        success: 'bg-green-200 text-green-800',
        danger: 'bg-red-200 text-red-800',
        warning: 'bg-yellow-200 text-yellow-800',
        info: 'bg-cyan-200 text-cyan-800',
    };

    const sizeStyles: Record<BadgeSize, string> = {
        sm: dot ? 'h-1.5 w-1.5' : 'text-xs px-2 py-0.5',
        md: dot ? 'h-2.5 w-2.5' : 'text-xs px-2.5 py-0.5',
        lg: dot ? 'h-3 w-3' : 'text-sm px-3 py-1',
    };

    const pillStyles = pill ? 'rounded-full' : 'rounded';
    const dotStyles = dot ? 'flex-shrink-0' : '';

    return (
        <span
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${pillStyles}
                ${dotStyles}
                ${className}
              `}
            data-testid="badge"
        >
      {!dot && children}
    </span>
    );
};