import { PlanForm, type PlanFormData } from '@/components/admin/plan-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { AdminPlan, PlanCategory } from '@/types/plans';
import { Head, usePage } from '@inertiajs/react';
import { useAdminUrl } from '@/hooks/use-admin-url';

interface PageProps {
    [key: string]: unknown;
    plan: AdminPlan;
    categories: Pick<PlanCategory, 'id' | 'name' | 'slug'>[];
    services: { id: number; name: string; slug: string; logo?: string | null }[];
}


export default function EditPlan() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Plans', href: adminUrl('/plans') },
    ];

    const { plan, categories, services } = usePage<PageProps>().props;

    const initialData: PlanFormData = {
        name: plan.name,
        slug: plan.slug,
        plan_category_id: plan.plan_category_id != null ? String(plan.plan_category_id) : '',
        tagline: plan.tagline ?? '',
        description: plan.description ?? '',
        speed: String(plan.speed),
        speed_unit: plan.speed_unit,
        download_speed: plan.download_speed ? String(plan.download_speed) : '',
        upload_speed: plan.upload_speed ? String(plan.upload_speed) : '',
        monthly_price: String(plan.monthly_price),
        quarterly_price: plan.quarterly_price != null ? String(plan.quarterly_price) : '',
        yearly_price: plan.yearly_price != null ? String(plan.yearly_price) : '',
        setup_fee: plan.setup_fee != null ? String(plan.setup_fee) : '',
        vat_information: plan.vat_information ?? '',
        contract_duration: plan.contract_duration ?? '',
        fair_usage_policy: plan.fair_usage_policy ?? '',
        terms_conditions: plan.terms_conditions ?? '',
        badge_text: plan.badge_text ?? '',
        is_featured: plan.is_featured,
        is_recommended: plan.is_recommended,
        is_active: plan.is_active,
        sort_order: String(plan.sort_order),
        cta_text: plan.cta_text ?? '',
        cta_url: plan.cta_url ?? '',
        features: plan.features.map((f) => ({
            title: f.title,
            icon: f.icon ?? '',
            description: f.description ?? '',
        })),
        services: plan.services.map((s) => ({
            service_id: s.id,
            custom_label: s.custom_label ?? '',
            custom_note: s.custom_note ?? '',
            duration: s.duration ?? '',
            is_included: true,
            is_featured: false,
        })),
    };

    return (
        <AppLayout breadcrumbs={[...breadcrumbs, { title: plan.name, href: adminUrl(`/plans/${plan.id}/edit`) }]}>
            <Head title={`Edit ${plan.name}`} />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Edit "{plan.name}"</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Update any section below and save. Changes go live immediately.
                    </p>
                </div>

                <PlanForm
                    key={plan.id}
                    initialData={initialData}
                    categories={categories}
                    services={services}
                    submitRoute={route('admin.plans.update', plan.id)}
                    method="put"
                />
            </div>
        </AppLayout>
    );
}
