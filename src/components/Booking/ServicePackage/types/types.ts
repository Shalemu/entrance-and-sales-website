import { LucideIcon } from "lucide-react";

export interface ResourceType {
  id: number;
  name: string;
  description: string | null;
}


export interface Resource {
  id: number;
  name: string;
  code: string;
  resource_usage_type: string;
  capacity: number;
  status: string;
  description: string | null;

  resource_type: ResourceType;
}


export interface ServicePrice {
  id: number;
  tier_order: number;
  minimum_quantity: number;
  maximum_quantity: number;
  price: string;
  active_from: string | null;
  active_until: string | null;
  pricing_rule: string;
  group_type: string | null;
  age_category: string | null;

  price_mode: 
    | "fixed"
    | "per_person"
    | "per_adult_child";
}

export interface BranchService {
  id: number;
  is_bookable: boolean;
  display_order: number;
  participants_per_resource: number;
  status: boolean;

  service: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    thumbnail: string | null;
    service_type: string;
    access_control_type: string;
    status: boolean;
  };
  
  resources: Resource[];  
  prices: ServicePrice[];
  
  min_participants?: number;
  max_participants?: number;
}

export type PackagePrice = {
  id: number;
  price: string;

  group_type: string | null;
  pricing_rule: string | null;
  age_category: string | null;

  minimum_quantity: number | null;
  maximum_quantity: number | null;
  
 
};

export type Package = {
  id: number;
  name: string;
  slug: string;
  pricing_mode:
  | "fixed"
  | "per_person"
  | "per_adult_child";
  
  minimum_guests: number;
  maximum_guests: number;
  status: boolean;

  prices: PackagePrice[];

  package_type: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    status: boolean;
  };

  branch: {
    id: number;
    name: string;
    code: string;
    phone: string;
    email: string;
    address: string;
    latitude: string | null;
    longitude: string | null;
    status: string;
  };
};
