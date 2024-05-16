"use client";
import Card from "@/components/userCards";
import React, { useEffect, useState } from "react";
import axios from "axios";
const PAGE_SIZE = 25;
const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/angular/angular/contributors?page=${page}&per_page=${PAGE_SIZE}`
        );
        if (response.data) {
          let newUsers: any = response.data;
          newUsers = [...users, ...newUsers];
          newUsers = removeDuplicates(newUsers);
          setUsers([...newUsers]);
          setHasMore(newUsers.length === PAGE_SIZE);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page,users]);

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

    if (users.length > 0) {
      observer.observe(document?.getElementById("bottom")!);
    }

    return () => {
      observer.disconnect();
    };
  }, [users, hasMore, loading]);// eslint-disable-line

  const removeDuplicates = (array: any) => {
    const uniqueSet = new Set(array.map((user: any) => JSON.stringify(user)));
    const uniqueArray = Array.from(uniqueSet).map((item: any) =>
      JSON.parse(item)
    );
    return uniqueArray;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-left mb-8">Top Contributors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.map((user: any, index: any) => (
          <Card key={user.id + index} user={user} />
        ))}
      </div>
      <div id="bottom" className="py-8 text-center">
        {loading && <p>Loading...</p>}
        {!loading && !hasMore && <p>No more users to load.</p>}
      </div>
    </div>
  );
};

export default UsersPage;
