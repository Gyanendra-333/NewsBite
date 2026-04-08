import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const { data } = await API.get("/user/bookmarks");
            setBookmarks(data.bookmarks);
        };
        fetchBookmarks();
    }, []);

    return (
        <div className="min-h-screen bg-[#0d0d14]">
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 py-9">
                {/* Page Header */}
                <div className="mb-7">
                    <h1 className="text-[26px] font-bold text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Bookmarks
                        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium
                                         bg-violet-500/10 border border-violet-500/25 text-violet-300 align-middle">
                            {bookmarks.length} saved
                        </span>
                    </h1>
                    <p className="text-sm text-white/35 mt-1">Your saved articles and reads</p>
                </div>

                {/* Bookmark List */}
                <div className="flex flex-col gap-3">
                    {bookmarks.map((item, i) => (
                        <div
                            key={item._id}
                            className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4
                                       transition-all duration-250 hover:bg-white/[0.07] hover:border-violet-500/25
                                       hover:translate-x-1 cursor-pointer overflow-hidden"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            {/* Left accent bar */}
                            <div className="absolute left-0 top-[16%] bottom-[16%] w-[3px] rounded-r-full
                                            bg-gradient-to-b from-violet-500 to-purple-400
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                            <h2 className="font-semibold text-[15px] text-white leading-snug mb-2 tracking-tight"
                                style={{ fontFamily: "'Syne', sans-serif" }}>
                                {item.title}
                            </h2>
                            <p className="text-[13px] text-white/40 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}

                    {/* Empty state */}
                    {bookmarks.length === 0 && (
                        <div className="text-center py-16 text-white/20">
                            <div className="text-4xl mb-3 opacity-40">🔖</div>
                            <p className="text-sm">No bookmarks yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookmarks;