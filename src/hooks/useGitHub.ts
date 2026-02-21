import { useState, useEffect } from 'react';

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export function useGitHub(username: string) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        if (profileRes.ok) setProfile(await profileRes.json());
        if (reposRes.ok) {
          const data = await reposRes.json();
          // Filter out forks and sort by stars to get "featured" projects
          const filtered = data
            .filter((repo: any) => !repo.fork)
            .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10);
          setRepos(filtered);
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  return { repos, profile, loading };
}
