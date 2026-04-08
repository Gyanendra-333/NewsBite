import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import AdAnalytics from "../components/AdAnalytics";

const Admin = () => {
    const [feeds, setFeeds] = useState([]);
    const [ads, setAds] = useState([]);

    const [editingFeedId, setEditingFeedId] = useState(null);
    const [editingAdId, setEditingAdId] = useState(null);

    const [feedForm, setFeedForm] = useState({
        name: "",
        url: "",
        category: "",
    });

    const [adForm, setAdForm] = useState({
        title: "",
        imageUrl: "",
        targetUrl: "",
        category: "",
    });

    const fetchData = async () => {
        const feedsRes = await API.get("/admin/feeds");
        const adsRes = await API.get("/admin/ads");

        setFeeds(feedsRes.data.data);
        setAds(adsRes.data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ================= VALIDATION =================
    const validateFeed = () => {
        if (!feedForm.name || !feedForm.url || !feedForm.category) {
            toast.error("All feed fields are required");
            return false;
        }
        return true;
    };

    const validateAd = () => {
        if (
            !adForm.title ||
            !adForm.imageUrl ||
            !adForm.targetUrl ||
            !adForm.category
        ) {
            toast.error("All ad fields are required");
            return false;
        }
        return true;
    };

    // ================= CREATE / UPDATE FEED =================
    const handleFeedSubmit = async () => {
        if (!validateFeed()) return;

        try {
            if (editingFeedId) {
                await API.put(`/admin/feeds/${editingFeedId}`, feedForm);
                toast.success("Feed updated");
            } else {
                await API.post("/admin/feeds", feedForm);
                toast.success("Feed created");
            }

            setFeedForm({ name: "", url: "", category: "" });
            setEditingFeedId(null);
            fetchData();
        } catch (err) {
            toast.error("Error saving feed", err);
        }
    };

    // ================= CREATE / UPDATE AD =================
    const handleAdSubmit = async () => {
        if (!validateAd()) return;

        try {
            if (editingAdId) {
                await API.put(`/admin/ads/${editingAdId}`, adForm);
                toast.success("Ad updated");
            } else {
                await API.post("/admin/ads", adForm);
                toast.success("Ad created");
            }

            setAdForm({
                title: "",
                imageUrl: "",
                targetUrl: "",
                category: "",
            });
            setEditingAdId(null);
            fetchData();
        } catch (err) {
            toast.error("Error saving ad", err);
        }
    };

    // ================= DELETE =================
    const deleteFeed = async (id) => {
        await API.delete(`/admin/feeds/${id}`);
        toast.success("Feed deleted");
        fetchData();
    };

    const deleteAd = async (id) => {
        await API.delete(`/admin/ads/${id}`);
        toast.success("Ad deleted");
        fetchData();
    };

    // ================= EDIT =================
    const editFeed = (f) => {
        setFeedForm(f);
        setEditingFeedId(f._id);
    };

    const editAd = (a) => {
        setAdForm(a);
        setEditingAdId(a._id);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-5xl mx-auto mb-6">
                <h1 className="text-2xl font-bold text-blue-600">
                    Admin Dashboard
                </h1>
            </div>
            <div className="text-start pt-3 pb-12 ps-18">
                <AdAnalytics />
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

                {/* FEED FORM */}
                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">
                        {editingFeedId ? "Edit Feed" : "Add Feed"}
                    </h2>

                    <div className="space-y-3">
                        <input
                            value={feedForm.name}
                            placeholder="Name"
                            className="w-full border p-3 rounded-lg"
                            onChange={(e) =>
                                setFeedForm({ ...feedForm, name: e.target.value })
                            }
                        />

                        <input
                            value={feedForm.url}
                            placeholder="URL"
                            className="w-full border p-3 rounded-lg"
                            onChange={(e) =>
                                setFeedForm({ ...feedForm, url: e.target.value })
                            }
                        />

                        <input
                            value={feedForm.category}
                            placeholder="Category"
                            className="w-full border p-3 rounded-lg"
                            onChange={(e) =>
                                setFeedForm({
                                    ...feedForm,
                                    category: e.target.value,
                                })
                            }
                        />

                        <button
                            onClick={handleFeedSubmit}
                            className="w-full bg-blue-600 text-white py-3 cursor-pointer rounded-lg"
                        >
                            {editingFeedId ? "Update Feed" : "Add Feed"}
                        </button>
                    </div>
                </div>

                {/* AD FORM */}
                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">
                        {editingAdId ? "Edit Ad" : "Create Ad"}
                    </h2>

                    <div className="space-y-3">
                        <input
                            value={adForm.title}
                            placeholder="Title"
                            className="w-full border p-3 rounded-lg"
                            onChange={(e) =>
                                setAdForm({ ...adForm, title: e.target.value })
                            }
                        />

                        <input
                            value={adForm.imageUrl}
                            placeholder="Image URL"
                            className="w-full border p-3 rounded-lg"
                            onChange={(e) =>
                                setAdForm({
                                    ...adForm,
                                    imageUrl: e.target.value,
                                })
                            }
                        />

                        <input
                            value={adForm.targetUrl}
                            placeholder="Target URL"
                            className="w-full border p-3 rounded-lg"
                            onChange={(e) =>
                                setAdForm({
                                    ...adForm,
                                    targetUrl: e.target.value,
                                })
                            }
                        />

                        <input
                            value={adForm.category}
                            placeholder="Category"
                            className="w-full border p-3 rounded-lg"
                            onChange={(e) =>
                                setAdForm({
                                    ...adForm,
                                    category: e.target.value,
                                })
                            }
                        />

                        <button
                            onClick={handleAdSubmit}
                            className="w-full bg-green-600 text-white py-3 rounded-lg cursor-pointer"
                        >
                            {editingAdId ? "Update Ad" : "Create Ad"}
                        </button>
                    </div>
                </div>
            </div>

            {/* LIST */}
            <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-2 gap-6">

                {/* FEEDS */}
                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-3">Feeds</h2>

                    {feeds.map((f) => (
                        <div
                            key={f._id}
                            className="flex justify-between items-center border p-2 rounded mb-2"
                        >
                            <span>{f.name}</span>

                            <div className="space-x-2">
                                <button
                                    onClick={() => editFeed(f)}
                                    className="text-blue-500 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteFeed(f._id)}
                                    className="text-red-500 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ADS */}
                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-3">Ads</h2>

                    {ads.map((a) => (
                        <div
                            key={a._id}
                            className="flex justify-between items-center border p-2 rounded mb-2"
                        >
                            <span>{a.title}</span>

                            <div className="space-x-2">
                                <button
                                    onClick={() => editAd(a)}
                                    className="text-green-500 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteAd(a._id)}
                                    className="text-red-500 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;