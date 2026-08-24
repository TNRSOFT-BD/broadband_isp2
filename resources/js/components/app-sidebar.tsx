import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, Globe, LayoutGrid, Layers, Link2, Settings, Sparkles, MessageSquare, Headphones, MapPin, HelpCircle } from 'lucide-react';
import AppLogo from './app-logo';

const navGroups: NavGroup[] = [
    {
        title: 'Overview',
        items: [
            { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutGrid },
        ],
    },
    {
        title: 'Plans & Services',
        items: [
            { title: 'Plans', url: '/admin/plans', icon: Layers },
            { title: 'Plan Categories', url: '/admin/plan-categories', icon: Link2 },
            { title: 'Services', url: '/admin/services', icon: Sparkles },
        ],
    },
    {
        title: 'Content Pages',
        items: [
            { title: 'Plans Page', url: '/admin/pages/plans', icon: Globe },
            { title: 'Contact Page', url: '/admin/pages/contact', icon: Headphones },
        ],
    },
    {
        title: 'Contact Management',
        items: [
            { title: 'Messages', url: '/admin/contact-messages', icon: MessageSquare },
            { title: 'Inquiry Types', url: '/admin/contact/inquiry-types', icon: HelpCircle },
            { title: 'Office Locations', url: '/admin/contact/locations', icon: MapPin },
        ],
    },
    {
        title: 'Configuration',
        items: [
            { title: 'Hero Config', url: '/admin/hero-config', icon: Globe },
            { title: 'Website Config', url: '/admin/website-config', icon: Settings },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={navGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
