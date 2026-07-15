import { useGroup } from "./GroupType/hooks/useGroup";

const { groups, loading, error } = useGroup();

const customerTypes = groups.map((group) => ({
  id: group.code.toLowerCase(),
  label: group.name,
}));