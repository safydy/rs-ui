import React, { useState, createContext, useContext } from 'react';
import type {ModalVariant} from "../Modal/Modal.tsx";

export type AccordionVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

// Context for storing and accessing the active items
type AccordionContextType = {
    activeItems: string[];
    toggleItem: (id: string) => void;
    variant: AccordionVariant;
    bordered: boolean;
};

const AccordionContext = createContext<AccordionContextType>({
    activeItems: [],
    toggleItem: () => {},
    variant: 'primary',
    bordered: true,
});

export interface AccordionProps {
    /**
     * Whether multiple items can be expanded at once
     */
    allowMultiple?: boolean;
    /**
     * IDs of initially expanded items
     */
    defaultExpanded?: string[];
    /**
     * Color variant for the accordion
     */
    variant?: AccordionVariant;
    /**
     * Children containing AccordionItem components
     */
    children: React.ReactNode;
    /**
     * Whether to show borders
     */
    bordered?: boolean;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Called when an item is toggled
     */
    onChange?: (openItems: string[]) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
                                                        allowMultiple = false,
                                                        defaultExpanded = [],
                                                        variant = 'primary',
                                                        children,
                                                        bordered = true,
                                                        className = '',
                                                        onChange,
                                                    }) => {
    const [activeItems, setActiveItems] = useState<string[]>(defaultExpanded);

    const toggleItem = (id: string) => {
        let newActiveItems: string[];

        if (activeItems.includes(id)) {
            // Close the item
            newActiveItems = activeItems.filter(itemId => itemId !== id);
        } else {
            // Open the item (either add to existing or replace existing)
            newActiveItems = allowMultiple
                ? [...activeItems, id]
                : [id];
        }

        setActiveItems(newActiveItems);
        onChange?.(newActiveItems);
    };

    return (
        <AccordionContext.Provider value={{ activeItems, toggleItem, variant, bordered }}>
            <div className={`w-full ${className}`} data-testid="accordion">
                {children}
            </div>
        </AccordionContext.Provider>
    );
};

export interface AccordionItemProps {
    /**
     * Unique identifier for the accordion item
     */
    id: string;
    /**
     * Title displayed in the header
     */
    title: React.ReactNode;
    /**
     * Content of the accordion panel
     */
    children: React.ReactNode;
    /**
     * Whether the item is disabled
     */
    disabled?: boolean;
    /**
     * Optional icon to display before title
     */
    icon?: React.ReactNode;
    /**
     * Additional CSS class names for the item
     */
    className?: string;
    /**
     * Additional CSS class names for the header
     */
    headerClassName?: string;
    /**
     * Additional CSS class names for the content panel
     */
    contentClassName?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
                                                                id,
                                                                title,
                                                                children,
                                                                disabled = false,
                                                                icon,
                                                                className = '',
                                                                headerClassName = '',
                                                                contentClassName = '',
                                                            }) => {
    const { activeItems, toggleItem, variant, bordered } = useContext(AccordionContext);
    const isExpanded = activeItems.includes(id);

    // Variant styles for headers
    const variantStyles: Record<ModalVariant, string> = {
        primary: 'bg-blue-50 text-blue-500 dark:bg-blue-500 dark:text-blue-100',
        secondary: 'bg-gray-50 text-gray-500 dark:bg-gray-500 dark:text-gray-100',
        success: 'bg-green-50 text-green-500 dark:bg-green-500 dark:text-green-100',
        danger: 'bg-red-50 text-red-500 dark:bg-red-500 dark:text-red-100',
        warning: 'bg-yellow-50 text-yellow-500 dark:bg-yellow-500 dark:text-yellow-100',
        info: 'bg-cyan-50 text-cyan-500 dark:bg-cyan-500 dark:text-cyan-100',
    };

    // Define a new set of styles for collapsed items:
    const collapsedVariantStyles: Record<AccordionVariant, string> = {
        primary: 'bg-blue-50 text-blue-500 dark:bg-blue-500 dark:text-blue-100',
        secondary: 'bg-gray-50 text-gray-500 dark:bg-gray-500 dark:text-gray-100',
        success: 'bg-green-50 text-green-500 dark:bg-green-500 dark:text-green-100',
        danger: 'bg-red-50 text-red-500 dark:bg-red-500 dark:text-red-100',
        warning: 'bg-yellow-50 text-yellow-500 dark:bg-yellow-500 dark:text-yellow-100',
        info: 'bg-cyan-50 text-cyan-500 dark:bg-cyan-500 dark:text-cyan-100',
    };

    // Border styles
    const borderStyles = bordered ? 'border border-gray-200 dark:border-gray-700' : '';

    const handleClick = () => {
        if (!disabled) {
            toggleItem(id);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            toggleItem(id);
        }
    };

    return (
        <div
            className={`w-full ${borderStyles} ${isExpanded ? '' : 'mb-1'} ${className}`}
            data-testid="accordion-item"
        >
            <h2>
                <button
                    id={`accordion-header-${id}`}
                    className={`
            flex items-center justify-between w-full p-4 font-medium text-left
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${isExpanded ? variantStyles[variant] : collapsedVariantStyles[variant]}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${headerClassName}
          `}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    aria-expanded={isExpanded}
                    aria-controls={`accordion-panel-${id}`}
                    aria-disabled={disabled}
                    disabled={disabled}
                    type="button"
                >
          <span className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
              {title}
          </span>
                    <svg
                        className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </h2>
            <div
                id={`accordion-panel-${id}`}
                aria-labelledby={`accordion-header-${id}`}
                className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
                role="region"
            >
                <div className={`p-4 bg-white dark:bg-gray-800 ${contentClassName}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};