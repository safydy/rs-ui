import React, { Fragment } from 'react';

export type BreadcrumbVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type BreadcrumbSize = 'sm' | 'md' | 'lg';
export type SeparatorType = 'slash' | 'chevron' | 'dot' | 'arrow' | 'custom';

export interface BreadcrumbItemProps {
    /**
     * Item label
     */
    label: React.ReactNode;
    /**
     * Optional URL for item. If not provided, item will be rendered as text
     */
    href?: string;
    /**
     * Item is active (current page)
     */
    active?: boolean;
    /**
     * Optional icon to display before label
     */
    icon?: React.ReactNode;
    /**
     * Optional onClick handler
     */
    onClick?: (e: React.MouseEvent) => void;
}

export interface BreadcrumbProps {
    /**
     * Array of breadcrumb items
     */
    items: BreadcrumbItemProps[];
    /**
     * Variant color for active item
     */
    variant?: BreadcrumbVariant;
    /**
     * Size of breadcrumb items
     */
    size?: BreadcrumbSize;
    /**
     * Type of separator
     */
    separator?: SeparatorType;
    /**
     * Custom separator element (used when separator is 'custom')
     */
    customSeparator?: React.ReactNode;
    /**
     * Whether to show home icon for the first item
     */
    showHomeIcon?: boolean;
    /**
     * Additional CSS class names
     */
    className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
                                                          items,
                                                          variant = 'primary',
                                                          size = 'md',
                                                          separator = 'slash',
                                                          customSeparator,
                                                          showHomeIcon = false,
                                                          className = '',
                                                      }) => {
    // Size styles
    const sizeStyles: Record<BreadcrumbSize, string> = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    // Color for active item
    const activeColorStyles: Record<BreadcrumbVariant, string> = {
        primary: 'text-blue-700 dark:text-blue-400',
        secondary: 'text-gray-700 dark:text-gray-400',
        success: 'text-green-700 dark:text-green-400',
        danger: 'text-red-700 dark:text-red-400',
        warning: 'text-yellow-700 dark:text-yellow-400',
        info: 'text-cyan-700 dark:text-cyan-400',
    };

    // Get separator element based on type
    const getSeparatorElement = () => {
        switch (separator) {
            case 'slash':
                return <span aria-hidden="true">/</span>;
            case 'chevron':
                return (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                );
            case 'dot':
                return <span aria-hidden="true" className="mx-1">•</span>;
            case 'arrow':
                return (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                );
            case 'custom':
                return customSeparator;
            default:
                return <span aria-hidden="true">/</span>;
        }
    };

    // Home icon
    const homeIcon = (
        <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
        </svg>
    );

    return (
        <nav aria-label="Breadcrumb" className={`${className}`}>
            <ol className={`flex flex-wrap items-center ${sizeStyles[size]}`}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isFirst = index === 0;

                    return (
                        <Fragment key={index}>
                            <li className="flex items-center">
                                {item.active ? (
                                    <span
                                        className={`flex items-center font-medium ${activeColorStyles[variant]}`}
                                        aria-current="page"
                                    >
                    {isFirst && showHomeIcon && !item.icon ? homeIcon : null}
                                        {item.icon && <span className="mr-1">{item.icon}</span>}
                                        {item.label}
                  </span>
                                ) : (
                                    item.href ? (
                                        <a
                                            href={item.href}
                                            onClick={item.onClick}
                                            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                                        >
                                            {isFirst && showHomeIcon && !item.icon ? homeIcon : null}
                                            {item.icon && <span className="mr-1">{item.icon}</span>}
                                            {item.label}
                                        </a>
                                    ) : (
                                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                      {isFirst && showHomeIcon && !item.icon ? homeIcon : null}
                                            {item.icon && <span className="mr-1">{item.icon}</span>}
                                            {item.label}
                    </span>
                                    )
                                )}
                            </li>

                            {!isLast && (
                                <li className="mx-2 text-gray-400" aria-hidden="true">
                                    {getSeparatorElement()}
                                </li>
                            )}
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};