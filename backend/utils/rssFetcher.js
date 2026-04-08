import cron from "node-cron";
import Parser from "rss-parser";
import Feed from "../models/Feed.js";
import Article from "../models/Article.js";

const parser = new Parser();

const startRSSFetcher = () => {
    // har 5 minute me run hoga
    cron.schedule("*/5 * * * *", async () => {
        console.log("Running RSS Fetcher...");

        try {
            const feeds = await Feed.find({ isActive: true });

            for (let feed of feeds) {
                try {
                    const data = await parser.parseURL(feed.url);

                    for (let item of data.items) {
                        try {
                            // duplicate check
                            const exists = await Article.findOne({ link: item.link });
                            if (exists) continue;

                            await Article.create({
                                title: item.title,
                                description: item.contentSnippet || "",
                                link: item.link,
                                pubDate: item.pubDate,
                                source: feed.name,
                                category: feed.category,
                            });
                        } catch (err) {
                            console.log("Article save error");
                        }
                    }
                } catch (err) {
                    console.log(`Feed error: ${feed.name}`);
                }
            }
        } catch (error) {
            console.log("RSS Fetcher Error");
        }
    });
};

export default startRSSFetcher;