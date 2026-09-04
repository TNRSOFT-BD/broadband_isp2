import{K as v,j as e,$ as a,r as h}from"./app-Cz6_avDR.js";import{I as f}from"./isp-logo-CnFSuRWB.js";import{B as N}from"./button-DIbxTCbE.js";import{C as y,G as w,M,S as C,j as k,b as P,c as H,k as p}from"./sheet-BxkL5GCD.js";import{a as u,c as j,T as S}from"./theme-provider-BGsVDqqj.js";import{A as _}from"./arrow-right-DttbObAT.js";import{P as b}from"./phone-DCrmXHEU.js";import{C as z}from"./clock-BacGZCfY.js";import{M as A}from"./mail-BETcvB8h.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]],$=u("Headphones",L);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],I=u("Menu",E);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]],R=u("MessageCircle",B),T=[{title:"Home",href:"/"},{title:"About Us",href:"/about"},{title:"Plans",href:"/plans"},{title:"Contact",href:"/contact"}],U={Phone:e.jsx(b,{className:"h-4 w-4"}),Mail:e.jsx(A,{className:"h-4 w-4"}),MessageCircle:e.jsx(R,{className:"h-4 w-4"}),Headphones:e.jsx($,{className:"h-4 w-4"}),MapPin:e.jsx(M,{className:"h-4 w-4"}),Globe:e.jsx(w,{className:"h-4 w-4"}),Clock:e.jsx(z,{className:"h-4 w-4"}),HelpCircle:e.jsx(y,{className:"h-4 w-4"})};function Y(){const i=v(),n=i.props.site,c=i.props.footerContactMethods??[],o=i.props.legalPages??[],x=i.props.socialMediaItems??[],d=c.filter(s=>s.label&&s.value);return e.jsxs("footer",{className:"relative overflow-hidden bg-[#0b1120]",children:[e.jsx("div",{className:"absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--isp-primary)]/50 to-transparent"}),e.jsx("div",{className:"pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-[var(--isp-primary)]/5 blur-[120px]"}),e.jsx("div",{className:"pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[var(--isp-accent)]/5 blur-[120px]"}),e.jsxs("div",{className:"relative mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 lg:px-8",children:[e.jsxs("div",{className:"flex flex-col gap-8 md:flex-row md:items-start md:gap-12 text-center md:text-left",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx(a,{href:"/",className:"inline-block",children:e.jsx(f,{})}),e.jsx("p",{className:"mx-auto mt-5 max-w-xs text-sm leading-relaxed text-slate-400 md:mx-0",children:"Empowering your digital world with ultra-fast, reliable internet connectivity. Experience the future of broadband today."}),x.length>0&&e.jsx("div",{className:"mt-6 flex items-center justify-center gap-4 md:justify-start",children:x.map(s=>e.jsx("a",{href:s.link,"aria-label":s.name,target:"_blank",rel:"noopener noreferrer",className:"flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--isp-primary)] hover:text-white",children:e.jsx("img",{src:s.image,alt:s.name,className:"h-full w-full object-contain",loading:"lazy"})},s.id))})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-8 sm:grid-cols-2 md:w-1/2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-bold uppercase tracking-wider text-white",children:"Quick Links"}),e.jsx("div",{className:"mx-auto mt-1 mb-3 h-0.5 w-8 rounded-full bg-[var(--isp-primary)] md:mx-0"}),e.jsx("ul",{className:"space-y-3",children:T.map(s=>e.jsx("li",{children:e.jsxs(a,{href:s.href,className:"group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-white",children:[e.jsx(_,{className:"h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"}),e.jsx("span",{className:"transition-transform duration-200 group-hover:translate-x-1",children:s.title})]})},s.title))})]}),d.length>0&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-bold uppercase tracking-wider text-white",children:"Contact Us"}),e.jsx("div",{className:"mx-auto mt-1 mb-3 h-0.5 w-8 rounded-full bg-[var(--isp-primary)] md:mx-0"}),e.jsx("ul",{className:"space-y-3",children:d.map(s=>e.jsxs("li",{className:"flex items-start justify-center gap-2.5 md:justify-start",children:[e.jsx("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]",children:U[s.icon]??e.jsx(b,{className:"h-4 w-4"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-medium text-slate-500",children:s.label}),(()=>{const l=s.href&&s.href!=="#"?s.href:s.icon==="Phone"?`tel:${s.value}`:s.icon==="Mail"?`mailto:${s.value}`:null;return l?e.jsx("a",{href:l,className:"text-sm text-slate-300 transition-colors hover:text-white",children:s.value}):e.jsx("p",{className:"text-sm text-slate-300",children:s.value})})(),s.description&&e.jsx("p",{className:"text-xs text-slate-500",children:s.description})]})]},s.id))})]})]})]}),e.jsx("div",{className:"mt-10 border-t border-white/10 pt-5",children:e.jsxs("div",{className:"flex flex-col items-center justify-between gap-4 sm:flex-row",children:[e.jsxs("p",{className:"text-xs text-slate-500",children:["© ",new Date().getFullYear()," ",(n==null?void 0:n.site_name)??"VibraNet",". All rights reserved."]}),e.jsx("div",{className:"flex items-center gap-6",children:o.map(s=>e.jsx(a,{href:`/legal/${s.slug}`,className:"text-xs text-slate-500 transition-colors hover:text-slate-300",children:s.title},s.slug))})]})})]})]})}const g=[{title:"Home",href:"/"},{title:"About",href:"/about"},{title:"Plans",href:"/plans"},{title:"Contact",href:"/contact"}];function q({children:i}){const n=v(),c=n.url,o=n.props.thirdPartyLinks,x=(o==null?void 0:o.selfcare)||"#",[d,s]=h.useState(!1),l=h.useRef(0),m=h.useRef(!1);return h.useEffect(()=>{const t=()=>{m.current||(window.requestAnimationFrame(()=>{const r=window.scrollY;if(r<=10){s(!1),l.current=r,m.current=!1;return}r<l.current?s(!1):r>l.current+5&&s(!0),l.current=r,m.current=!1}),m.current=!0)};return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]),e.jsxs("div",{className:"flex min-h-screen flex-col overflow-x-clip",children:[e.jsx("div",{className:"h-16","aria-hidden":"true"}),e.jsx("header",{className:`fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-transform duration-300 ease-in-out ${d?"-translate-y-full":"translate-y-0"}`,children:e.jsxs("div",{className:"mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",children:[e.jsx(a,{href:"/",className:"flex items-center",children:e.jsx(f,{})}),e.jsx("nav",{className:"hidden items-center gap-1 lg:flex",children:g.map(t=>{const r=t.href==="/"?c==="/":c.startsWith(t.href);return e.jsx(a,{href:t.href,className:j("relative rounded-md px-4 py-2 text-base font-medium transition-colors",r?"text-[var(--isp-primary)]":"text-gray-600 hover:text-[var(--isp-primary)]"),children:t.title},t.href)})}),"                    ",e.jsxs("div",{className:"hidden items-center gap-4 lg:flex",children:[e.jsx("style",{children:`
                            .futuristic-btn {
                                position: relative;
                                background: var(--isp-primary);
                                padding: 0.625rem 2rem;
                                font-size: 0.875rem;
                                font-weight: 600;
                                color: white;
                                text-decoration: none;
                                display: inline-flex;
                                align-items: center;
                                gap: 0.5rem;
                                overflow: hidden;
                                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                                clip-path: polygon(
                                    12px 0%,
                                    100% 0%,
                                    calc(100% - 12px) 100%,
                                    0% 100%
                                );
                            }
                            .futuristic-btn::before {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: -100%;
                                width: 100%;
                                height: 100%;
                                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
                                transition: left 0.5s ease;
                            }
                            .futuristic-btn:hover::before {
                                left: 100%;
                            }
                            .futuristic-btn:hover {
                                background: var(--isp-primary-dark);
                                transform: scale(1.03);
                            }
                            .futuristic-btn:active {
                                transform: scale(0.97);
                            }
                            .futuristic-btn-mobile {
                                clip-path: polygon(
                                    10px 0%,
                                    calc(100% - 10px) 0%,
                                    100% 10px,
                                    100% calc(100% - 10px),
                                    calc(100% - 10px) 100%,
                                    10px 100%,
                                    0% calc(100% - 10px),
                                    0% 10px
                                );
                            }
                        `}),e.jsx(a,{href:"/paybill",className:"futuristic-btn",children:e.jsx("span",{className:"relative z-10",children:"PayBill"})}),e.jsx("a",{href:x,target:"_blank",rel:"noopener noreferrer",className:"futuristic-btn",children:e.jsx("span",{className:"relative z-10",children:"Selfcare"})})]}),e.jsx("div",{className:"lg:hidden",children:e.jsxs(C,{children:[e.jsx(k,{asChild:!0,children:e.jsxs(N,{variant:"ghost",size:"icon",className:"text-gray-700 hover:bg-gray-100",children:[e.jsx(I,{className:"h-6 w-6"}),e.jsx("span",{className:"sr-only",children:"Open menu"})]})}),e.jsxs(P,{side:"right",className:"w-[300px] bg-white p-0",children:[e.jsx(H,{className:"sr-only",children:"Navigation Menu"}),e.jsxs("div",{className:"flex h-full flex-col",children:[e.jsx("div",{className:"flex h-16 items-center border-b border-gray-200 px-6",children:e.jsx(a,{href:"/",className:"flex items-center",children:e.jsx(f,{})})}),e.jsx("nav",{className:"flex-1 overflow-y-auto px-6 py-4",children:e.jsx("div",{className:"flex flex-col gap-1",children:g.map(t=>{const r=t.href==="/"?c==="/":c.startsWith(t.href);return e.jsx(p,{asChild:!0,children:e.jsx(a,{href:t.href,className:j("rounded-md px-4 py-3 text-base font-medium transition-colors",r?"bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]":"text-gray-600 hover:bg-gray-100 hover:text-[var(--isp-primary)]"),children:t.title})},t.href)})})}),e.jsx("div",{className:"border-t border-gray-200 bg-white p-6",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(p,{asChild:!0,children:e.jsx(a,{href:"/paybill",className:"futuristic-btn futuristic-btn-mobile w-full justify-center",children:"PayBill"})}),e.jsx(p,{asChild:!0,children:e.jsx("a",{href:x,target:"_blank",rel:"noopener noreferrer",className:"futuristic-btn futuristic-btn-mobile w-full justify-center",children:"Selfcare"})})]})})]})]})]})})]})}),e.jsx("main",{className:"flex-1",children:i}),e.jsx(Y,{})]})}function J({children:i}){return e.jsx(S,{children:e.jsx(q,{children:i})})}export{$ as H,R as M,J as P};
