import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#0d0d14]/85 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto px-5 py-3 flex justify-between items-center">

                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2.5 cursor-pointer group"
                >
                    <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-violet-500 to-purple-400
                                    flex items-center justify-center shadow-[0_4px_14px_rgba(124,106,245,0.35)]
                                    group-hover:shadow-[0_6px_20px_rgba(124,106,245,0.55)] transition-shadow duration-200">
                        <span className="text-white font-bold text-[15px]" style={{ fontFamily: "'Syne',sans-serif" }}>N</span>
                    </div>
                    <h1 className="text-[19px] font-bold text-white tracking-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
                        News<span className="text-purple-400">Bite</span>
                    </h1>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">

                    {/* Bookmarks */}
                    <Link
                        to="/bookmarks"
                        className="flex items-center gap-1.5 text-[13px] font-medium text-white/50
                                   px-3 py-[7px] rounded-[10px] border border-transparent
                                   hover:text-purple-400 hover:bg-violet-500/10 hover:border-violet-500/20
                                   transition-all duration-200"
                    >
                        <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                        </svg>
                        <span className="hidden sm:block">Bookmarks</span>
                    </Link>

                    {user && (
                        <>
                            {/* Avatar Pill */}
                            <div className="flex items-center gap-2 pl-1.5 pr-3 py-1.5
                                            bg-white/[0.05] border border-white/[0.08] rounded-full">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-400
                                                flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-[11px]" style={{ fontFamily: "'Syne',sans-serif" }}>
                                        {user.email?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-[12.5px] text-white/50 hidden sm:block max-w-[130px] truncate">
                                    {user.email}
                                </span>
                            </div>

                            {/* Logout */}
                            <button
                                onClick={() => { logout(); navigate("/login"); }}
                                className="flex items-center gap-1.5 text-[13px] font-medium
                                           text-red-400/70 border border-red-500/20
                                           px-3 py-[7px] rounded-[10px] bg-transparent
                                           hover:text-white hover:bg-red-500/15 hover:border-red-500/40
                                           transition-all duration-200"
                            >
                                <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden sm:block">Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;