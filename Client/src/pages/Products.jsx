import { useState, useMemo, useEffect, useRef } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = ({ size = 18, color = "#9ca3af" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const FilterIcon = ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const ChevronDown = ({ size = 16, color = "#64748b" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const CheckIcon = ({ size = 14, color = "#4f7df9" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const CartIcon = ({ size = 18, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const FilterToggleIcon = ({ size = 18, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const initialProducts = [
    { id: 1, name: "Gaming Laptop Pro", brand: "TechBrand", sku: "LAP-001", stock: 45, color: "Black", size: "15.6\"", price: 1299, category: "Laptops" },
    { id: 2, name: "Business Ultrabook", brand: "WorkPro", sku: "LAP-002", stock: 32, color: "Silver", size: "13.3\"", price: 899, category: "Laptops" },
    { id: 3, name: "Gaming Desktop Elite", brand: "PowerPC", sku: "DES-001", stock: 15, color: "RGB", size: "Tower", price: 1899, category: "Desktops" },
    { id: 4, name: "Smartphone X1", brand: "MobileTech", sku: "PHO-001", stock: 120, color: "Blue", size: "6.5\"", price: 799, category: "Smartphones" },
    { id: 5, name: "Smartphone Y2", brand: "PhonePlus", sku: "PHO-002", stock: 95, color: "Black", size: "6.1\"", price: 699, category: "Smartphones" },
    { id: 6, name: "4K Monitor Pro", brand: "ViewTech", sku: "MON-001", stock: 28, color: "Black", size: "27\"", price: 549, category: "Monitors" },
    { id: 7, name: "Wireless Mouse Pro", brand: "PeripheralCo", sku: "ACC-001", stock: 200, color: "Black", size: "Standard", price: 49, category: "Accessories" },
    { id: 8, name: "Mechanical Keyboard", brand: "KeyMaster", sku: "ACC-002", stock: 150, color: "RGB", size: "Full Size", price: 129, category: "Accessories" },
];

const filterOptions = {
    category: ["All Categories", "Laptops", "Desktops", "Smartphones", "Monitors", "Accessories"],
    brand: ["All Brands", "TechBrand", "WorkPro", "PowerPC", "MobileTech", "PhonePlus", "ViewTech", "PeripheralCo", "KeyMaster"],
    priceRange: ["All Prices", "Under $500", "$500–$1000", "Over $1000"],
    stockStatus: ["All Stock", "In Stock", "Low Stock (<50)", "Out of Stock"],
    color: ["All Colors", "Black", "Silver", "RGB", "Blue"],
};

// ─── Custom Dropdown Component ───────────────────────────────────────────────
const CustomDropdown = ({ label, options, selected, onSelect, isOpen, onToggle, dropdownRef }) => {
    return (
        <div className="relative flex-1 min-w-[160px]" ref={dropdownRef}>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{label}</p>
            <button
                onClick={onToggle}
                className={`w-full flex items-center justify-between px-4 py-2.5 bg-gray-100/80 border border-transparent rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-200/50 ${isOpen ? "ring-2 ring-[#4f7df9]/20 border-[#4f7df9] bg-white shadow-sm" : "text-gray-700"}`}
            >
                <span className="truncate">{selected}</span>
                <div className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={14} />
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1.5 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                onSelect(option);
                                onToggle();
                            }}
                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#4f7df9] transition-colors"
                        >
                            <span className={selected === option ? "font-semibold text-[#4f7df9]" : ""}>{option}</span>
                            {selected === option && <CheckIcon />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Product Card Component ──────────────────────────────────────────────────
const ProductCard = ({ product }) => {
    const isLowStock = product.stock < 50;
    
    const getStockColor = (stock) => {
        if (stock > 100) return "text-[#16a34a]";
        if (stock >= 20) return "text-[#ea580c]";
        return "text-[#dc2626]";
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            {/* Top Section: Gradient Placeholder */}
            <div className="relative aspect-square bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-white/40 transform transition-transform duration-500 group-hover:scale-110">
                    <CartIcon size={64} />
                </div>
                {isLowStock && (
                    <div className="absolute top-3 right-3 bg-[#f97316] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
                        Low Stock
                    </div>
                )}
            </div>

            {/* Bottom Section: Info */}
            <div className="p-5">
                <div className="inline-block px-2.5 py-0.5 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-tight mb-2.5 bg-gray-50/50">
                    {product.category}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#4f7df9] transition-colors cursor-pointer leading-tight mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{product.brand}</p>

                <div className="grid grid-cols-2 gap-y-2 mb-4">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-gray-400 font-medium">SKU:</span>
                        <span className="text-[11px] text-gray-700 font-bold">{product.sku}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-gray-400 font-medium">Stock:</span>
                        <span className={`text-[11px] font-bold ${getStockColor(product.stock)}`}>{product.stock}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-gray-400 font-medium">Color:</span>
                        <span className="text-[11px] text-gray-700 font-bold">{product.color}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-gray-400 font-medium">Size:</span>
                        <span className="text-[11px] text-gray-700 font-bold">{product.size}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-2xl font-black text-gray-900 tracking-tight">${product.price}</span>
                    <button 
                        onClick={() => alert(`Added ${product.name} to cart!`)}
                        className="flex items-center justify-center gap-2 bg-[#4f7df9] hover:bg-[#3b5fe0] text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-blue-200"
                    >
                        <CartIcon size={18} />
                        <span className="hidden sm:inline font-bold text-sm">Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function Products() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        category: "All Categories",
        brand: "All Brands",
        priceRange: "All Prices",
        stockStatus: "All Stock",
        color: "All Colors",
    });
    const [openDropdown, setOpenDropdown] = useState(null);
    
    // Refs for clicking outside
    const dropdownRefs = {
        category: useRef(null),
        brand: useRef(null),
        priceRange: useRef(null),
        stockStatus: useRef(null),
        color: useRef(null),
    };

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown && dropdownRefs[openDropdown].current && !dropdownRefs[openDropdown].current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdown]);

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            // Search filter
            const matchesSearch = searchQuery === "" || 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                product.sku.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return false;

            // Category filter
            if (filters.category !== "All Categories" && product.category !== filters.category) return false;

            // Brand filter
            if (filters.brand !== "All Brands" && product.brand !== filters.brand) return false;

            // Color filter
            if (filters.color !== "All Colors" && product.color !== filters.color) return false;

            // Price Range filter
            if (filters.priceRange !== "All Prices") {
                if (filters.priceRange === "Under $500" && product.price >= 500) return false;
                if (filters.priceRange === "$500–$1000" && (product.price < 500 || product.price > 1000)) return false;
                if (filters.priceRange === "Over $1000" && product.price <= 1000) return false;
            }

            // Stock Status filter
            if (filters.stockStatus !== "All Stock") {
                if (filters.stockStatus === "In Stock" && product.stock <= 0) return false;
                if (filters.stockStatus === "Low Stock (<50)" && (product.stock >= 50 || product.stock <= 0)) return false;
                if (filters.stockStatus === "Out of Stock" && product.stock > 0) return false;
            }

            return true;
        });
    }, [searchQuery, filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-[#f0f2f5] overflow-x-hidden">
            {/* Header */}
            <header className="px-4 md:px-8 pt-8 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Products</h1>
                        <p className="text-sm font-semibold text-gray-400 mt-0.5">
                            <span className="text-[#4f7df9]">{filteredProducts.length}</span> products found
                        </p>
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl border-2 font-bold text-sm transition-all duration-200 ${showFilters ? "bg-[#0f172a] border-[#0f172a] text-white" : "bg-white border-gray-200 text-gray-600 hover:border-[#4f7df9] hover:text-[#4f7df9]"}`}
                    >
                        <FilterToggleIcon size={16} />
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#4f7df9]">
                        <SearchIcon size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products by name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-transparent rounded-2xl pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f7df9]/10 focus:border-[#4f7df9] transition-all text-base font-medium"
                    />
                </div>
            </header>

            {/* Collapsible Filters Panel */}
            {showFilters && (
                <div className="px-4 md:px-8 mb-8 animate-in slide-in-from-top-4 duration-300">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <FilterIcon size={18} color="#4f7df9" />
                            </div>
                            <h2 className="text-base font-bold text-gray-800 uppercase tracking-wide">Filters</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            <CustomDropdown
                                label="Category"
                                options={filterOptions.category}
                                selected={filters.category}
                                onSelect={(v) => handleFilterChange("category", v)}
                                isOpen={openDropdown === "category"}
                                onToggle={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
                                dropdownRef={dropdownRefs.category}
                            />
                            <CustomDropdown
                                label="Brand"
                                options={filterOptions.brand}
                                selected={filters.brand}
                                onSelect={(v) => handleFilterChange("brand", v)}
                                isOpen={openDropdown === "brand"}
                                onToggle={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
                                dropdownRef={dropdownRefs.brand}
                            />
                            <CustomDropdown
                                label="Price Range"
                                options={filterOptions.priceRange}
                                selected={filters.priceRange}
                                onSelect={(v) => handleFilterChange("priceRange", v)}
                                isOpen={openDropdown === "priceRange"}
                                onToggle={() => setOpenDropdown(openDropdown === "priceRange" ? null : "priceRange")}
                                dropdownRef={dropdownRefs.priceRange}
                            />
                            <CustomDropdown
                                label="Stock Status"
                                options={filterOptions.stockStatus}
                                selected={filters.stockStatus}
                                onSelect={(v) => handleFilterChange("stockStatus", v)}
                                isOpen={openDropdown === "stockStatus"}
                                onToggle={() => setOpenDropdown(openDropdown === "stockStatus" ? null : "stockStatus")}
                                dropdownRef={dropdownRefs.stockStatus}
                            />
                            <CustomDropdown
                                label="Color"
                                options={filterOptions.color}
                                selected={filters.color}
                                onSelect={(v) => handleFilterChange("color", v)}
                                isOpen={openDropdown === "color"}
                                onToggle={() => setOpenDropdown(openDropdown === "color" ? null : "color")}
                                dropdownRef={dropdownRefs.color}
                            />
                        </div>
                        {Object.values(filters).some(v => !v.startsWith("All")) && (
                            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end">
                                <button
                                    onClick={() => setFilters({
                                        category: "All Categories",
                                        brand: "All Brands",
                                        priceRange: "All Prices",
                                        stockStatus: "All Stock",
                                        color: "All Colors",
                                    })}
                                    className="text-xs font-bold text-gray-400 hover:text-[#dc2626] transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <main className="px-4 md:px-8 pb-12">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-16 flex flex-col items-center justify-center text-center border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                            <SearchIcon size={32} color="#cbd5e1" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-400 max-w-xs">
                            We couldn't find any products matching your current search or filters. Try adjusting them!
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setFilters({
                                    category: "All Categories",
                                    brand: "All Brands",
                                    priceRange: "All Prices",
                                    stockStatus: "All Stock",
                                    color: "All Colors",
                                });
                            }}
                            className="mt-8 px-6 py-3 bg-[#0f172a] text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                        >
                            Reset everything
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
