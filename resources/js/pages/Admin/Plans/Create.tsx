import { PlanForm, type PlanFormData } from '@/components/admin/plan-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { PlanCategory } from '@/types/plans';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    [key: string]: unknown;
    categories: Pick<PlanCategory, 'id' | 'name' | 'slug'>[];
    services: { id: number; name: string; slug: string; logo?: string | null }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Plans', href: '/admin/plans' },
    { title: 'Create', href: '/admin/plans/create' },
];

const initialData: PlanFormData = {
    name: '',
    slug: '',
    plan_category_id: '',
    tagline: '',
    description: '',
    speed: '',
    speed_unit: 'Mbps',
    download_speed: '',
    upload_speed: '',
    monthly_price: '',
    quarterly_price: '',
    yearly_price: '',
    setup_fee: '',
    vat_information: '',
    contract_duration: '',
    fair_usage_policy: '',
    terms_conditions: '',
    badge_text: '',
    is_featured: false,
    is_recommended: false,
    is_active: true,
    sort_order: '0',
    cta_text: '',
    cta_url: '',
    features: [],
    services: [],
};

export default function CreatePlan() {
    const { categories, services } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Plan" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create Internet Plan</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Fill in the sections below. Only name, category, speed, and monthly price are required.
                    </p>
                </div>

                <PlanForm
                    initialData={initialData}
                    categories={categories}
                    services={services}
                    submitRoute={route('admin.plans.store')}
                />
            </div>
        </AppLayout>
    );
}
