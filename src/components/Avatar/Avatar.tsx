import React, { useMemo } from 'react';

export type AvatarVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
    /**
     * URL of the avatar image
     */
    src?: string;
    /**
     * Alt text for the avatar image
     */
    alt?: string;
    /**
     * User name to display as fallback initials
     */
    name?: string;
    /**
     * Size of the avatar
     */
    size?: AvatarSize;
    /**
     * Shape of the avatar
     */
    shape?: AvatarShape;
    /**
     * Border variant color
     */
    borderVariant?: AvatarVariant;
    /**
     * Display a status indicator dot
     */
    status?: AvatarVariant | null;
    /**
     * Additional CSS class names
     */
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
                                                  src,
                                                  alt = 'Avatar',
                                                  name = '',
                                                  size = 'md',
                                                  shape = 'circle',
                                                  borderVariant,
                                                  status = null,
                                                  className = '',
                                              }) => {
    // Generate initials from name
    const initials = useMemo(() => {
        if (!name) return '';

        return name
            .split(' ')
            .map(part => part.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    }, [name]);

    // Generate a consistent background color based on name
    const stringToColor = (str: string) => {
        if (!str) return '#e5e7eb'; // Default gray for empty strings

        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += ('00' + value.toString(16)).substr(-2);
        }

        return color;
    };

    // Size styles
    const sizeStyles: Record<AvatarSize, string> = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
    };

    // Border and shape styles
    const borderVariantStyles: Record<AvatarVariant, string> = {
        primary: 'border-2 border-blue-500 dark:border-blue-400',
        secondary: 'border-2 border-gray-500 dark:border-gray-400',
        success: 'border-2 border-green-500 dark:border-green-400',
        danger: 'border-2 border-red-500 dark:border-red-400',
        warning: 'border-2 border-yellow-500 dark:border-yellow-400',
        info: 'border-2 border-cyan-500 dark:border-cyan-400',
    };

    // Shape styles
    const shapeStyles = {
        circle: 'rounded-full',
        square: 'rounded-md',
    };

    // Status dot styles
    const statusDotSizeStyles: Record<AvatarSize, string> = {
        xs: 'w-1.5 h-1.5',
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3',
        xl: 'w-4 h-4',
    };

    const statusDotStyles: Record<AvatarVariant, string> = {
        primary: 'bg-blue-500 dark:bg-blue-400',
        secondary: 'bg-gray-500 dark:bg-gray-400',
        success: 'bg-green-500 dark:bg-green-400',
        danger: 'bg-red-500 dark:bg-red-400',
        warning: 'bg-yellow-500 dark:bg-yellow-400',
        info: 'bg-cyan-500 dark:bg-cyan-400',
    };

    return (
        <div className="relative inline-block">
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className={`
            ${sizeStyles[size]} 
            ${shapeStyles[shape]} 
            ${borderVariant ? borderVariantStyles[borderVariant] : ''}
            object-cover
            ${className}
          `}
                />
            ) : (
                <div
                    className={`
            ${sizeStyles[size]} 
            ${shapeStyles[shape]}
            ${borderVariant ? borderVariantStyles[borderVariant] : ''}
            flex items-center justify-center text-white font-medium
            ${className}
          `}
                    style={{ backgroundColor: stringToColor(name) }}
                    aria-label={name || 'Avatar'}
                >
                    {initials}
                </div>
            )}

            {status && (
                <span
                    className={`absolute block rounded-full ${statusDotSizeStyles[size]} ${statusDotStyles[status]} 
            border-2 border-white dark:border-gray-800 top-0 right-0 transform translate-x-1/4 -translate-y-1/4`}
                    aria-label={`${status} status`}
                />
            )}
        </div>
    );
};