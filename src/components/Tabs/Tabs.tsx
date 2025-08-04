import React, { useState, createContext, useContext, useEffect } from 'react';

export type TabsVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type TabsAlign = 'start' | 'center' | 'end' | 'full';

type TabsContextType = {
    activeTab: string;
    setActiveTab: (id: string) => void;
    variant: TabsVariant;
};

const TabsContext = createContext<TabsContextType>({
    activeTab: '',
    setActiveTab: () => {},
    variant: 'primary',
});

export interface TabsProps {
    /**
     * Children containing Tab and TabPanel components
     */
    children: React.ReactNode;
    /**
     * Default active tab ID (for uncontrolled component)
     */
    defaultActiveTab?: string;
    /**
     * Active tab ID (for controlled component)
     */
    activeTab?: string;
    /**
     * Called when tab is changed
     */
    onChange?: (tabId: string) => void;
    /**
     * Color variant for the active tab
     */
    variant?: TabsVariant;
    /**
     * Alignment of the tabs
     */
    align?: TabsAlign;
    /**
     * Whether to display a divider below the tabs
     */
    divider?: boolean;
    /**
     * Whether tabs should take full width
     */
    fullWidth?: boolean;
    /**
     * Additional CSS class names for the tabs container
     */
    className?: string;
    /**
     * Additional CSS class names for the tabs list
     */
    tabListClassName?: string;
    /**
     * Additional CSS class names for the tab content area
     */
    tabContentClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
                                              children,
                                              defaultActiveTab,
                                              activeTab: controlledActiveTab,
                                              onChange,
                                              variant = 'primary',
                                              align = 'start',
                                              divider = true,
                                              fullWidth = false,
                                              className = '',
                                              tabListClassName = '',
                                              tabContentClassName = '',
                                          }) => {
    // Find the first tab ID from children
    const findFirstTabId = (): string => {
        let firstId = '';
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.type === Tab && !firstId && !child.props.disabled) {
                firstId = child.props.id;
            }
        });
        return firstId;
    };

    // State for uncontrolled component
    const [activeTabState, setActiveTabState] = useState<string>(defaultActiveTab || findFirstTabId());

    // Use the controlled value if provided, otherwise use internal state
    const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : activeTabState;

    // Handle tab change
    const setActiveTab = (id: string) => {
        if (controlledActiveTab === undefined) {
            setActiveTabState(id);
        }
        onChange?.(id);
    };

    // Update internal state if controlled value changes
    useEffect(() => {
        if (controlledActiveTab !== undefined) {
            setActiveTabState(controlledActiveTab);
        }
    }, [controlledActiveTab]);

    // Extract Tab and TabPanel children
    const tabList: React.ReactElement[] = [];
    const tabPanels: React.ReactElement[] = [];

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        if (child.type === Tab) {
            tabList.push(child);
        } else if (child.type === TabPanel) {
            tabPanels.push(child);
        }
    });

    // Alignment styles
    const alignStyles: Record<TabsAlign, string> = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        full: 'justify-between',
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
            <div className={`w-full ${className}`} role="tablist" aria-orientation="horizontal">
                {/* Tab headers */}
                <div
                    className={`
            flex flex-wrap ${alignStyles[align]} 
            ${divider ? 'border-b border-gray-200 dark:border-gray-700' : ''}
            ${tabListClassName}
          `}
                >
                    {tabList.map((tab) =>
                        React.cloneElement(tab, {
                            key: tab.props.id,
                            fullWidth: fullWidth || align === 'full',
                        })
                    )}
                </div>

                {/* Tab content */}
                <div className={`mt-4 ${tabContentClassName}`}>
                    {tabPanels.map((panel) =>
                        panel.props.id === activeTab ?
                            React.cloneElement(panel, { key: panel.props.id, active: true }) :
                            React.cloneElement(panel, { key: panel.props.id, active: false })
                    )}
                </div>
            </div>
        </TabsContext.Provider>
    );
};

export interface TabProps {
    /**
     * Unique identifier for the tab
     */
    id: string;
    /**
     * Tab label
     */
    label: React.ReactNode;
    /**
     * Optional icon to display before label
     */
    icon?: React.ReactNode;
    /**
     * Whether the tab is disabled
     */
    disabled?: boolean;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Make tab take full width (controlled by parent Tabs component)
     * @internal
     */
    fullWidth?: boolean;
    /**
     * Optional badge content
     */
    badge?: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({
                                            id,
                                            label,
                                            icon,
                                            disabled = false,
                                            className = '',
                                            fullWidth = false,
                                            badge,
                                        }) => {
    const { activeTab, setActiveTab, variant } = useContext(TabsContext);
    const isActive = activeTab === id;

    const handleClick = () => {
        if (!disabled) {
            setActiveTab(id);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setActiveTab(id);
        }
    };

    // Variant styles for active tabs
    const variantStyles: Record<TabsVariant, string> = {
        primary: 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400',
        secondary: 'text-gray-600 border-gray-600 dark:text-gray-400 dark:border-gray-400',
        success: 'text-green-600 border-green-600 dark:text-green-400 dark:border-green-400',
        danger: 'text-red-600 border-red-600 dark:text-red-400 dark:border-red-400',
        warning: 'text-yellow-600 border-yellow-600 dark:text-yellow-400 dark:border-yellow-400',
        info: 'text-cyan-600 border-cyan-600 dark:text-cyan-400 dark:border-cyan-400',
    };

    return (
        <button
            role="tab"
            id={`tab-${id}`}
            aria-controls={`tabpanel-${id}`}
            aria-selected={isActive}
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={`
        px-4 py-2 font-medium outline-none transition-all
        ${fullWidth ? 'flex-1 text-center' : ''}
        ${isActive
                ? `${variantStyles[variant]} border-b-2`
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent dark:text-gray-400 dark:hover:text-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
        >
            <div className="flex items-center justify-center">
                {icon && <span className="mr-2">{icon}</span>}
                <span>{label}</span>
                {badge && <span className="ml-2">{badge}</span>}
            </div>
        </button>
    );
};

export interface TabPanelProps {
    /**
     * ID matching the corresponding tab
     */
    id: string;
    /**
     * Tab panel content
     */
    children: React.ReactNode;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Whether the panel is active (controlled by parent Tabs component)
     * @internal
     */
    active?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({
                                                      id,
                                                      children,
                                                      className = '',
                                                      active = false,
                                                  }) => {
    // Animate panel transitions
    const panelClasses = `
    transition-opacity duration-300
    ${active ? 'opacity-100' : 'hidden opacity-0'}
    ${className}
  `;

    return (
        <div
            id={`tabpanel-${id}`}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            className={panelClasses}
            tabIndex={0}
        >
            {children}
        </div>
    );
};