import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    CreditCard,
    Tag,
    Tv,
    Home,
    Image,
    Users,
    PhoneCall,
    MessageSquare,
    Zap,
    HelpCircle,
    MapPin,
    Palette,
    Settings,
    BookOpen,
    Folder,
    Globe,
    ArrowUpRight,
} from 'lucide-react';
import AppLogo from './app-logo';

const navGroups: NavGroup[] = [
    {
        title: 'Dashboard',
        items: [
            { title: 'Overview', url: '/admin/dashboard', icon: LayoutDashboard },
        ],
    },
    {
        title: 'Plans & Services',
        items: [
            { title: 'Plans', url: '/admin/plans', icon: CreditCard },
            { title: 'Categories', url: '/admin/plan-categories', icon: Tag },
            { title: 'OTT / Services', url: '/admin/services', icon: Tv },
        ],
    },
    {
        title: 'Pages',
        items: [
            { title: 'Hero Section', url: '/admin/hero-config', icon: Home },
            { title: 'Plans Page', url: '/admin/pages/plans', icon: Globe },
            { title: 'About Page', url: '/admin/pages/about', icon: Users },
            { title: 'Contact Page', url: '/admin/pages/contact', icon: PhoneCall },
        ],
    },
    {
        title: 'Contact',
        items: [
            { title: 'Messages', url: '/admin/contact-messages', icon: MessageSquare },
            { title: 'Quick Methods', url: '/admin/contact/quick-methods', icon: Zap },
            { title: 'Inquiry Types', url: '/admin/contact/inquiry-types', icon: HelpCircle },
            { title: 'Office Locations', url: '/admin/contact/locations', icon: MapPin },
        ],
    },
    {
        title: 'Configuration',
        items: [
            { title: 'Website Config', url: '/admin/website-config', icon: Palette },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'View Site',
        url: '/',
        icon: ArrowUpRight,
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
