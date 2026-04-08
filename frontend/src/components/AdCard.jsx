/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import API from "../api/api";

const AdCard = ({ ad }) => {
    const adRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    trackView();
                }
            },
            { threshold: 0.5 }
        );

        if (adRef.current) observer.observe(adRef.current);

        return () => {
            if (adRef.current) observer.unobserve(adRef.current);
        };
    }, []);

    const trackView = async () => {
        try {
            await API.post("/ads/view", { adId: ad._id });
        } catch (err) {
            console.log("View tracking error");
        }
    };

    const handleClick = async () => {
        try {
            await API.post("/ads/click", { adId: ad._id });
            window.open(ad.targetUrl, "_blank");
        } catch (err) {
            console.log("Click tracking error");
        }
    };

    return (
        <div
            ref={adRef}
            className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-yellow-400/20
                       before:absolute before:inset-x-0 before:top-0 before:h-[2px]
                       before:bg-gradient-to-r before:from-transparent before:via-yellow-400 before:to-transparent"
            style={{ animation: "adSlideUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
            {/* Sponsored Badge */}
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-yellow-400/85">
                    Sponsored
                </span>
            </div>

            {/* Image */}
            {ad.imageUrl && (
                <div className="mx-3.5 rounded-xl overflow-hidden h-44 relative">
                    <img
                        src={ad.imageUrl}
                        alt="ad"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Bottom fade overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className="px-4 pt-3 pb-4">
                <h2 className="font-bold text-white text-[16px] leading-snug tracking-tight mb-1.5"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {ad.title}
                </h2>

                <button
                    onClick={handleClick}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full
                               bg-gradient-to-r from-yellow-400 to-orange-400
                               text-[13px] font-semibold text-gray-900
                               transition-all duration-200 hover:scale-105 hover:shadow-lg
                               hover:shadow-yellow-400/30 active:scale-95"
                >
                    Visit Now
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>
            </div>

            {/* Keyframe — add to your global CSS */}
            <style>{`
                @keyframes adSlideUp {
                    from { opacity: 0; transform: translateY(16px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default AdCard;