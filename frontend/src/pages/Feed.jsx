import { useEffect, useState } from "react";
import API from "../api/api";
import AdCard from "../components/AdCard";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Feed = () => {
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("foryou");
    const [loading, setLoading] = useState(false);

    const categories = ["foryou", "General", "Tech", "Business"];

    const fetchFeed = async () => {
        try {
            setLoading(true);
            const { data } = await API.get(`/feed?page=${page}&category=${category}`);
            setFeed((prev) => [...prev, ...data.feed]);
        } catch (err) {
            console.log("Error fetching feed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchFeed(); }, [page, category]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setPage((prev) => prev + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleBookmark = async (id) => {
        try {
            const { data } = await API.post("/user/bookmark", { articleId: id });
            toast.success(data.message || "Bookmark updated");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error saving article");
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d14]">
            <Navbar />

            {/* CATEGORY BAR */}
            <div className="sticky top-[57px] z-10 bg-[#0d0d14]/90 backdrop-blur-xl border-b border-white/[0.07]">
                <div className="flex gap-2 overflow-x-auto px-4 py-2.5 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setFeed([]); setPage(1); setCategory(cat); }}
                            className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap border transition-all duration-200
                                ${category === cat
                                    ? "bg-gradient-to-r from-violet-500 to-purple-400 text-white border-transparent shadow-[0_4px_14px_rgba(124,106,245,0.3)]"
                                    : "bg-white/[0.05] text-white/40 border-white/[0.07] hover:text-white hover:bg-white/[0.09]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* MAIN FEED */}
            <div className="max-w-2xl mx-auto px-3.5 py-5 space-y-3.5">
                {feed.map((item, index) => {

                    // ARTICLE CARD
                    if (item.type === "article") {
                        return (
                            <div
                                key={index}
                                className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] overflow-hidden
                                           transition-all duration-250 hover:border-violet-500/20 hover:bg-white/[0.06]
                                           hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                            >
                                {/* IMAGE */}
                                {item.data.image && (
                                    <img
                                        src={item.data.image}
                                        alt="feed"
                                        className="w-full h-52 object-cover"
                                    />
                                )}

                                {/* CONTENT */}
                                <div className="p-4 pb-[18px]">
                                    <h2 className="text-[16px] font-bold text-white leading-snug tracking-tight mb-2 line-clamp-2"
                                        style={{ fontFamily: "'Syne', sans-serif" }}>
                                        {item.data.title}
                                    </h2>

                                    <p className="text-white/38 text-[13px] leading-relaxed line-clamp-3 mb-3.5">
                                        {item.data.description}
                                    </p>

                                    {/* FOOTER */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10.5px] font-medium tracking-wide uppercase
                                                          px-2.5 py-1 rounded-full
                                                          bg-violet-500/10 border border-violet-500/20 text-purple-400">
                                            {category}
                                        </span>

                                        <button
                                            onClick={() => toggleBookmark(item.data._id)}
                                            className="flex items-center gap-1.5 text-[12.5px] font-medium
                                                       text-white/40 px-3 py-1.5 rounded-full
                                                       bg-white/[0.05] border border-white/[0.08]
                                                       hover:text-purple-400 hover:bg-violet-500/10 hover:border-violet-500/25
                                                       hover:scale-105 transition-all duration-200"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                                            </svg>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // AD CARD
                    if (item.type === "ad") {
                        return (
                            <div key={index} className="rounded-[20px] overflow-hidden border border-white/[0.07]
                                                         relative before:absolute before:inset-x-0 before:top-0 before:h-[2px]
                                                         before:bg-gradient-to-r before:from-transparent before:via-yellow-400 before:to-transparent">
                                <AdCard ad={item.data} />
                            </div>
                        );
                    }

                    return null;
                })}

                {/* LOADER */}
                {loading && (
                    <div className="flex justify-center py-6">
                        <div className="w-7 h-7 rounded-full border-2 border-white/[0.08] border-t-violet-500 animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feed;