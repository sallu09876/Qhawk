import { useState, useMemo } from "react";

// ─── Shared Controls Card Sub-component ──────────────────────────────────────
const ControlsCard = ({ 
  showEntries, setShowEntries, 
  fromDate, setFromDate, 
  toDate, setToDate, 
  searchQuery, setSearchQuery,
  onShow 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-4 border border-gray-100 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-end gap-6">
        
        {/* Entries Count */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Show</span>
          <input 
            type="number" 
            value={showEntries}
            onChange={(e) => setShowEntries(e.target.value)}
            className="border border-gray-200 rounded-lg w-16 px-2 py-1.5 text-center text-sm font-bold focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none"
          />
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">entries</span>
        </div>

        {/* Date Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-grow">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">From Date</label>
            <div className="relative">
              <input 
                type="date" 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">To Date</label>
            <div className="relative">
              <input 
                type="date" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Show Button */}
        <div className="w-full lg:w-auto">
          <button 
            onClick={onShow}
            className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-white font-bold px-10 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
          >
            Show
          </button>
        </div>

        {/* Global Search */}
        <div className="w-full lg:w-64">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Search:</label>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const ViewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const RestoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);
const SearchTableIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

// ─── Sample Data ─────────────────────────────────────────────────────────────
const initialData = [
  { id: 1, date: "25-04-2026", ordNo: "362435", salesOfficer: "John", dealerName: "ABC Distributors", brand: "PODZ", art: "E29", color: "CN", size: "5X10", qty: 2, unitName: "PODZ", cancelReason: "Out of stock", cancelledBy: "Admin" },
  { id: 2, date: "24-04-2026", ordNo: "362430", salesOfficer: "Sarah", dealerName: "XYZ Trading", brand: "TUFF", art: "T6Z52", color: "MH", size: "7X10", qty: 1, unitName: "TUFF", cancelReason: "Customer request", cancelledBy: "Sales Officer" },
  { id: 3, date: "23-04-2026", ordNo: "362420", salesOfficer: "Mike", dealerName: "Tech Solutions Inc", brand: "ODYSSIA", art: "R7901", color: "TN", size: "8X10", qty: 3, unitName: "SOLTEK", cancelReason: "Wrong specification", cancelledBy: "Manager" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OrderCancel() {
  const [data, setData] = useState(initialData);
  const [showEntries, setShowEntries] = useState(50);
  const [fromDate, setFromDate] = useState("2026-04-23");
  const [toDate, setToDate] = useState("2026-04-27");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Per-column filter visibility and values
  const [activeColumnFilters, setActiveColumnFilters] = useState({});
  const [columnFilters, setColumnFilters] = useState({
    ordNo: "", salesOfficer: "", dealerName: "", brand: "", art: "", color: "", unitName: ""
  });

  const toggleColumnFilter = (col) => {
    setActiveColumnFilters(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const filteredData = useMemo(() => {
    return data.filter(row => {
      // Global search
      const matchesGlobal = searchQuery === "" || 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      // Column searches
      const matchesColumn = 
        String(row.ordNo).toLowerCase().includes(columnFilters.ordNo.toLowerCase()) &&
        row.salesOfficer.toLowerCase().includes(columnFilters.salesOfficer.toLowerCase()) &&
        row.dealerName.toLowerCase().includes(columnFilters.dealerName.toLowerCase()) &&
        row.brand.toLowerCase().includes(columnFilters.brand.toLowerCase()) &&
        row.art.toLowerCase().includes(columnFilters.art.toLowerCase()) &&
        row.color.toLowerCase().includes(columnFilters.color.toLowerCase()) &&
        row.unitName.toLowerCase().includes(columnFilters.unitName.toLowerCase());

      return matchesGlobal && matchesColumn;
    }).slice(0, parseInt(showEntries) || 50);
  }, [data, searchQuery, columnFilters, showEntries]);

  const handleAction = (type, row) => {
    if (type === 'view') {
      console.log("Viewing cancelled row:", row);
      alert(`Cancelled Order Details:\nNo: ${row.ordNo}\nReason: ${row.cancelReason}`);
    } else if (type === 'restore') {
      if (confirm("Restore this order to receiving?")) {
        console.log("Restoring row:", row);
        setData(prev => prev.filter(item => item.id !== row.id));
      }
    } else if (type === 'delete') {
      if (confirm("Permanently delete this cancelled record?")) {
        setData(prev => prev.filter(item => item.id !== row.id));
      }
    }
  };

  const getReasonStyle = (reason) => {
    if (reason === "Wrong specification") return "text-[#ef4444]";
    return "text-[#f97316]"; // Out of stock or Customer request
  };

  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Order Cancelled View</h1>
        <span className="bg-[#ef4444] text-white rounded-full px-3 py-1 text-sm font-semibold shadow-sm shadow-red-200">
          Cancelled
        </span>
      </div>

      <ControlsCard 
        showEntries={showEntries} setShowEntries={setShowEntries}
        fromDate={fromDate} setFromDate={setFromDate}
        toDate={toDate} setToDate={setToDate}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        onShow={() => console.log("Filtering cancelled by date...")}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                {[
                  { label: "Order Date", key: "date" },
                  { label: "Ord No", key: "ordNo" },
                  { label: "Sales Officer", key: "salesOfficer" },
                  { label: "Dealer Name", key: "dealerName" },
                  { label: "Brand", key: "brand" },
                  { label: "Art", key: "art" },
                  { label: "Color", key: "color" },
                  { label: "Size", key: "size" },
                  { label: "Qty", key: "qty" },
                  { label: "Unit Name", key: "unitName" },
                  { label: "Cancel Reason", key: "cancelReason" },
                  { label: "Cancelled By", key: "cancelledBy" },
                  { label: "Action", key: "action" },
                ].map((col, i) => (
                  <th key={i} className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <div className="flex flex-col gap-2">
                      <span>{col.label}</span>
                      {['ordNo', 'salesOfficer', 'dealerName', 'brand', 'art', 'color', 'unitName'].includes(col.key) && (
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => toggleColumnFilter(col.key)}
                            className="p-1.5 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100 transition-colors"
                          >
                            <SearchTableIcon />
                          </button>
                          {activeColumnFilters[col.key] && (
                            <input 
                              type="text"
                              value={columnFilters[col.key]}
                              onChange={(e) => setColumnFilters(prev => ({ ...prev, [col.key]: e.target.value }))}
                              className="w-20 px-2 py-1 text-[10px] border border-blue-200 rounded outline-none focus:border-blue-400"
                              placeholder="Search..."
                              autoFocus
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((row) => (
                <tr 
                  key={row.id} 
                  className="transition-colors hover:bg-blue-50/50 group"
                >
                  <td className="px-4 py-4 text-xs font-semibold text-gray-600 whitespace-nowrap">{row.date}</td>
                  <td className="px-4 py-4 text-xs font-bold text-gray-900">{row.ordNo}</td>
                  <td className="px-4 py-4 text-xs font-medium text-gray-600">{row.salesOfficer}</td>
                  <td className="px-4 py-4 text-xs font-medium text-gray-600">{row.dealerName}</td>
                  <td className="px-4 py-4 text-xs font-bold text-gray-700">{row.brand}</td>
                  <td className="px-4 py-4 text-xs font-medium text-gray-600">{row.art}</td>
                  <td className="px-4 py-4 text-xs font-medium text-gray-600">{row.color}</td>
                  <td className="px-4 py-4 text-xs font-medium text-gray-600">{row.size}</td>
                  <td className="px-4 py-4 text-xs font-bold text-gray-900">{row.qty}</td>
                  <td className="px-4 py-4 text-xs font-bold text-gray-600">{row.unitName}</td>
                  <td className={`px-4 py-4 text-xs font-bold ${getReasonStyle(row.cancelReason)}`}>
                    {row.cancelReason}
                  </td>
                  <td className="px-4 py-4 text-xs font-medium text-gray-600">{row.cancelledBy}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleAction('view', row)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <ViewIcon />
                      </button>
                      <button onClick={() => handleAction('restore', row)} className="p-1.5 text-[#06b6d4] hover:bg-cyan-50 rounded-lg transition-colors" title="Restore">
                        <RestoreIcon />
                      </button>
                      <button onClick={() => handleAction('delete', row)} className="p-1.5 text-[#ef4444] hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-gray-400 font-medium">No results found for your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
