import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab, TabPanel } from './Tabs';
import { useState } from 'react';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Controls the color scheme of the active tab',
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'full'],
            description: 'Controls the alignment of the tabs',
        },
        divider: {
            control: 'boolean',
            description: 'Whether to show a divider below the tabs',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Whether tabs should take full width',
        },
    },
} as Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    render: (args) => (
        <Tabs {...args}>
            <Tab id="tab1" label="Home" />
            <Tab id="tab2" label="Profile" />
            <Tab id="tab3" label="Settings" />
            <Tab id="tab4" label="Contact" disabled />

            <TabPanel id="tab1">
                <h3 className="text-lg font-medium mb-2">Home Tab Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    This is the content for the Home tab. Welcome to our application!
                </p>
            </TabPanel>
            <TabPanel id="tab2">
                <h3 className="text-lg font-medium mb-2">Profile Tab Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    This is the content for the Profile tab. Here you can view and edit your profile.
                </p>
            </TabPanel>
            <TabPanel id="tab3">
                <h3 className="text-lg font-medium mb-2">Settings Tab Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    This is the content for the Settings tab. Adjust your application preferences here.
                </p>
            </TabPanel>
            <TabPanel id="tab4">
                <h3 className="text-lg font-medium mb-2">Contact Tab Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    This tab is disabled, but this content would show if it was enabled.
                </p>
            </TabPanel>
        </Tabs>
    ),
    args: {
        variant: 'primary',
        align: 'start',
        divider: true,
        defaultActiveTab: 'tab1',
    },
} as Story;

export const WithIcons: Story = {
    render: (args) => (
        <Tabs {...args}>
            <Tab
                id="tab1"
                label="Home"
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                }
            />
            <Tab
                id="tab2"
                label="Profile"
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                }
            />
            <Tab
                id="tab3"
                label="Settings"
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                }
            />

            <TabPanel id="tab1">
                <h3 className="text-lg font-medium mb-2">Home Tab Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    This is the content for the Home tab. Icons help users recognize tabs quickly.
                </p>
            </TabPanel>
            <TabPanel id="tab2">
                <h3 className="text-lg font-medium mb-2">Profile Tab Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    This is the content for the Profile tab with an icon.
                </p>
            </TabPanel>
            <TabPanel id="tab3">
                <h3 className="text-lg font-medium mb-2">Settings Tab Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    This is the content for the Settings tab with an icon.
                </p>
            </TabPanel>
        </Tabs>
    ),
    args: {
        variant: 'primary',
    },
} as Story;

export const Variants: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-medium mb-2">Primary Variant:</h3>
                <Tabs variant="primary" defaultActiveTab="primary1">
                    <Tab id="primary1" label="Primary Tab 1" />
                    <Tab id="primary2" label="Primary Tab 2" />
                    <TabPanel id="primary1">Content for primary tab 1</TabPanel>
                    <TabPanel id="primary2">Content for primary tab 2</TabPanel>
                </Tabs>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Secondary Variant:</h3>
                <Tabs variant="secondary" defaultActiveTab="secondary1">
                    <Tab id="secondary1" label="Secondary Tab 1" />
                    <Tab id="secondary2" label="Secondary Tab 2" />
                    <TabPanel id="secondary1">Content for secondary tab 1</TabPanel>
                    <TabPanel id="secondary2">Content for secondary tab 2</TabPanel>
                </Tabs>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Success Variant:</h3>
                <Tabs variant="success" defaultActiveTab="success1">
                    <Tab id="success1" label="Success Tab 1" />
                    <Tab id="success2" label="Success Tab 2" />
                    <TabPanel id="success1">Content for success tab 1</TabPanel>
                    <TabPanel id="success2">Content for success tab 2</TabPanel>
                </Tabs>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Danger Variant:</h3>
                <Tabs variant="danger" defaultActiveTab="danger1">
                    <Tab id="danger1" label="Danger Tab 1" />
                    <Tab id="danger2" label="Danger Tab 2" />
                    <TabPanel id="danger1">Content for danger tab 1</TabPanel>
                    <TabPanel id="danger2">Content for danger tab 2</TabPanel>
                </Tabs>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Warning Variant:</h3>
                <Tabs variant="warning" defaultActiveTab="warning1">
                    <Tab id="warning1" label="Warning Tab 1" />
                    <Tab id="warning2" label="Warning Tab 2" />
                    <TabPanel id="warning1">Content for warning tab 1</TabPanel>
                    <TabPanel id="warning2">Content for warning tab 2</TabPanel>
                </Tabs>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Info Variant:</h3>
                <Tabs variant="info" defaultActiveTab="info1">
                    <Tab id="info1" label="Info Tab 1" />
                    <Tab id="info2" label="Info Tab 2" />
                    <TabPanel id="info1">Content for info tab 1</TabPanel>
                    <TabPanel id="info2">Content for info tab 2</TabPanel>
                </Tabs>
            </div>
        </div>
    ),
} as Story;

export const Alignment: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-medium mb-2">Start Alignment (Default):</h3>
                <Tabs align="start">
                    <Tab id="start1" label="Tab 1" />
                    <Tab id="start2" label="Tab 2" />
                    <Tab id="start3" label="Tab 3" />
                    <TabPanel id="start1">Content for tab 1</TabPanel>
                    <TabPanel id="start2">Content for tab 2</TabPanel>
                    <TabPanel id="start3">Content for tab 3</TabPanel>
                </Tabs>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Center Alignment:</h3>
                <Tabs align="center">
                    <Tab id="center1" label="Tab 1" />
                    <Tab id="center2" label="Tab 2" />
                    <Tab id="center3" label="Tab 3" />
                    <TabPanel id="center1">Content for tab 1</TabPanel>
                    <TabPanel id="center2">Content for tab 2</TabPanel>
                    <TabPanel id="center3">Content for tab 3</TabPanel>
                </Tabs>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">End Alignment:</h3>
                <Tabs align="end">
                    <Tab id="end1" label="Tab 1" />
                    <Tab id="end2" label="Tab 2" />
                    <Tab id="end3" label="Tab 3" />
                    <TabPanel id="end1">Content for tab 1</TabPanel>
                    <TabPanel id="end2">Content for tab 2</TabPanel>
                    <TabPanel id="end3">Content for tab 3</TabPanel>
                </Tabs>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Full Width:</h3>
                <Tabs fullWidth>
                    <Tab id="full1" label="Tab 1" />
                    <Tab id="full2" label="Tab 2" />
                    <Tab id="full3" label="Tab 3" />
                    <TabPanel id="full1">Content for tab 1</TabPanel>
                    <TabPanel id="full2">Content for tab 2</TabPanel>
                    <TabPanel id="full3">Content for tab 3</TabPanel>
                </Tabs>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Equal Distribution (full):</h3>
                <Tabs align="full">
                    <Tab id="equal1" label="Tab 1" />
                    <Tab id="equal2" label="Tab 2" />
                    <Tab id="equal3" label="Tab 3" />
                    <TabPanel id="equal1">Content for tab 1</TabPanel>
                    <TabPanel id="equal2">Content for tab 2</TabPanel>
                    <TabPanel id="equal3">Content for tab 3</TabPanel>
                </Tabs>
            </div>
        </div>
    ),
} as Story;

export const WithBadges: Story = {
    render: () => (
        <Tabs defaultActiveTab="badge1">
            <Tab
                id="badge1"
                label="Messages"
                badge={<Badge variant="danger" size="sm">5</Badge>}
            />
            <Tab
                id="badge2"
                label="Notifications"
                badge={<Badge variant="warning" size="sm">12</Badge>}
            />
            <Tab
                id="badge3"
                label="Settings"
            />

            <TabPanel id="badge1">
                <h3 className="text-lg font-medium mb-2">Messages</h3>
                <p>You have 5 unread messages.</p>
            </TabPanel>
            <TabPanel id="badge2">
                <h3 className="text-lg font-medium mb-2">Notifications</h3>
                <p>You have 12 unread notifications.</p>
            </TabPanel>
            <TabPanel id="badge3">
                <h3 className="text-lg font-medium mb-2">Settings</h3>
                <p>Manage your account settings here.</p>
            </TabPanel>
        </Tabs>
    ),
} as Story;

export const ControlledTabs: Story = {
    render: () => {
        const [activeTab, setActiveTab] = useState('controlled1');

        return (
            <div className="space-y-4">
                <div>
                    <p className="mb-2 text-sm">Currently active: {activeTab}</p>
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setActiveTab('controlled1')}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                            Activate First
                        </button>
                        <button
                            onClick={() => setActiveTab('controlled2')}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                            Activate Second
                        </button>
                        <button
                            onClick={() => setActiveTab('controlled3')}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                            Activate Third
                        </button>
                    </div>
                </div>

                <Tabs
                    activeTab={activeTab}
                    onChange={(tabId) => setActiveTab(tabId)}
                >
                    <Tab id="controlled1" label="First Tab" />
                    <Tab id="controlled2" label="Second Tab" />
                    <Tab id="controlled3" label="Third Tab" />
                    <TabPanel id="controlled1">Content for first tab</TabPanel>
                    <TabPanel id="controlled2">Content for second tab</TabPanel>
                    <TabPanel id="controlled3">Content for third tab</TabPanel>
                </Tabs>
            </div>
        );
    },
} as Story;

export const NoBorderTabs: Story = {
    render: () => (
        <Tabs divider={false} variant="primary">
            <Tab id="noborder1" label="First Tab" />
            <Tab id="noborder2" label="Second Tab" />
            <Tab id="noborder3" label="Third Tab" />
            <TabPanel id="noborder1">
                <h3 className="text-lg font-medium mb-2">No Border Style</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    These tabs don't have a divider line below them. This style can be useful for
                    a cleaner look or when tabs are placed within another container.
                </p>
            </TabPanel>
            <TabPanel id="noborder2">
                <h3 className="text-lg font-medium mb-2">Second Tab Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Content for the second tab without borders.
                </p>
            </TabPanel>
            <TabPanel id="noborder3">
                <h3 className="text-lg font-medium mb-2">Third Tab Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Content for the third tab without borders.
                </p>
            </TabPanel>
        </Tabs>
    ),
} as Story;

export const ComplexContent: Story = {
    render: () => (
        <Tabs defaultActiveTab="complex1">
            <Tab id="complex1" label="Dashboard" />
            <Tab id="complex2" label="Analytics" />
            <Tab id="complex3" label="Reports" />

            <TabPanel id="complex1">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Dashboard Overview</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Users</h4>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">24,521</p>
                            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                                <span className="mr-1">↑</span> 12% increase
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Revenue</h4>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">$34,245</p>
                            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                                <span className="mr-1">↑</span> 8% increase
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Active Sessions</h4>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">1,253</p>
                            <p className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
                                <span className="mr-1">↓</span> 3% decrease
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                        <h4 className="font-medium mb-2">Recent Activity</h4>
                        <ul className="space-y-2">
                            <li className="flex justify-between p-2 border-b dark:border-gray-600">
                                <span>New user registration</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Just now</span>
                            </li>
                            <li className="flex justify-between p-2 border-b dark:border-gray-600">
                                <span>Server update completed</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">5 min ago</span>
                            </li>
                            <li className="flex justify-between p-2">
                                <span>New order received</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">15 min ago</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </TabPanel>

            <TabPanel id="complex2">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Analytics Data</h3>
                    <p className="mb-4">Complex analytics content would go here.</p>
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        [Analytics Chart Placeholder]
                    </div>
                </div>
            </TabPanel>

            <TabPanel id="complex3">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Monthly Reports</h3>
                    <p className="mb-4">Report listings and data would go here.</p>
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        [Reports Table Placeholder]
                    </div>
                </div>
            </TabPanel>
        </Tabs>
    ),
} as Story;