import React from 'react';

export type CardVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';
export type ImagePosition = 'top' | 'bottom';

export interface CardProps {
    /**
     * Card content
     */
    children: React.ReactNode;
    /**
     * Card color variant
     */
    variant?: CardVariant;
    /**
     * Card header content
     */
    header?: React.ReactNode;
    /**
     * Card footer content
     */
    footer?: React.ReactNode;
    /**
     * Shadow depth
     */
    shadow?: CardShadow;
    /**
     * Whether to display a border
     */
    bordered?: boolean;
    /**
     * URL for an optional image
     */
    imgSrc?: string;
    /**
     * Alt text for the image
     */
    imgAlt?: string;
    /**
     * Position of the image
     */
    imgPosition?: ImagePosition;
    /**
     * Display card in horizontal layout (image on left)
     */
    horizontal?: boolean;
    /**
     * Make card interactive (adds hover effects)
     */
    interactive?: boolean;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * HTML element to render as
     */
    as?: React.ElementType;
    /**
     * Card title (shorthand for simple header)
     */
    title?: string;
    /**
     * Card subtitle
     */
    subtitle?: string;
}

export const Card: React.FC<CardProps> = ({
                                              children,
                                              variant = 'secondary',
                                              header,
                                              footer,
                                              shadow = 'sm',
                                              bordered = true,
                                              imgSrc,
                                              imgAlt = '',
                                              imgPosition = 'top',
                                              horizontal = false,
                                              interactive = false,
                                              className = '',
                                              as: Element = 'div',
                                              title,
                                              subtitle,
                                          }) => {
    // Base styles
    const baseStyles = 'overflow-hidden rounded-lg transition-all';

    // Shadow styles
    const shadowStyles: Record<CardShadow, string> = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow',
        lg: 'shadow-lg',
    };

    // Variant styles (subtle background colors and border colors)
    const variantStyles: Record<CardVariant, string> = {
        primary: 'bg-blue-50 dark:bg-blue-900/30',
        secondary: 'bg-gray-50 dark:bg-gray-700/30',
        success: 'bg-green-50 dark:bg-green-900/30',
        danger: 'bg-red-50 dark:bg-red-900/30',
        warning: 'bg-yellow-50 dark:bg-yellow-900/30',
        info: 'bg-cyan-50 dark:bg-cyan-900/30',
    };

    // Border styles based on variant
    const borderStyles: Record<CardVariant, string> = {
        primary: 'border border-blue-200 dark:border-blue-800',
        secondary: 'border border-gray-200 dark:border-gray-600',
        success: 'border border-green-200 dark:border-green-800',
        danger: 'border border-red-200 dark:border-red-800',
        warning: 'border border-yellow-200 dark:border-yellow-800',
        info: 'border border-cyan-200 dark:border-cyan-800',
    };

    // Interactive styles
    const interactiveStyles = interactive
        ? 'cursor-pointer hover:shadow-md transform transition-transform hover:-translate-y-1'
        : '';

    // Layout styles
    const layoutStyles = horizontal ? 'flex flex-row' : 'flex flex-col';

    // Combine all styles
    const cardStyles = `
    ${baseStyles} 
    ${shadowStyles[shadow]} 
    ${variantStyles[variant]} 
    ${bordered ? borderStyles[variant] : ''} 
    ${interactiveStyles}
    ${layoutStyles}
    ${className}
  `;

    // Generate header based on title/subtitle props if no header is provided
    const headerContent = header || (title ? (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
    ) : null);

    const renderImage = () => {
        if (!imgSrc) return null;

        return (
            <div className={horizontal ? 'flex-shrink-0 w-1/3' : 'w-full'}>
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    className={horizontal ? 'h-full w-full object-cover' : 'w-full object-cover'}
                />
            </div>
        );
    };

    return (
        <Element className={cardStyles} data-testid={`${variant}-card`}>
            {imgSrc && imgPosition === 'top' && !horizontal && renderImage()}

            <div className={horizontal ? 'flex-1' : ''}>
                <div className="px-4 pt-3">
                    {headerContent}
                </div>

                <div className="px-4 py-3 flex-1">{children}</div>

                {footer && (
                    <div className="px-4 py-3">
                        {footer}
                    </div>
                )}
            </div>

            {imgSrc && (horizontal || imgPosition === 'bottom') && renderImage()}
        </Element>
    );
};