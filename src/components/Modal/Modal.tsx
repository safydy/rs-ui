import React, {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

export type ModalVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
    /**
     * Controls whether the modal is displayed
     */
    isOpen: boolean;
    /**
     * Called when the modal should close
     */
    onClose: () => void;
    /**
     * Modal title for the header
     */
    title?: React.ReactNode;
    /**
     * Modal content
     */
    children: React.ReactNode;
    /**
     * Modal footer content
     */
    footer?: React.ReactNode;
    /**
     * Color variant for the modal header
     */
    variant?: ModalVariant;
    /**
     * Size of the modal
     */
    size?: ModalSize;
    /**
     * If true, the modal will close when the overlay is clicked
     */
    closeOnOverlayClick?: boolean;
    /**
     * If true, the close button will be shown in the header
     */
    showCloseButton?: boolean;
    /**
     * If true, pressing Escape will close the modal
     */
    closeOnEsc?: boolean;
    /**
     * If true, the modal will be centered vertically
     */
    centered?: boolean;
    /**
     * If true, the modal will be scrollable when content overflows
     */
    scrollable?: boolean;
    /**
     * Controls the opacity of the overlay (0-100)
     */
    overlayOpacity?: number;
    /**
     * Additional CSS class names for the modal
     */
    className?: string;
    /**
     * Additional CSS class names for the modal header
     */
    headerClassName?: string;
    /**
     * Additional CSS class names for the modal body
     */
    bodyClassName?: string;
    /**
     * Additional CSS class names for the modal footer
     */
    footerClassName?: string;
    /**
     * If true, renders a fullscreen modal on mobile
     */
    fullscreenOnMobile?: boolean;
    /**
     * Called after the modal has opened
     */
    onOpened?: () => void;
    /**
     * Called after the modal has closed
     */
    onClosed?: () => void;
    /**
     * Content to display in the modal header before the title
     */
    headerPrefix?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                onClose,
                                                title,
                                                children,
                                                footer,
                                                variant = 'primary',
                                                size = 'md',
                                                closeOnOverlayClick = true,
                                                showCloseButton = true,
                                                closeOnEsc = true,
                                                centered = false,
                                                scrollable = true,
                                                overlayOpacity = 50,
                                                className = '',
                                                headerClassName = '',
                                                bodyClassName = '',
                                                footerClassName = '',
                                                fullscreenOnMobile = false,
                                                onOpened,
                                                onClosed,
                                                headerPrefix,
                                            }) => {
    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Size map for the modal width
    const sizeStyles: Record<ModalSize, string> = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full',
    };

    // Variant styles for the header
    const variantStyles: Record<ModalVariant, string> = {
        primary: 'bg-blue-50 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
        secondary: 'bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
        success: 'bg-green-50 text-green-800 dark:bg-green-800 dark:text-green-100',
        danger: 'bg-red-50 text-red-800 dark:bg-red-800 dark:text-red-100',
        warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
        info: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100',
    };

    // Handle clicks on the overlay
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle Escape key press
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (closeOnEsc && e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [closeOnEsc, isOpen, onClose]);

    // Handle focus trap inside modal
    useEffect(() => {
        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !modalRef.current) return;

            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey) {
                // If shift + tab and on first element, move to last element
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                // If tab and on last element, move to first element
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleTabKey);
            // Auto-focus the modal when opened
            setTimeout(() => {
                if (modalRef.current) {
                    const focusableElement = modalRef.current.querySelector(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    ) as HTMLElement;

                    if (focusableElement) {
                        focusableElement.focus();
                    } else {
                        modalRef.current.focus();
                    }
                }
            }, 0);
        }

        return () => {
            document.removeEventListener('keydown', handleTabKey);
        };
    }, [isOpen]);

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            // Save the current overflow style
            const originalOverflow = document.body.style.overflow;
            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden';

            return () => {
                // Restore the original overflow style
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    // Handle mounting animation
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            onOpened?.();
        } else {
            const timer = setTimeout(() => {
                setIsMounted(false);
                onClosed?.();
            }, 300); // Match with CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen, onOpened, onClosed]);

    // Don't render anything if the modal is closed and unmounted
    if (!isOpen && !isMounted) return null;

    const modalContent = (
        <div
            className={`fixed inset-0 z-50 flex overflow-y-auto overflow-x-hidden ${
                centered ? 'items-center' : 'items-start'
            } justify-center p-4 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            role="main-dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            onClick={handleOverlayClick}
        >
            {/* Backdrop overlay */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    isOpen ? `opacity-${overlayOpacity}` : 'opacity-0'
                }`}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className={`
          relative w-full ${sizeStyles[size]} 
          ${fullscreenOnMobile ? 'sm:relative sm:rounded-lg absolute inset-0 rounded-none' : 'rounded-lg'}
          bg-white shadow-xl dark:bg-gray-800
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'}
          ${className}
        `}
                tabIndex={-1}
                role="dialog"
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className={`
            ${variantStyles[variant]} 
            px-4 py-3 flex items-center justify-between
            ${fullscreenOnMobile ? 'sm:rounded-t-lg rounded-none' : 'rounded-t-lg'}
            border-b border-gray-200 dark:border-gray-700
            ${headerClassName}
          `}>
                        <div className="flex items-center">
                            {headerPrefix && <div className="mr-2">{headerPrefix}</div>}
                            {title && (
                                <h3
                                    className="text-lg font-medium leading-6"
                                    id="modal-title"
                                >
                                    {title}
                                </h3>
                            )}
                        </div>

                        {showCloseButton && (
                            <button
                                type="button"
                                className="bg-transparent rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div
                    className={`
            px-4 py-3 
            ${scrollable ? 'overflow-y-auto' : ''} 
            ${fullscreenOnMobile ? 'max-h-screen sm:max-h-[60vh]' : 'max-h-[60vh]'}
            ${bodyClassName}
          `}
                >
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className={`
            px-4 py-3 
            flex flex-wrap ${typeof footer === 'string' ? '' : 'justify-end'} 
            gap-2 border-t border-gray-200 dark:border-gray-700
            ${fullscreenOnMobile ? 'sm:rounded-b-lg rounded-none' : 'rounded-b-lg'}
            ${footerClassName}
          `}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    // Use createPortal to render the modal at the document body level
    return createPortal(modalContent, document.body);
};