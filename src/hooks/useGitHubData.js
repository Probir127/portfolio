import { useState, useEffect } from 'react';
import axios from 'axios';

const USERNAME = 'Probir127';

export function useGitHubData() {
    const [stats, setStats] = useState({
        repos: [],
        totalStars: 0,
        totalCommits: 0, // Approximate or via separate API
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Repos
                const repoRes = await axios.get(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`);
                const repos = repoRes.data;

                // Fetch Events (for Heatmap)
                const eventsRes = await axios.get(`https://api.github.com/users/${USERNAME}/events?per_page=100`);
                const events = eventsRes.data;

                // Calculate Totals
                const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

                // Note: Getting total commits requires separate calls per repo or GraphQL, 
                // we'll stick to a static estimate + live stars for performance/rate-limits unless user provides a token.
                // Or we can use a public scraper API if strictly needed, but let's stick to official API for now.

                setStats({
                    repos: repos,
                    events: events,
                    totalStars,
                    totalCommits: 150, // Fallback/Static as placeholder for now
                    loading: false,
                    error: null
                });
            } catch (err) {
                console.error("GitHub API Error:", err);
                setStats(prev => ({ ...prev, loading: false, error: err }));
            }
        };

        fetchData();
    }, []);

    return stats;
}
