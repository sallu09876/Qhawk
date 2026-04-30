import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const FolderIcon = ({ size = 18, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);
const BoxIcon = ({ size = 16, color = "#9ca3af" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);
const ChevronRight = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);
const ChevronDown = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const CartIcon = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);
const PlusIcon = ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const catalogueData = [
    {
        id: 1, name: "Electronics", description: "Electronic devices and accessories", totalItems: 245,
        subcategories: [
            {
                id: 11, name: "Computers", totalItems: 89,
                subcategories: [
                    {
                        id: 111, name: "Laptops", totalItems: 45,
                        subcategories: [
                            { id: 1111, name: "Gaming Laptops", totalItems: 15, subcategories: [] },
                            { id: 1112, name: "Business Laptops", totalItems: 20, subcategories: [] },
                            { id: 1113, name: "Ultrabooks", totalItems: 10, subcategories: [] },
                        ],
                    },
                    {
                        id: 112, name: "Desktops", totalItems: 30,
                        subcategories: [
                            { id: 1121, name: "Gaming PCs", totalItems: 12, subcategories: [] },
                            { id: 1122, name: "Workstations", totalItems: 18, subcategories: [] },
                        ],
                    },
                    { id: 113, name: "Monitors", totalItems: 14, subcategories: [] },
                ],
            },
            {
                id: 12, name: "Mobile Devices", totalItems: 156,
                subcategories: [
                    {
                        id: 121, name: "Smartphones", totalItems: 120,
                        subcategories: [
                            { id: 1211, name: "Android", totalItems: 80, subcategories: [] },
                            { id: 1212, name: "iOS", totalItems: 40, subcategories: [] },
                        ],
                    },
                    { id: 122, name: "Tablets", totalItems: 36, subcategories: [] },
                ],
            },
        ],
    },
    {
        id: 2, name: "Clothing", description: "Fashion and apparel", totalItems: 432,
        subcategories: [
            {
                id: 21, name: "Men's Clothing", totalItems: 210,
                subcategories: [
                    {
                        id: 211, name: "Shirts", totalItems: 85,
                        subcategories: [
                            { id: 2111, name: "Casual Shirts", totalItems: 45, subcategories: [] },
                            { id: 2112, name: "Formal Shirts", totalItems: 40, subcategories: [] },
                        ],
                    },
                    { id: 212, name: "Pants", totalItems: 65, subcategories: [] },
                    { id: 213, name: "Jackets", totalItems: 60, subcategories: [] },
                ],
            },
            {
                id: 22, name: "Women's Clothing", totalItems: 222,
                subcategories: [
                    { id: 221, name: "Dresses", totalItems: 90, subcategories: [] },
                    { id: 222, name: "Tops", totalItems: 80, subcategories: [] },
                    { id: 223, name: "Bottoms", totalItems: 52, subcategories: [] },
                ],
            },
        ],
    },
    {
        id: 3, name: "Home & Garden", description: "Home improvement and garden supplies", totalItems: 318,
        subcategories: [
            {
                id: 31, name: "Furniture", totalItems: 145,
                subcategories: [
                    { id: 311, name: "Living Room", totalItems: 60, subcategories: [] },
                    { id: 312, name: "Bedroom", totalItems: 55, subcategories: [] },
                    { id: 313, name: "Office", totalItems: 30, subcategories: [] },
                ],
            },
            {
                id: 32, name: "Garden Tools", totalItems: 173,
                subcategories: [
                    { id: 321, name: "Power Tools", totalItems: 80, subcategories: [] },
                    { id: 322, name: "Hand Tools", totalItems: 93, subcategories: [] },
                ],
            },
        ],
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const depthGradients = [
    "linear-gradient(135deg, #4f7df9, #3b5fe0)",
    "linear-gradient(135deg, #a855f7, #7c3aed)",
    "linear-gradient(135deg, #ec4899, #be185d)",
    "linear-gradient(135deg, #f97316, #ea580c)",
];
const getGradient = (depth) => depthGradients[Math.min(depth, depthGradients.length - 1)];

function getAllIds(nodes) {
    let ids = [];
    for (const n of nodes) {
        ids.push(n.id);
        if (n.subcategories?.length) ids = ids.concat(getAllIds(n.subcategories));
    }
    return ids;
}

function filterTree(nodes, query) {
    if (!query.trim()) return nodes;
    const q = query.toLowerCase();
    return nodes.reduce((acc, node) => {
        const filteredChildren = filterTree(node.subcategories || [], query);
        if (node.name.toLowerCase().includes(q) || filteredChildren.length > 0) {
            acc.push({ ...node, subcategories: filteredChildren });
        }
        return acc;
    }, []);
}

function highlightText(text, query) {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
        <>
            {text.slice(0, idx)}
            <mark className="bg-yellow-200 text-yellow-900 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
            {text.slice(idx + query.length)}
        </>
    );
}

// ─── Tree Row ─────────────────────────────────────────────────────────────────
function CategoryRow({ node, depth = 0, expandedIds, toggleExpand, selectedId, onSelect, searchQuery }) {
    const hasChildren = node.subcategories && node.subcategories.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedId === node.id;
    const indentPx = depth * 20; // Reduced from 28 for better mobile fit

    return (
        <div>
            <div
                className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all duration-150 group ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}`}
                style={{ borderLeft: isSelected ? "3px solid #4f7df9" : "3px solid transparent" }}
                onClick={() => {
                    onSelect(node);
                    if (hasChildren) toggleExpand(node.id);
                }}
            >
                <div className="flex items-center gap-2.5 min-w-0" style={{ paddingLeft: indentPx }}>
                    {/* Chevron */}
                    <span className="w-4 flex-shrink-0 flex items-center justify-center">
                        {hasChildren ? (
                            isExpanded ? <ChevronDown /> : <ChevronRight />
                        ) : null}
                    </span>

                    {/* Folder chip */}
                    <div
                        className="flex-shrink-0 flex items-center justify-center rounded-xl"
                        style={{ width: 34, height: 34, background: getGradient(depth) }}
                    >
                        <FolderIcon size={16} />
                    </div>

                    {/* Name + description */}
                    <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${isSelected ? "text-[#4f7df9]" : "text-gray-800"}`}>
                            {highlightText(node.name, searchQuery)}
                        </p>
                        {node.description && depth === 0 && (
                            <p className="text-xs text-gray-400 truncate mt-0.5">{node.description}</p>
                        )}
                    </div>
                </div>

                {/* Item count pill */}
                <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-2.5 py-1 flex-shrink-0 ml-3">
                    <BoxIcon size={13} color="#9ca3af" />
                    <span className="text-xs font-medium text-gray-500">{node.totalItems}</span>
                </div>
            </div>

            {/* Children */}
            {hasChildren && isExpanded && (
                <div className="relative">
                    {depth < 2 && (
                        <div
                            className="absolute top-0 bottom-0 border-l-2 border-purple-100"
                            style={{ left: indentPx + 36 }}
                        />
                    )}
                    {node.subcategories.map((child) => (
                        <CategoryRow
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            expandedIds={expandedIds}
                            toggleExpand={toggleExpand}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            searchQuery={searchQuery}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ category }) {
    if (!category) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-64 text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <FolderIcon size={28} color="#d1d5db" />
                </div>
                <p className="font-semibold text-gray-700 text-base">No Category Selected</p>
                <p className="text-sm text-gray-400 mt-1">Select a category to view details</p>
            </div>
        );
    }

    const subCount = category.subcategories?.length ?? 0;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-start gap-3">
                <div
                    className="flex-shrink-0 flex items-center justify-center rounded-2xl"
                    style={{ width: 52, height: 52, background: getGradient(0) }}
                >
                    <FolderIcon size={24} />
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{category.name}</h3>
                    {category.description && (
                        <p className="text-xs text-gray-400 mt-0.5 leading-snug">{category.description}</p>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-medium">Total Items</span>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}>
                            <BoxIcon size={14} color="#3b82f6" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{category.totalItems}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-medium">Subcategories</span>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #faf5ff, #ede9fe)" }}>
                            <FolderIcon size={14} color="#7c3aed" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{subCount}</p>
                </div>
            </div>

            {/* Buttons */}
            <Link
                to="/products"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4f7df9, #3b5fe0)" }}
            >
                <CartIcon size={15} />
                View Products
            </Link>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-gray-700 text-sm font-semibold border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <PlusIcon size={15} color="#374151" />
                Add Subcategory
            </button>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Catalogue() {
    const [expandedIds, setExpandedIds] = useState(new Set());
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleExpand = (id) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    // When searching, auto-expand everything so results are visible
    const activeExpandedIds = useMemo(() => {
        if (!searchQuery.trim()) return expandedIds;
        return new Set(getAllIds(catalogueData));
    }, [searchQuery, expandedIds]);

    const filteredData = useMemo(() => filterTree(catalogueData, searchQuery), [searchQuery]);

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#f0f2f5]">
            {/* Page header */}
            <div className="px-4 md:px-6 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Product Catalogue</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Browse our complete product hierarchy</p>
                </div>
                <div className="flex items-center gap-2.5">
                    <Link
                        to="/products"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-opacity hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}
                    >
                        <CartIcon size={15} />
                        <span className="hidden xs:inline">View All Products</span>
                        <span className="inline xs:hidden">View All Products</span>
                    </Link>
                    <button
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-opacity hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #4f7df9, #3b5fe0)" }}
                    >
                        <PlusIcon size={15} />
                        <span className="hidden xs:inline">Add Category</span>
                        <span className="inline xs:hidden">Add Category</span>
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 md:px-6 pb-4">
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search categories..."
                        className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4f7df9] focus:ring-2 focus:ring-[#4f7df9]/10 transition-all shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto lg:overflow-hidden px-4 md:px-6 pb-6 flex flex-col lg:flex-row gap-4">
                {/* Tree panel */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 min-w-0">
                    {filteredData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-center p-8">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
                                <SearchIcon />
                            </div>
                            <p className="font-semibold text-gray-600 text-sm">No categories found</p>
                            <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50 py-1">
                            {filteredData.map((node) => (
                                <CategoryRow
                                    key={node.id}
                                    node={node}
                                    depth={0}
                                    expandedIds={activeExpandedIds}
                                    toggleExpand={toggleExpand}
                                    selectedId={selectedCategory?.id}
                                    onSelect={setSelectedCategory}
                                    searchQuery={searchQuery}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Detail panel */}
                <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-3">
                    <DetailPanel category={selectedCategory} />
                </div>
            </div>
        </div>
    );
}
