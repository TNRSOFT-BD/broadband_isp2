import { Link } from '@inertiajs/react';
import { ThemeProvider } from '@/components/theme-provider';
import IspLogo from '@/components/isp-logo';
import { type ReactNode } from 'react';

interface AuthSplitLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    eyebrow?: string;
}

function NetworkVisual() {
    return (
        <div className="auth-visual-container">
            <div className="auth-grid-pattern" />
            <div className="auth-glow-orb auth-glow-orb-1" />
            <div className="auth-glow-orb auth-glow-orb-2" />
            <div className="auth-glow-orb auth-glow-orb-3" />

            <svg
                className="auth-network-svg"
                viewBox="0 0 600 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <g className="auth-network-lines" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
                    <line x1="100" y1="100" x2="300" y2="200" className="auth-line" />
                    <line x1="300" y1="200" x2="500" y2="150" className="auth-line" />
                    <line x1="300" y1="200" x2="200" y2="400" className="auth-line" />
                    <line x1="200" y1="400" x2="400" y2="500" className="auth-line" />
                    <line x1="400" y1="500" x2="500" y2="350" className="auth-line" />
                    <line x1="500" y1="350" x2="500" y2="150" className="auth-line" />
                    <line x1="200" y1="400" x2="100" y2="600" className="auth-line" />
                    <line x1="400" y1="500" x2="300" y2="700" className="auth-line" />
                    <line x1="300" y1="700" x2="500" y2="650" className="auth-line" />
                    <line x1="100" y1="600" x2="300" y2="700" className="auth-line" />
                    <line x1="100" y1="100" x2="50" y2="300" className="auth-line" />
                    <line x1="50" y1="300" x2="100" y2="600" className="auth-line" />
                    <line x1="500" y1="150" x2="550" y2="400" className="auth-line" />
                    <line x1="550" y1="400" x2="500" y2="650" className="auth-line" />
                </g>
                <g className="auth-pulse-paths">
                    <line x1="100" y1="100" x2="300" y2="200" className="auth-pulse-line" />
                    <line x1="300" y1="200" x2="200" y2="400" className="auth-pulse-line auth-pulse-delay-1" />
                    <line x1="200" y1="400" x2="400" y2="500" className="auth-pulse-line auth-pulse-delay-2" />
                    <line x1="400" y1="500" x2="300" y2="700" className="auth-pulse-line auth-pulse-delay-3" />
                </g>
                <g className="auth-network-nodes">
                    <circle cx="100" cy="100" r="4" className="auth-node auth-node-primary" />
                    <circle cx="300" cy="200" r="6" className="auth-node auth-node-accent" />
                    <circle cx="500" cy="150" r="4" className="auth-node auth-node-primary" />
                    <circle cx="200" cy="400" r="5" className="auth-node auth-node-primary" />
                    <circle cx="400" cy="500" r="6" className="auth-node auth-node-accent" />
                    <circle cx="500" cy="350" r="4" className="auth-node auth-node-primary" />
                    <circle cx="100" cy="600" r="4" className="auth-node auth-node-primary" />
                    <circle cx="300" cy="700" r="5" className="auth-node auth-node-accent" />
                    <circle cx="500" cy="650" r="4" className="auth-node auth-node-primary" />
                    <circle cx="50" cy="300" r="3" className="auth-node auth-node-secondary" />
                    <circle cx="550" cy="400" r="3" className="auth-node auth-node-secondary" />
                </g>
            </svg>

            <div className="auth-visual-content">
                <div className="auth-visual-logo">
                    <IspLogo variant="icon" className="h-16 w-16" />
                </div>
                <p className="auth-visual-eyebrow">CONNECTED TO THE FUTURE</p>
                <h2 className="auth-visual-heading">A Better Connection Starts Here.</h2>
                <p className="auth-visual-description">
                    Access your account and manage your internet services from one secure place.
                </p>
            </div>
        </div>
    );
}

export default function AuthSplitLayout({ children, title, description, eyebrow }: AuthSplitLayoutProps) {
    return (
        <ThemeProvider>
            <div className="auth-split-root">
                <style>{`
                    /* ═══════════════════════════════════════════
                       ROOT LAYOUT
                    ═══════════════════════════════════════════ */
                    .auth-split-root {
                        min-height: 100dvh;
                        display: flex;
                        background: var(--background);
                    }

                    /* ═══════════════════════════════════════════
                       LEFT VISUAL PANEL
                    ═══════════════════════════════════════════ */
                    .auth-visual-panel {
                        display: none;
                        position: relative;
                        width: 50%;
                        min-height: 100dvh;
                        overflow: hidden;
                        background: linear-gradient(135deg, #0b1120 0%, #0f172a 40%, #111827 100%);
                    }
                    @media (min-width: 1024px) {
                        .auth-visual-panel {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                    .auth-visual-container {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    /* Grid */
                    .auth-grid-pattern {
                        position: absolute;
                        inset: 0;
                        background-image:
                            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                        background-size: 60px 60px;
                        mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
                        -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
                    }

                    /* Glow orbs */
                    .auth-glow-orb {
                        position: absolute;
                        border-radius: 50%;
                        pointer-events: none;
                        filter: blur(120px);
                    }
                    .auth-glow-orb-1 {
                        width: 400px; height: 400px;
                        background: var(--isp-primary, #2563EB);
                        opacity: 0.08; top: -100px; left: -100px;
                        animation: authFloatOrb1 20s ease-in-out infinite;
                    }
                    .auth-glow-orb-2 {
                        width: 350px; height: 350px;
                        background: var(--isp-accent, #06B6D4);
                        opacity: 0.06; bottom: -50px; right: -50px;
                        animation: authFloatOrb2 25s ease-in-out infinite;
                    }
                    .auth-glow-orb-3 {
                        width: 250px; height: 250px;
                        background: var(--isp-secondary, #0891B2);
                        opacity: 0.05; top: 50%; left: 50%;
                        transform: translate(-50%, -50%);
                        animation: authFloatOrb3 18s ease-in-out infinite;
                    }
                    @keyframes authFloatOrb1 {
                        0%, 100% { transform: translate(0, 0); }
                        50% { transform: translate(40px, 30px); }
                    }
                    @keyframes authFloatOrb2 {
                        0%, 100% { transform: translate(0, 0); }
                        50% { transform: translate(-30px, -40px); }
                    }
                    @keyframes authFloatOrb3 {
                        0%, 100% { transform: translate(-50%, -50%) scale(1); }
                        50% { transform: translate(-50%, -50%) scale(1.15); }
                    }

                    /* Network SVG */
                    .auth-network-svg {
                        position: absolute; inset: 0;
                        width: 100%; height: 100%;
                        opacity: 0.7;
                    }
                    .auth-line { animation: authLinePulse 4s ease-in-out infinite; }
                    .auth-line:nth-child(odd) { animation-delay: 0s; }
                    .auth-line:nth-child(even) { animation-delay: 2s; }
                    @keyframes authLinePulse {
                        0%, 100% { stroke-opacity: 0.06; }
                        50% { stroke-opacity: 0.15; }
                    }
                    .auth-pulse-line {
                        stroke: var(--isp-primary, #2563EB); stroke-width: 2;
                        stroke-dasharray: 8 16; stroke-linecap: round;
                        opacity: 0.4; animation: authDashFlow 3s linear infinite;
                    }
                    .auth-pulse-delay-1 { animation-delay: 0.75s; }
                    .auth-pulse-delay-2 { animation-delay: 1.5s; }
                    .auth-pulse-delay-3 { animation-delay: 2.25s; }
                    @keyframes authDashFlow { to { stroke-dashoffset: -24; } }
                    .auth-node {
                        filter: drop-shadow(0 0 4px currentColor);
                        animation: authNodePulse 3s ease-in-out infinite;
                    }
                    .auth-node-primary { fill: var(--isp-primary, #2563EB); color: var(--isp-primary, #2563EB); opacity: 0.6; }
                    .auth-node-accent { fill: var(--isp-accent, #06B6D4); color: var(--isp-accent, #06B6D4); opacity: 0.8; animation-duration: 2.5s; }
                    .auth-node-secondary { fill: var(--isp-secondary, #0891B2); color: var(--isp-secondary, #0891B2); opacity: 0.5; animation-delay: 1s; }
                    @keyframes authNodePulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.9; } }

                    /* Visual content */
                    .auth-visual-content {
                        position: relative; z-index: 10;
                        display: flex; flex-direction: column; align-items: center;
                        text-align: center; padding: 2rem; max-width: 420px;
                        animation: authContentFadeIn 1s ease-out 0.3s both;
                    }
                    @keyframes authContentFadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .auth-visual-logo { margin-bottom: 2rem; opacity: 0.9; }
                    .auth-visual-eyebrow {
                        font-size: 0.7rem; font-weight: 600; letter-spacing: 0.2em;
                        text-transform: uppercase; color: var(--isp-primary, #2563EB); margin-bottom: 1.25rem;
                    }
                    .auth-visual-heading {
                        font-size: 2rem; font-weight: 700; line-height: 1.2;
                        color: #f8fafc; margin-bottom: 1rem;
                    }
                    .auth-visual-description {
                        font-size: 0.95rem; line-height: 1.7; color: #94a3b8; max-width: 340px;
                    }

                    /* ═══════════════════════════════════════════
                       RIGHT FORM PANEL (IMPROVED)
                    ═══════════════════════════════════════════ */
                    .auth-form-panel {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100dvh;
                        padding: 2rem 1.5rem;
                        position: relative;
                        overflow: hidden;
                    }

                    /* Subtle ambient glow behind the form area */
                    .auth-form-panel::before {
                        content: '';
                        position: absolute;
                        width: 500px; height: 500px;
                        border-radius: 50%;
                        background: radial-gradient(circle, var(--isp-primary, #2563EB) 0%, transparent 70%);
                        opacity: 0.03;
                        top: 50%; left: 50%;
                        transform: translate(-50%, -50%);
                        pointer-events: none;
                        animation: authFormGlow 12s ease-in-out infinite;
                    }
                    @keyframes authFormGlow {
                        0%, 100% { opacity: 0.025; transform: translate(-50%, -50%) scale(1); }
                        50% { opacity: 0.045; transform: translate(-50%, -50%) scale(1.1); }
                    }

                    /* Top gradient accent line */
                    .auth-form-panel::after {
                        content: '';
                        position: absolute;
                        top: 0; left: 0; right: 0;
                        height: 1px;
                        background: linear-gradient(90deg, transparent 0%, var(--isp-primary, #2563EB) 30%, var(--isp-accent, #06B6D4) 70%, transparent 100%);
                        opacity: 0.2;
                    }

                    @media (min-width: 1024px) {
                        .auth-form-panel { width: 50%; padding: 2rem 3rem; }
                    }

                    .auth-form-wrapper {
                        width: 100%; max-width: 420px;
                        position: relative; z-index: 1;
                        animation: authFormFadeIn 0.6s ease-out 0.1s both;
                    }
                    @keyframes authFormFadeIn {
                        from { opacity: 0; transform: translateY(12px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    /* ═══════════════════════════════════════════
                       FORM CARD (IMPROVED)
                    ═══════════════════════════════════════════ */
                    .auth-form-card {
                        position: relative;
                        background: var(--card);
                        border: 1px solid var(--border);
                        border-radius: 1rem;
                        padding: 2rem;
                        transition: box-shadow 0.4s ease, border-color 0.4s ease;
                        box-shadow:
                            0 1px 2px rgba(0,0,0,0.03),
                            0 4px 16px rgba(0,0,0,0.03);
                    }

                    /* Subtle glow border on hover */
                    .auth-form-card::before {
                        content: '';
                        position: absolute;
                        inset: -1px;
                        border-radius: 1rem;
                        padding: 1px;
                        background: linear-gradient(135deg, var(--isp-primary, #2563EB) 0%, var(--isp-accent, #06B6D4) 50%, transparent 100%);
                        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        mask-composite: exclude;
                        -webkit-mask-composite: xor;
                        opacity: 0;
                        transition: opacity 0.4s ease;
                        pointer-events: none;
                    }
                    .auth-form-card:hover::before { opacity: 0.5; }

                    .auth-form-card:hover {
                        box-shadow:
                            0 2px 8px rgba(0,0,0,0.05),
                            0 12px 40px rgba(0,0,0,0.04),
                            0 0 60px -20px var(--isp-primary, #2563EB);
                    }

                    .dark .auth-form-card {
                        box-shadow:
                            0 1px 3px rgba(0,0,0,0.3),
                            0 4px 16px rgba(0,0,0,0.2);
                    }
                    .dark .auth-form-card:hover {
                        box-shadow:
                            0 2px 8px rgba(0,0,0,0.4),
                            0 12px 40px rgba(0,0,0,0.3),
                            0 0 80px -20px var(--isp-primary, #2563EB);
                    }

                    /* ═══════════════════════════════════════════
                       HEADER AREA
                    ═══════════════════════════════════════════ */
                    .auth-form-header {
                        margin-bottom: 2rem;
                    }
                    .auth-form-header h1 {
                        font-size: 1.625rem;
                        font-weight: 700;
                        line-height: 1.3;
                        color: var(--foreground);
                        letter-spacing: -0.02em;
                        margin-bottom: 0.375rem;
                    }
                    .auth-form-header p {
                        font-size: 0.875rem;
                        color: var(--muted-foreground);
                        line-height: 1.6;
                    }

                    /* ═══════════════════════════════════════════
                       FORM GROUP
                    ═══════════════════════════════════════════ */
                    .auth-field-group {
                        margin-bottom: 1.125rem;
                    }
                    .auth-field-group:last-of-type {
                        margin-bottom: 0;
                    }
                    .auth-field-label {
                        display: flex;
                        align-items: center;
                        gap: 0.375rem;
                        font-size: 0.8rem;
                        font-weight: 600;
                        color: var(--foreground);
                        margin-bottom: 0.5rem;
                        letter-spacing: -0.005em;
                    }
                    .auth-field-label svg {
                        opacity: 0.45;
                    }

                    /* ═══════════════════════════════════════════
                       INPUT WRAPPER (with icon)
                    ═══════════════════════════════════════════ */
                    .auth-input-wrap {
                        position: relative;
                    }
                    .auth-input-wrap .auth-input-icon {
                        position: absolute;
                        left: 0.875rem;
                        top: 50%; transform: translateY(-50%);
                        color: var(--muted-foreground);
                        pointer-events: none;
                        opacity: 0.5;
                        transition: opacity 0.2s ease, color 0.2s ease;
                        z-index: 2;
                    }
                    .auth-input-wrap:focus-within .auth-input-icon {
                        opacity: 0.8;
                        color: var(--isp-primary, #2563EB);
                    }

                    .auth-input {
                        width: 100%;
                        height: 2.875rem;
                        padding: 0 0.875rem;
                        font-size: 0.875rem;
                        font-family: inherit;
                        color: var(--foreground);
                        background: var(--background);
                        border: 1.5px solid var(--border);
                        border-radius: 0.625rem;
                        outline: none;
                        transition: all 0.25s ease;
                    }
                    .auth-input::placeholder {
                        color: var(--muted-foreground);
                        opacity: 0.5;
                    }
                    .auth-input:hover:not(:disabled) {
                        border-color: var(--muted-foreground);
                    }
                    .auth-input:focus {
                        border-color: var(--isp-primary, #2563EB);
                        box-shadow:
                            0 0 0 3px rgba(37, 99, 235, 0.08),
                            0 1px 2px rgba(0,0,0,0.04);
                    }
                    .dark .auth-input:focus {
                        box-shadow:
                            0 0 0 3px rgba(37, 99, 235, 0.15),
                            0 1px 2px rgba(0,0,0,0.2);
                    }
                    .auth-input:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    .auth-input-auth-error {
                        border-color: var(--destructive, #ef4444) !important;
                    }
                    .auth-input-auth-error:focus {
                        box-shadow:
                            0 0 0 3px rgba(239, 68, 68, 0.1),
                            0 1px 2px rgba(0,0,0,0.04) !important;
                    }

                    /* Input with left icon padding */
                    .auth-input-wrap .auth-input-has-icon {
                        padding-left: 2.75rem;
                    }

                    /* Password toggle */
                    .auth-password-toggle {
                        position: absolute;
                        right: 0; top: 0; bottom: 0;
                        width: 2.75rem;
                        display: flex; align-items: center; justify-content: center;
                        color: var(--muted-foreground);
                        cursor: pointer;
                        background: none; border: none; outline: none; padding: 0;
                        transition: color 0.2s ease;
                        z-index: 2;
                    }
                    .auth-password-toggle:hover { color: var(--foreground); }
                    .auth-password-toggle:focus-visible {
                        outline: 2px solid var(--ring);
                        outline-offset: -2px;
                        border-radius: 4px;
                    }

                    /* ═══════════════════════════════════════════
                       REMEMBER ME ROW
                    ═══════════════════════════════════════════ */
                    .auth-remember-row {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 1rem;
                        margin-bottom: 1.5rem;
                    }
                    .auth-remember-left {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    .auth-remember-label {
                        font-size: 0.8rem;
                        color: var(--muted-foreground);
                        cursor: pointer;
                        user-select: none;
                        transition: color 0.2s ease;
                    }
                    .auth-remember-label:hover { color: var(--foreground); }

                    /* ═══════════════════════════════════════════
                       SIGN IN BUTTON (IMPROVED)
                    ═══════════════════════════════════════════ */
                    .auth-signin-btn {
                        position: relative;
                        width: 100%;
                        height: 3rem;
                        padding: 0 1.5rem;
                        font-size: 0.9rem;
                        font-weight: 600;
                        font-family: inherit;
                        letter-spacing: 0.01em;
                        color: white;
                        background: linear-gradient(135deg, var(--isp-primary, #2563EB) 0%, color-mix(in srgb, var(--isp-primary, #2563EB) 85%, var(--isp-secondary, #0891B2)) 100%);
                        border: none;
                        border-radius: 0.625rem;
                        cursor: pointer;
                        overflow: hidden;
                        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        clip-path: polygon(
                            12px 0%,
                            100% 0%,
                            calc(100% - 12px) 100%,
                            0% 100%
                        );
                        box-shadow:
                            0 2px 8px rgba(37, 99, 235, 0.25),
                            0 1px 2px rgba(0,0,0,0.1);
                    }
                    .auth-signin-btn::before {
                        content: '';
                        position: absolute;
                        top: 0; left: -100%; width: 100%; height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                        transition: left 0.5s ease;
                    }
                    .auth-signin-btn:hover:not(:disabled)::before { left: 100%; }
                    .auth-signin-btn:hover:not(:disabled) {
                        background: linear-gradient(135deg, var(--isp-primary-dark, #1E40AF) 0%, color-mix(in srgb, var(--isp-primary-dark, #1E40AF) 85%, var(--isp-secondary, #0891B2)) 100%);
                        transform: translateY(-1px);
                        box-shadow:
                            0 4px 16px rgba(37, 99, 235, 0.35),
                            0 2px 4px rgba(0,0,0,0.1);
                    }
                    .auth-signin-btn:active:not(:disabled) {
                        transform: translateY(0) scale(0.99);
                        box-shadow:
                            0 1px 4px rgba(37, 99, 235, 0.2),
                            0 1px 2px rgba(0,0,0,0.1);
                    }
                    .auth-signin-btn:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                        filter: saturate(0.6);
                    }
                    .auth-signin-btn:focus-visible {
                        outline: 2px solid var(--ring);
                        outline-offset: 2px;
                    }
                    .auth-signin-btn-label {
                        position: relative;
                        z-index: 1;
                    }

                    .auth-spinner { animation: authSpin 1s linear infinite; }
                    @keyframes authSpin { to { transform: rotate(360deg); } }

                    /* ═══════════════════════════════════════════
                       DIVIDER
                    ═══════════════════════════════════════════ */
                    .auth-divider {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        margin: 1.5rem 0;
                    }
                    .auth-divider::before,
                    .auth-divider::after {
                        content: '';
                        flex: 1;
                        height: 1px;
                        background: var(--border);
                    }
                    .auth-divider-text {
                        font-size: 0.7rem;
                        font-weight: 500;
                        color: var(--muted-foreground);
                        text-transform: uppercase;
                        letter-spacing: 0.08em;
                        white-space: nowrap;
                        opacity: 0.6;
                    }

                    /* ═══════════════════════════════════════════
                       SECURITY BADGE
                    ═══════════════════════════════════════════ */
                    .auth-security-badge {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.375rem;
                        padding: 0.625rem;
                        border-radius: 0.5rem;
                        background: var(--muted);
                        margin-top: 1.5rem;
                    }
                    .auth-security-badge svg {
                        color: var(--muted-foreground);
                        opacity: 0.5;
                    }
                    .auth-security-badge span {
                        font-size: 0.7rem;
                        color: var(--muted-foreground);
                        font-weight: 500;
                        opacity: 0.7;
                    }

                    /* ═══════════════════════════════════════════
                       BACK LINK
                    ═══════════════════════════════════════════ */
                    .auth-back-link {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.375rem;
                        font-size: 0.8rem;
                        color: var(--muted-foreground);
                        text-decoration: none;
                        transition: color 0.2s ease;
                        margin-top: 1.5rem;
                    }
                    .auth-back-link:hover { color: var(--isp-primary, #2563EB); }
                    .auth-back-link:focus-visible {
                        outline: 2px solid var(--ring); outline-offset: 2px; border-radius: 4px;
                    }

                    /* ═══════════════════════════════════════════
                       MOBILE LOGO
                    ═══════════════════════════════════════════ */
                    .auth-mobile-logo {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 2rem;
                    }
                    @media (min-width: 1024px) { .auth-mobile-logo { display: none; } }

                    /* ═══════════════════════════════════════════
                       STATUS / ERROR
                    ═══════════════════════════════════════════ */
                    .auth-status-message {
                        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                        padding: 0.625rem 1rem; border-radius: 0.5rem;
                        font-size: 0.8rem; font-weight: 500; text-align: center;
                        margin-bottom: 1.25rem;
                    }
                    .auth-status-success {
                        background: rgba(16, 185, 129, 0.08);
                        color: #059669;
                        border: 1px solid rgba(16, 185, 129, 0.15);
                    }
                    .dark .auth-status-success {
                        background: rgba(16, 185, 129, 0.1);
                        color: #34d399;
                    }

                    .auth-error-alert {
                        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                        padding: 0.625rem 1rem; border-radius: 0.5rem;
                        font-size: 0.8rem; font-weight: 500; text-align: center;
                        margin-bottom: 1.25rem;
                        background: rgba(239, 68, 68, 0.08);
                        color: #dc2626;
                        border: 1px solid rgba(239, 68, 68, 0.15);
                    }
                    .dark .auth-error-alert {
                        background: rgba(239, 68, 68, 0.1);
                        color: #f87171;
                    }

                    /* ═══════════════════════════════════════════
                       INPUT ERROR
                    ═══════════════════════════════════════════ */
                    .auth-input-error {
                        display: flex; align-items: center; gap: 0.25rem;
                        font-size: 0.75rem; font-weight: 500;
                        color: var(--destructive, #ef4444);
                        margin-top: 0.375rem;
                    }

                    /* ═══════════════════════════════════════════
                       REDUCED MOTION
                    ═══════════════════════════════════════════ */
                    @media (prefers-reduced-motion: reduce) {
                        .auth-glow-orb, .auth-line, .auth-pulse-line, .auth-node,
                        .auth-visual-content, .auth-form-wrapper, .auth-form-panel::before {
                            animation: none !important;
                        }
                        .auth-signin-btn::before { transition: none; }
                        .auth-signin-btn:hover:not(:disabled) { transform: none; }
                    }
                `}</style>

                {/* Left visual panel */}
                <div className="auth-visual-panel" aria-hidden="true">
                    <NetworkVisual />
                </div>

                {/* Right form panel */}
                <div className="auth-form-panel">
                    <div className="auth-form-wrapper">
                        {/* Mobile logo */}
                        <div className="auth-mobile-logo">
                            <Link href="/" className="flex items-center gap-2">
                                <IspLogo variant="icon" className="h-10 w-10" />
                            </Link>
                        </div>

                        <div className="auth-form-card">
                            {/* Header */}
                            {(title || description) && (
                                <div className="auth-form-header">
                                    {eyebrow && (
                                        <p style={{
                                            fontSize: '0.65rem',
                                            fontWeight: 600,
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            color: 'var(--isp-primary, #2563EB)',
                                            marginBottom: '0.5rem',
                                        }}>
                                            {eyebrow}
                                        </p>
                                    )}
                                    {title && <h1>{title}</h1>}
                                    {description && <p>{description}</p>}
                                </div>
                            )}

                            {children}
                        </div>

                        <Link href="/" className="auth-back-link">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                            </svg>
                            Back to website
                        </Link>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
