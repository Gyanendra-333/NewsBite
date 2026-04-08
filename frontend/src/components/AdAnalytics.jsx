import { useEffect, useState } from "react";
import API from "../api/api";

const AdAnalytics = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const { data } = await API.get("/admin/stats");
            setStats(data.stats);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">📊 Ad Analytics Data</h2>

            {loading && (
                <p className="text-gray-500">Loading analytics...</p>
            )}

            {!loading && stats.length === 0 && (
                <p className="text-gray-500">No analytics data</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat._id}
                        className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                    >
                        <p className="text-sm text-gray-500 mb-1">
                            Ad ID
                        </p>

                        <p className="text-xs text-gray-400 break-all mb-3">
                            {stat._id}
                        </p>

                        <div className="flex justify-between text-sm">
                            <span>👁️ Views</span>
                            <span className="font-semibold">
                                {stat.views}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm mt-1">
                            <span>🖱️ Clicks</span>
                            <span className="font-semibold">
                                {stat.clicks}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdAnalytics;