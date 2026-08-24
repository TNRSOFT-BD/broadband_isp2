import {
    Shield,
    Users,
    Zap,
    Clock,
    Heart,
    Globe,
    TrendingUp,
    Award,
    Headphones,
    Server,
    Eye,
    Target,
    BookOpen,
    Lock,
    CheckCircle2,
    Building2,
    GraduationCap,
    Landmark,
    Home,
    Wifi,
} from 'lucide-react';

/* ─── Hero ─── */
export const heroData = {
    eyebrow: 'ABOUT OUR COMPANY',
    title: 'Connecting People, Businesses & Possibilities',
    description:
        'We are committed to delivering reliable, high-performance internet and digital connectivity solutions that empower people, businesses, and communities to stay connected and move forward.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop',
};

/* ─── Company Introduction ─── */
export const companyData = {
    title: 'Who We Are',
    paragraphs: [
        '{{COMPANY_NAME}} is a trusted internet service provider and technology company dedicated to delivering high-speed, reliable connectivity to homes, businesses, and organizations. Since our founding in {{FOUNDED_YEAR}}, we have built a reputation for quality service, technical excellence, and customer-first values.',
        'Our network infrastructure spans across {{SERVICE_AREA}}, serving over {{CUSTOMER_COUNT}} customers with fiber broadband, business connectivity, and digital solutions designed for the modern world. We combine cutting-edge technology with responsive support to ensure our customers always stay connected.',
        'From residential broadband to enterprise-grade connectivity, we provide scalable solutions tailored to the unique needs of every customer. Our team of experienced engineers and support professionals work around the clock to maintain network reliability and deliver exceptional service.',
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
};

/* ─── Statistics ─── */
export const statsData = [
    { icon: TrendingUp, value: '15+', label: 'Years of Experience' },
    { icon: Users, value: '10K+', label: 'Happy Customers' },
    { icon: Wifi, value: '99.9%', label: 'Network Reliability' },
    { icon: Headphones, value: '24/7', label: 'Customer Support' },
    { icon: Globe, value: '50+', label: 'Coverage Areas' },
    { icon: Building2, value: '200+', label: 'Enterprise Clients' },
];

/* ─── Vision & Mission ─── */
export const visionData = {
    title: 'Our Vision',
    description:
        'To become a trusted leader in digital connectivity by making reliable technology and seamless communication accessible to everyone — empowering communities, businesses, and individuals to thrive in a connected world.',
    icon: Eye,
};

export const missionData = {
    title: 'Our Mission',
    description:
        'To deliver dependable, high-quality connectivity and digital solutions that empower people and organizations to achieve more — through continuous innovation, unwavering reliability, and a deep commitment to customer satisfaction.',
    icon: Target,
};

/* ─── Core Values ─── */
export const coreValuesData = [
    {
        icon: Shield,
        title: 'Reliability',
        description:
            'We build and maintain services our customers can depend on — every day, without compromise.',
    },
    {
        icon: Heart,
        title: 'Customer First',
        description:
            'Every decision starts with understanding and improving the customer experience.',
    },
    {
        icon: Zap,
        title: 'Innovation',
        description:
            'We continuously explore better technologies and smarter solutions to stay ahead.',
    },
    {
        icon: BookOpen,
        title: 'Integrity',
        description:
            'We operate with transparency, responsibility, and accountability in everything we do.',
    },
    {
        icon: Award,
        title: 'Excellence',
        description:
            'We focus on quality in our network, services, and customer support — nothing less.',
    },
    {
        icon: Globe,
        title: 'Connectivity for Growth',
        description:
            'We believe better connectivity creates more opportunities for people and businesses.',
    },
];

/* ─── Timeline / Journey ─── */
export const milestonesData = [
    {
        year: '2015',
        title: 'The Beginning',
        description: 'The journey begins with a vision to provide reliable internet connectivity to our community.',
    },
    {
        year: '2017',
        title: 'Network Expansion',
        description: 'Expanded network coverage and introduced high-speed broadband services to new areas.',
    },
    {
        year: '2020',
        title: 'Major Milestone',
        description: 'Reached a significant milestone in customer growth and expanded our network infrastructure.',
    },
    {
        year: '2022',
        title: 'Enterprise Solutions',
        description: 'Expanded business and enterprise connectivity solutions to serve organizations of all sizes.',
    },
    {
        year: '2024',
        title: 'Next Generation',
        description: 'Strengthened infrastructure and introduced next-generation digital services for the future.',
    },
    {
        year: 'Today',
        title: 'Continuing Forward',
        description: 'Continuing to connect more people, businesses, and possibilities with reliable technology.',
    },
];

/* ─── Capabilities ─── */
export const capabilitiesData = {
    title: 'Built for Reliable Connectivity',
    description:
        'Our network infrastructure is designed from the ground up to deliver consistent, high-performance connectivity. We invest in the latest technology to ensure our customers always have access to fast, reliable internet.',
    features: [
        { icon: Wifi, title: 'High-Speed Fiber Network', description: 'Fiber-to-the-home and business connections delivering speeds up to 1 Gbps.' },
        { icon: Server, title: 'Reliable Infrastructure', description: 'Redundant network architecture ensuring maximum uptime and reliability.' },
        { icon: Building2, title: 'Enterprise Connectivity', description: 'Dedicated leased lines and managed connectivity for businesses.' },
        { icon: Clock, title: '24/7 Network Monitoring', description: 'Round-the-clock monitoring to detect and resolve issues proactively.' },
        { icon: Headphones, title: 'Dedicated Support', description: 'Expert technical support available whenever you need assistance.' },
        { icon: TrendingUp, title: 'Scalable Solutions', description: 'Flexible plans that grow with your needs, from home to enterprise.' },
    ],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
};

/* ─── Client Categories ─── */
export const clientCategoriesData = [
    { icon: Landmark, title: 'Financial Institutions', description: 'Banks, insurance companies, and financial services.' },
    { icon: Building2, title: 'Corporate Organizations', description: 'Large enterprises and multinational companies.' },
    { icon: GraduationCap, title: 'Educational Institutions', description: 'Universities, schools, and research centers.' },
    { icon: Landmark, title: 'Government Organizations', description: 'Public sector agencies and government offices.' },
    { icon: Zap, title: 'SMEs', description: 'Small and medium enterprises across various industries.' },
    { icon: Home, title: 'Residential Customers', description: 'Homes and families seeking reliable broadband.' },
];

/* ─── Certifications ─── */
export const certificationsData = [
    {
        icon: Shield,
        title: 'Quality Policy',
        description: 'We are committed to maintaining the highest standards of service quality and continuous improvement across all operations.',
    },
    {
        icon: Lock,
        title: 'Information Security',
        description: 'Our systems and processes are designed to protect customer data and ensure the security of our network infrastructure.',
    },
    {
        icon: CheckCircle2,
        title: 'Regulatory Compliance',
        description: 'We operate in full compliance with {{REGULATORY_BODY}} regulations and industry standards.',
    },
    {
        icon: Award,
        title: 'Industry Certifications',
        description: 'Holding {{CERTIFICATION_NAME}} certification since {{CERTIFICATION_YEAR}}, demonstrating our commitment to quality.',
    },
    {
        icon: Globe,
        title: 'ISP License',
        description: 'Licensed ISP operator under {{ISP_LICENSE_NUMBER}}, authorized to provide internet services.',
    },
];

/* ─── Why Choose Us ─── */
export const whyChooseUsData = [
    { icon: Shield, title: 'Reliable & Stable Connectivity', description: 'Consistent performance you can count on, day after day.' },
    { icon: Headphones, title: 'Fast & Responsive Support', description: 'Expert help available 24/7 to resolve any issue quickly.' },
    { icon: Server, title: 'Modern Network Infrastructure', description: 'Built with the latest fiber technology for maximum speed and reliability.' },
    { icon: Users, title: 'Flexible Plans for Every Need', description: 'From basic home broadband to enterprise-grade solutions.' },
    { icon: Home, title: 'Solutions for Home & Business', description: 'Tailored connectivity solutions for residential and commercial use.' },
    { icon: TrendingUp, title: 'Continuous Improvement', description: 'We constantly upgrade our network to deliver better performance.' },
];

/* ─── CTA ─── */
export const ctaData = {
    title: 'Ready for a Better Connection?',
    description: 'Explore our internet packages or get in touch with our team to find the perfect solution for your home or business.',
    primaryButton: { text: 'Explore Packages', url: '/plans' },
    secondaryButton: { text: 'Contact Us', url: '/contact' },
};
