import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const result = await login(form.username, form.password);
        if (result.success) navigate("/dashboard");
        else setError(result.message);
    };

    return (
        <div className="min-h-screen flex flex-col text-white bg-[#0f1524] relative">
            {/* DESKTOP TOP-LEFT LOGO & TITLE (Hidden on mobile) */}
            <div className="hidden md:flex flex-col px-6 md:px-8 lg:px-12 xl:px-16 py-8 w-full max-w-[1600px] mx-auto absolute top-0 left-0 right-0 z-10 pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto w-fit">
                    <div
                        className="flex items-center justify-center rounded-xl shadow-lg"
                        style={{ background: "linear-gradient(135deg, #4c6ef5, #5b5bd6)", width: 48, height: 48 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold tracking-wide">Q-Hawk</span>
                </div>
                
                <div className="mt-16 md:mt-24 pointer-events-auto w-fit">
                    <h2 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] tracking-tight">
                        Automate Your <br />
                        <span className="text-[#5c7aff]">Sales Force</span>
                    </h2>
                    <p className="text-[#8892a4] text-base mt-5 leading-relaxed max-w-sm">
                        To Build Faster, Productive & Trustworthy Sales<br />Team
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col justify-center w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-0 md:-mt-20">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-10 lg:gap-20 items-center w-full">
                    
                    {/* MOBILE HEADER (Logo + Title) */}
                    <div className="md:hidden flex flex-col items-center text-center w-full max-w-md mx-auto order-1 mt-4 mb-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="flex items-center justify-center rounded-xl shadow-lg"
                                style={{ background: "linear-gradient(135deg, #4c6ef5, #5b5bd6)", width: 40, height: 40 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <polyline points="10 17 15 12 10 7" />
                                    <line x1="15" y1="12" x2="3" y2="12" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-wide">Q-Hawk</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-4">
                            Automate Your <br />
                            <span className="text-[#5c7aff]">Sales Force</span>
                        </h2>
                        <p className="text-[#8892a4] text-sm leading-relaxed max-w-xs mx-auto mb-2">
                            To Build Faster, Productive & Trustworthy Sales Team
                        </p>
                    </div>

                    {/* DESKTOP LEFT (Empty Space to push form to right) */}
                    <div className="hidden md:block"></div>

                    {/* FORM CARD (Right on Desktop, Middle on Mobile) */}
                    <div className="rounded-2xl bg-[#293145] border border-white/5 shadow-2xl p-6 sm:p-8 w-full max-w-[380px] mx-auto md:ml-8 lg:ml-16 xl:ml-24 md:mr-auto order-2 md:order-none mb-4 md:mb-0 relative z-20">
                        <h3 className="text-2xl font-bold mb-1 tracking-tight">Member Login</h3>
                        <p className="text-[#8892a4] text-[13px] mb-6">
                            Don't have an account?{' '}
                            <span
                                onClick={() => navigate("/signup")}
                                className="cursor-pointer text-[#4c6ef5] font-medium hover:underline"
                            >
                                SignUp!
                            </span>
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Username */}
                            <div>
                                <label className="block text-[13px] font-medium text-[#c8d0de] mb-1.5">User Name</label>
                                <div className="flex items-center bg-[#22273b] border border-[#3b435b] rounded-xl h-[46px] px-4 focus-within:border-[#4c6ef5] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8892a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mr-3">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <input type="text" name="username" placeholder="Enter your username" value={form.username} onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white placeholder-[#8892a4]" />
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
                                    <input type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white placeholder-[#8892a4]" />
                                </div>
                            </div>
                            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 rounded-xl transition hover:opacity-90 bg-[#4c6ef5] h-[46px] text-[15px] font-semibold mt-2 shadow-lg shadow-[#4c6ef5]/20"
                            >
                                Login
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                            <p className="text-center text-[#8892a4] text-[11px] mt-1">
                                By clicking login you agree to the terms and conditions
                            </p>
                        </form>
                    </div>

                    {/* MOBILE CONTACT FOOTER */}
                    <div className="md:hidden text-[#8892a4] text-[13px] leading-relaxed mt-4 text-center order-3 w-full">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>info@simonteq.com</span>
                        </div>
                        <p>+917025122646, +919539330727</p>
                        <p>www.q-hawk.com</p>
                    </div>

                </div>
            </div>

            {/* Help button */}
            <div className="fixed bottom-6 right-6">
                <div className="flex items-center justify-center rounded-full cursor-pointer w-10 h-10 bg-[#1e2538] border border-[#2a3249] shadow-lg hover:bg-[#2a3249] transition">
                    <span className="text-[#8892a4] text-base font-bold">?</span>
                </div>
            </div>

            {/* DESKTOP CONTACT FOOTER (Bottom Left) */}
            <div className="hidden md:block absolute bottom-8 left-6 md:left-8 lg:left-12 xl:left-16 text-[#8892a4] text-[13px] leading-6">
                <div className="flex items-center gap-2 mb-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>info@simonteq.com</span>
                </div>
                <p>+917025122646, +919539330727</p>
                <p>www.q-hawk.com</p>
            </div>
        </div>
    );
}
