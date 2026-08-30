import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';

function hasPermission(userPermissions: string[], permission?: string): boolean {
    if (!permission) return true;
    return userPermissions.includes(permission);
}

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const page = usePage();
    const userPermissions = (page.props.auth as any)?.user?.permissions ?? [];
    const adminPrefix = (page.props as any)?.admin_prefix ?? 'admin';

    /**
     * Replace /admin/ with the user's role prefix.
     * e.g. /admin/plans → /staff/plans for a staff user
     */
    function rewriteUrl(url: string): string {
        if (adminPrefix === 'admin') return url;
        if (url.startsWith('/admin/')) return '/' + adminPrefix + url.slice(6);
        if (url === '/admin') return '/' + adminPrefix;
        return url;
    }

    return (
        <>
            {groups.map((group) => {
                const visibleItems = group.items.filter((item) =>
                    hasPermission(userPermissions, item.permission)
                );

                if (visibleItems.length === 0) return null;

                return (
                    <SidebarGroup key={group.title} className="px-2 py-0">
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarMenu>
                            {visibleItems.map((item) => {
                                const url = rewriteUrl(item.url);
                                const isActive = page.url === url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link
                                                href={url}
                                                prefetch
                                                className={isActive ? 'bg-[var(--isp-secondary)]/10 text-[var(--isp-secondary)] font-medium' : ''}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                );
            })}
        </>
    );
}
