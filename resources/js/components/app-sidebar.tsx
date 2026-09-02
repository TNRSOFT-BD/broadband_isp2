import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    CreditCard,
    Tag,
    Tv,
    Users,
    PhoneCall,
    MessageSquare,
    Zap,
    HelpCircle,
    MapPin,
    Palette,
    Globe,
    UserCog,
    LayoutGrid,
    Handshake,
    Shield,
    UserPlus,
    FileText,
    Share2,
    Landmark,
} from 'lucide-react';
import AppLogo from './app-logo';

const navGroups: NavGroup[] = [
    {
        title: 'Dashboard',
        items: [
            { title: 'Overview', url: '/admin/dashboard', icon: LayoutDashboard, permission: 'view-dashboard' },
        ],
    },
    {
        title: 'Plans & Services',
        items: [
            { title: 'Plans', url: '/admin/plans', icon: CreditCard, permission: 'view-plans' },
            { title: 'Categories', url: '/admin/plan-categories', icon: Tag, permission: 'view-plan-categories' },
            { title: 'OTT / Services', url: '/admin/services', icon: Tv, permission: 'view-services' },
        ],
    },

    {
        title: 'Contact',
        items: [
            { title: 'Messages', url: '/admin/contact-messages', icon: MessageSquare, permission: 'view-contact-messages' },
            { title: 'Quick Methods', url: '/admin/contact/quick-methods', icon: Zap, permission: 'manage-quick-contact-methods' },
            { title: 'Inquiry Types', url: '/admin/contact/inquiry-types', icon: HelpCircle, permission: 'manage-inquiry-types' },
            { title: 'Office Locations', url: '/admin/contact/locations', icon: MapPin, permission: 'manage-office-locations' },
        ],
    },
    {
        title: 'Pages',
        items: [
            { title: 'Homepage', url: '/admin/homepage', icon: LayoutGrid, permission: 'view-homepage' },
            { title: 'Plans Page', url: '/admin/pages/plans', icon: Globe, permission: 'manage-plans-page' },
            { title: 'About Page', url: '/admin/pages/about', icon: Users, permission: 'manage-about-page' },
            { title: 'Contact Page', url: '/admin/pages/contact', icon: PhoneCall, permission: 'manage-contact-page' },
            { title: 'Legal Pages', url: '/admin/legal-pages', icon: FileText, permission: 'view-legal-pages' },
        ],
    },
    {
        title: 'Configuration',
        items: [
            { title: 'Website Config', url: '/admin/website-config', icon: Palette, permission: 'view-website-config' },
            { title: '3rd Party Site Config', url: '/admin/third-party-links', icon: Globe, permission: 'view-website-config' },
            { title: 'Social Media', url: '/admin/social-media', icon: Share2, permission: 'manage-social-media' },
            { title: 'Payment Partners', url: '/admin/payment-partners', icon: Landmark, permission: 'manage-payment-partners' },
        ],
    },
    {
        title: 'Management',
        items: [
            { title: 'Users', url: '/admin/users', icon: UserPlus, permission: 'view-users' },
            { title: 'Roles', url: '/admin/roles', icon: Shield, permission: 'manage-roles' },
        ],
    },
    {
        title: 'Account',
        items: [
            { title: 'Profile', url: '/admin/profile', icon: UserCog, permission: 'edit-own-profile' },
        ],
    },
];

export function AppSidebar() {
    const page = usePage();
    const adminPrefix = (page.props as any)?.admin_prefix ?? 'admin';
    const dashboardUrl = `/${adminPrefix}/dashboard`;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={navGroups} />
            </SidebarContent>

        </Sidebar>
    );
}
