import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setSuccess("");
        if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
        const result = await signup(form.username, form.email, form.password);
        if (result.success) { setSuccess(result.message); setTimeout(() => navigate("/login"), 2000); }
        else setError(result.message);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0f1524]">
            <div className="w-full max-w-[1050px] flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-20 items-center mx-auto px-6 sm:px-10 py-12 md:py-0">

                {/* MOBILE HEADER - Only visible on small screens */}
                <div className="md:hidden flex flex-col items-center text-center w-full max-w-md mx-auto mt-4 mb-2">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-6">
                        <div
                            className="flex items-center justify-center rounded-xl"
                            style={{ background: "linear-gradient(135deg, #4c6ef5, #5b5bd6)", width: 40, height: 40 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <line x1="20" y1="8" x2="20" y2="14" />
                                <line x1="23" y1="11" x2="17" y2="11" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-wide">Q-Hawk</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 tracking-tight">
                        Join Our <br />
                        <span className="text-[#5c7aff]">Platform</span>
                    </h2>
                    <p className="text-[#8892a4] text-sm leading-relaxed mb-2 max-w-xs">
                        Start building your productive and trustworthy sales team today
                    </p>
                </div>

                {/* LEFT - CARD */}
                <div className="rounded-2xl bg-[#293145] border border-white/5 shadow-2xl p-6 sm:p-8 mb-4 md:mb-0 w-full max-w-[380px] mx-auto md:ml-auto md:mr-0">
                    <h3 className="text-2xl font-bold mb-1 tracking-tight">Create Account</h3>
                    <p className="text-[#8892a4] text-[13px] mb-6">
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate("/login")}
                            className="cursor-pointer text-[#4c6ef5] font-medium hover:underline"
                        >
                            Login
                        </span>
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Username */}
                        <div>
                            <label className="block text-[13px] font-medium text-[#c8d0de] mb-1.5">Username</label>
                            <div className="flex items-center bg-[#22273b] border border-[#3b435b] rounded-xl h-[46px] px-4 focus-within:border-[#4c6ef5] transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8892a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mr-3">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <input type="text" name="username" placeholder="Choose a username" value={form.username} onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white placeholder-[#8892a4]" />
                            </div>
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-[13px] font-medium text-[#c8d0de] mb-1.5">Email</label>
                            <div className="flex items-center bg-[#22273b] border border-[#3b435b] rounded-xl h-[46px] px-4 focus-within:border-[#4c6ef5] transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8892a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mr-3">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white placeholder-[#8892a4]" />
                            </div>
                        </div>
                        {/* Password */}
                        <div>
                            <label className="block text-[13px] font-medium text-[#c8d0de] mb-1.5">Password</label>
                            <div className="flex items-center bg-[#22273b] border border-[#3b435b] rounded-xl h-[46px] px-4 focus-within:border-[#4c6ef5] transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8892a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mr-3">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input type="password" name="password" placeholder="Create a password" value={form.password} onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white placeholder-[#8892a4]" />
                            </div>
                        </div>
                        {/* Confirm Password */}
                        <div>
                            <label className="block text-[13px] font-medium text-[#c8d0de] mb-1.5">Confirm Password</label>
                            <div className="flex items-center bg-[#22273b] border border-[#3b435b] rounded-xl h-[46px] px-4 focus-within:border-[#4c6ef5] transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8892a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mr-3">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input type="password" name="confirmPassword" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white placeholder-[#8892a4]" />
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                        {success && <p className="text-green-400 text-xs mt-1">{success}</p>}
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 rounded-xl transition hover:opacity-90 bg-[#4c6ef5] h-[46px] text-[15px] font-semibold mt-2 shadow-lg shadow-[#4c6ef5]/20"
                        >
                            Sign Up
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <p className="text-center text-[#8892a4] text-[11px] mt-1">
                            By signing up you agree to our terms and privacy policy
                        </p>
                    </form>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col w-full max-w-md mx-auto md:max-w-none">
                    {/* DESKTOP HEADER - Hidden on mobile */}
                    <div className="hidden md:flex flex-col">
                        {/* Logo */}
                        <div className="flex items-center gap-4 mb-10">
                            <div
                                className="flex items-center justify-center rounded-xl"
                                style={{ background: "linear-gradient(135deg, #4c6ef5, #5b5bd6)", width: 48, height: 48 }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <line x1="20" y1="8" x2="20" y2="14" />
                                    <line x1="23" y1="11" x2="17" y2="11" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-wide">Q-Hawk</span>
                        </div>
                        <h2 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-5 tracking-tight">
                            Join Our <br />
                            <span className="text-[#5c7aff]">Platform</span>
                        </h2>
                        <p className="text-[#8892a4] text-base leading-relaxed mb-10 max-w-sm">
                            Start building your productive and trustworthy sales team today
                        </p>
                    </div>

                    {/* Feature cards */}
                    <div className="flex flex-col gap-4">
                        {[
                            { title: "Automate Workflows", desc: "Streamline your sales process" },
                            { title: "Track Performance", desc: "Monitor team metrics in real-time" },
                            { title: "Grow Revenue", desc: "Scale your business faster" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-[#1e2538] border border-[#2a3249] rounded-xl px-6 py-5 transition hover:border-[#4c6ef5]/50"
                            >
                                <p className="font-bold text-[15px] text-white mb-1">{item.title}</p>
                                <p className="text-sm text-[#8892a4]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Help button */}
            <div className="fixed bottom-6 right-6">
                <div className="flex items-center justify-center rounded-full cursor-pointer w-10 h-10 bg-[#1e2538] border border-[#2a3249] shadow-lg hover:bg-[#2a3249] transition">
                    <span className="text-[#8892a4] text-base font-bold">?</span>
                </div>
            </div>
        </div>
    );
}
