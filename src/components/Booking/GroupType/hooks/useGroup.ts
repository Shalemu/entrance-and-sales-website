"use client";

import { useEffect, useState } from "react";
import { getGroupTypes } from "../api/group.api";
import { GroupType } from "../Grouptype";

export function useGroup() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadGroupTypes();
  }, []);

  const loadGroupTypes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getGroupTypes();

      setGroups(data);
    } catch (err: any) {
      setError(err.message || "Failed to load group types");
    } finally {
      setLoading(false);
    }
  };

  return {
    groups,
    loading,
    error,
    refresh: loadGroupTypes,
  };
}