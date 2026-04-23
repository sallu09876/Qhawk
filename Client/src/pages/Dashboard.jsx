import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();

    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231",
            change: "+20.1%",
            positive: true,
            gradient: "linear-gradient(135deg, #4f7df9, #3b5fe0)",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
        },
        {
            title: "Active Leads",
            value: "2,345",
            change: "+12.5%",
            positive: true,
            gradient: "linear-gradient(135deg, #7c5cf5, #9b59b6)",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            title: "Conversion Rate",
            value: "34.7%",
            change: "+4.3%",
            positive: true,
            gradient: "linear-gradient(135deg, #c44fd8, #a033b0)",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
            ),
        },
        {
            title: "Team Performance",
            value: "94.2%",
            change: "-2.1%",
            positive: false,
            gradient: "linear-gradient(135deg, #e8436e, #c0254f)",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
            ),
        },
    ];

    const activities = [
        { name: "John Doe", action: "Closed a deal with Acme Corp", time: "2 hours ago", amount: "$12,500", initials: "JD", bg: "#4f7df9" },
        { name: "Sarah Smith", action: "Added new lead - Tech Solutions", time: "3 hours ago", amount: null, initials: "SS", bg: "#7c5cf5" },
        { name: "Mike Johnson", action: "Updated pipeline status", time: "5 hours ago", amount: null, initials: "MJ", bg: "#c44fd8" },
        { name: "Emily Brown", action: "Completed sales call", time: "6 hours ago", amount: "$8,200", initials: "EB", bg: "#e8436e" },
    ];

    const quickActions = [
        {
            title: "Add New Lead",
            gradient: "linear-gradient(135deg, #4f7df9, #3b5fe0)",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
            ),
        },
        {
            title: "View Reports",
            gradient: "linear-gradient(135deg, #7c5cf5, #9b59b6)",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
            ),
        },
        {
            title: "Manage Team",
            gradient: "linear-gradient(135deg, #c44fd8, #a033b0)",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            title: "Settings",
            gradient: "linear-gradient(135deg, #e8436e, #c0254f)",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* TOP BAR */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 py-4 sm:py-5 bg-white border-b border-[#e8eaed]">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Welcome back, {user?.username || "User"}!
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Here is what is happening with your sales team today.
                    </p>
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f5f6f8] border border-[#e8eaed]">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm text-gray-600 w-24 sm:w-40" />
                    </div>
                    <div className="relative cursor-pointer">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span className="absolute -top-1.5 -right-1.5 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold bg-[#e8436e]" style={{ fontSize: 9 }}>1</span>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-auto p-4 sm:p-8">
                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
                    {stats.map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                                <div className="p-2.5 sm:p-3 rounded-xl" style={{ background: item.gradient }}>
                                    {item.icon}
                                </div>
                                <span className={`text-xs font-semibold flex items-center gap-0.5 ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.positive ? (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                            <polyline points="17 6 23 6 23 12" />
                                        </svg>
                                    ) : (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                                            <polyline points="17 18 23 18 23 12" />
                                        </svg>
                                    )}
                                    {item.change}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">{item.title}</p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">{item.value}</h2>
                        </div>
                    ))}
                </div>

                {/* BOTTOM GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* RECENT ACTIVITY */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm mb-4 lg:mb-0">
                        <div className="mb-4 sm:mb-5">
                            <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Latest updates from your team</p>
                        </div>
                        <div className="space-y-4">
                            {activities.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 sm:gap-4 pb-4" style={i < activities.length - 1 ? { borderBottom: "1px solid #f3f4f6" } : {}}>
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: item.bg }}>
                                        {item.initials}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.action}</p>
                                        <p className="text-xs mt-0.5 text-gray-400">{item.time}</p>
                                    </div>
                                    {item.amount && (
                                        <span className="text-sm font-semibold text-green-500">{item.amount}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-fit">
                        <div className="mb-4 sm:mb-5">
                            <h3 className="text-base font-bold text-gray-900">Quick Actions</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Frequently used tools</p>
                        </div>
                        <div className="space-y-3">
                            {quickActions.map((action, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-[#f5f6f8]">
                                    <div className="p-2 rounded-xl flex-shrink-0" style={{ background: action.gradient }}>
                                        {action.icon}
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{action.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}