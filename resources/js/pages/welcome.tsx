import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import HeroSection from '@/components/hero-section';

export default function Welcome() {
    return (
        <PublicLayout>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <HeroSection />
        </PublicLayout>
    );
}
