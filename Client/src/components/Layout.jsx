import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─── Static config (outside component) ───────────────────────────────────────
const navItems = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        label: "Catalogue",
        path: "/catalogue",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
        ),
    },
    {
        label: "Leads",
        path: "/leads",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        label: "Analytics",
        path: "/analytics",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
    },
    {
        label: "Team",
        path: "/team",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        label: "Settings",
        path: "/settings",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
    },
];

const salesSubItems = [
    { label: "Order Receiving", path: "/sales/order-receiving" },
    { label: "Order Approve", path: "/sales/order-approve" },
    { label: "Order Cancel", path: "/sales/order-cancel" },
];

// ─── NavContent — at module level (fixes react-hooks/static-components) ────────
function NavContent({ currentPath, onNavigate, salesOpen, setSalesOpen }) {
    const navigate = useNavigate();

    const handleNav = (path) => {
        navigate(path);
        onNavigate?.();
    };

    const isSalesActive = salesSubItems.some((s) => currentPath === s.path);

    return (
        <nav className="px-3 space-y-1 mt-2">
            {navItems.map((item, i) => {
                const isActive = currentPath === item.path;
                return (
                    <div
                        key={i}
                        onClick={() => handleNav(item.path)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition ${isActive
                                ? "bg-gradient-to-r from-[#4f7df9] to-[#3b5fe0]"
                                : "hover:bg-white/10"
                            }`}
                    >
                        {item.icon}
                        <span className="text-white text-sm font-medium">{item.label}</span>
                    </div>
                );
            })}

            {/* Sales accordion */}
            <div>
                <div
                    onClick={() => setSalesOpen((o) => !o)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition ${isSalesActive
                            ? "bg-gradient-to-r from-[#4f7df9] to-[#3b5fe0]"
                            : "hover:bg-white/10"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span className="text-white text-sm font-medium">Sales</span>
                    </div>
                    <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transition: "transform 0.2s", transform: salesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
                {salesOpen && (
                    <div className="ml-8 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                        {salesSubItems.map((sub, i) => {
                            const isSubActive = currentPath === sub.path;
                            return (
                                <div
                                    key={i}
                                    onClick={() => handleNav(sub.path)}
                                    className={`text-xs py-2 px-2 rounded-md cursor-pointer transition ${isSubActive ? "text-white font-semibold" : "text-white/60 hover:text-white"
                                        }`}
                                >
                                    • {sub.label}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
}

// ─── UserFooter — at module level ──────────────────────────────────────────────
function UserFooter({ user, logout }) {
    return (
        <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #4f7df9, #3b5fe0)" }}
                >
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                    <p className="text-white text-sm font-medium leading-none">{user?.username || "User"}</p>
                    <p className="text-xs mt-0.5 text-[#4f7df9]">Sales Manager</p>
                </div>
            </div>
            <button
                onClick={logout}
                className="flex items-center gap-2 text-sm text-[#8b93a7] hover:text-white transition"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
            </button>
        </div>
    );
}

// ─── LogoMark — at module level ────────────────────────────────────────────────
function LogoMark({ size = 36, iconSize = 18 }) {
    return (
        <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #4f7df9, #3b5fe0)", width: size, height: size }}
        >
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        </div>
    );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function Layout() {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [salesOpen, setSalesOpen] = useState(false);
    const location = useLocation();

    const navProps = {
        currentPath: location.pathname,
        salesOpen,
        setSalesOpen,
    };

    return (
        <div className="min-h-screen bg-[#f0f2f5] flex flex-col md:flex-row">

            {/* Desktop Sidebar */}
            <aside
                className="hidden md:flex w-56 flex-shrink-0 flex-col justify-between"
                style={{ background: "linear-gradient(180deg, #0d1117 0%, #0f1b3d 100%)" }}
            >
                <div>
                    <div className="p-5 flex items-center gap-2">
                        <LogoMark />
                        <span className="text-white text-lg font-bold">Q-Hawk</span>
                    </div>
                    <NavContent {...navProps} />
                </div>
                <UserFooter user={user} logout={logout} />
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0d1117]">
                <div className="flex items-center gap-3">
                    <button onClick={() => setMobileMenuOpen(true)} className="p-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <LogoMark size={32} iconSize={16} />
                    <span className="text-white text-base font-bold">Q-Hawk</span>
                </div>
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #4f7df9, #3b5fe0)" }}
                >
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
                    <div
                        className="absolute left-0 top-0 bottom-0 w-64 flex flex-col"
                        style={{ background: "linear-gradient(180deg, #0d1117 0%, #0f1b3d 100%)" }}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <LogoMark size={32} iconSize={16} />
                                <span className="text-white text-base font-bold">Q-Hawk</span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto py-4">
                            <NavContent
                                {...navProps}
                                onNavigate={() => setMobileMenuOpen(false)}
                            />
                        </div>
                        <UserFooter user={user} logout={logout} />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <Outlet />
            </main>

            {/* Help button */}
            <div className="fixed bottom-6 right-6 z-50">
                <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg bg-[#1e2535]">
                    <span className="text-sm font-bold text-white">?</span>
                </div>
            </div>
        </div>
    );
}
