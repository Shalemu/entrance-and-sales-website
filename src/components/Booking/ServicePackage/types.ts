import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  price: string;
  packages: number;
  features: string[];
}

export interface Package {
  id: string;
  serviceId: string;
  name: string;
  duration: string;
  price: string;
  recommended: boolean;
  features: string[];
}