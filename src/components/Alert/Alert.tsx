import React, { useState } from 'react';

export type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface AlertProps {
    /**
     * Alert content
     */
    children: React.ReactNode;
    /**
     * Alert variant controls the color scheme
     */
    variant?: AlertVariant;
    /**
     * If true, displays a close button
     */
    isDismissible?: boolean;
    /**
     * Optional icon to display on the left side
     */
    leftIcon?: React.ReactNode;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Callback when alert is dismissed
     */
    onDismiss?: () => void;
    /**
     * Title text shown before the content
     */
    title?: string;
    /**
     * Auto-dismiss after specified milliseconds (0 means no auto-dismiss)
     */
    autoDismiss?: number;
}

export const Alert: React.FC<AlertProps> = ({
                                                children,
                                                variant = 'primary',
                                                isDismissible = false,
                                                leftIcon,
                                                className = '',
                                                onDismiss,
                                                title,
                                                autoDismiss = 0,
                                            }) => {
    const [visible, setVisible] = useState(true);

    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined | number;

        if (autoDismiss > 0) {
            timeoutId = setTimeout(() => {
                handleDismiss();
            }, autoDismiss);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [autoDismiss]);

    const handleDismiss = () => {
        setVisible(false);
        if (onDismiss) {
            onDismiss();
        }
    };

    if (!visible) {
        return null;
    }

    const variantStyles: Record<AlertVariant, string> = {
        primary: 'bg-blue-50 text-blue-800 border-blue-200',
        secondary: 'bg-gray-50 text-gray-800 border-gray-200',
        success: 'bg-green-50 text-green-800 border-green-200',
        danger: 'bg-red-50 text-red-800 border-red-200',
        warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
        info: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    };

    const iconColors: Record<AlertVariant, string> = {
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        success: 'text-green-600',
        danger: 'text-red-600',
        warning: 'text-yellow-600',
        info: 'text-cyan-600',
    };

    return (
        <div
            className={`flex p-4 mb-4 border-l-4 rounded-md ${variantStyles[variant]} ${className}`}
            role="alert"
        >
            {leftIcon && (
                <div className={`flex-shrink-0 mr-3 ${iconColors[variant]}`}>
                    {leftIcon}
                </div>
            )}

            <div className="flex-1">
                {title && (
                    <h3 className="text-lg font-medium mb-1">{title}</h3>
                )}
                <div className="text-sm">{children}</div>
            </div>

            {isDismissible && (
                <button
                    type="button"
                    className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${iconColors[variant]} hover:bg-white cursor-pointer`}
                    aria-label="Close"
                    onClick={handleDismiss}
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="w-2 h-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1 13 13M1 13 13 1"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};