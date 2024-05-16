"use client";
import RepoCard from "@/components/repocard";
import { BackArrow } from "@/components/svgs";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const PAGE_SIZE = 12;
function RepoPage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [userRepos, setUserRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response: any = await axios.get(
          `https://api.github.com/users/${username}/repos?page=${page}&per_page=${PAGE_SIZE}`
        );
        if (response.data) {
          let sortedRepos: any = response.data;
          sortedRepos = [...userRepos, ...sortedRepos];
          sortedRepos = removeDuplicates(sortedRepos);
          setUserRepos([...sortedRepos]);
          setHasMore(sortedRepos.length === PAGE_SIZE);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);// eslint-disable-line

  const loadMoreUsers = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore && !loading) {
      loadMoreUsers();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (userRepos.length > 0) {
      observer.observe(document?.getElementById("bottom")!);
    }

    return () => {
      observer.disconnect();
    };
  }, [userRepos, hasMore, loading]);// eslint-disable-line

  const removeDuplicates = (array: any) => {
    const uniqueSet = new Set(array.map((repo: any) => JSON.stringify(repo)));
    const uniqueArray = Array.from(uniqueSet).map((item: any) =>
      JSON.parse(item)
    );
    return uniqueArray;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={"/"} className="flex gap-5">
        <BackArrow />
        <h1 className="text-3xl font-bold text-left mb-8">
          {username.toLocaleUpperCase()} Repos
        </h1>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {userRepos.map((repo: any, index: any) => (
          <RepoCard key={repo.id + index} repo={repo} />
        ))}
      </div>
      <div id="bottom" className="py-8 text-center">
        {loading && <p>Loading...</p>}
        {!loading && !hasMore && <p>No more users to load.</p>}
      </div>
    </div>
  );
}

export default RepoPage;
