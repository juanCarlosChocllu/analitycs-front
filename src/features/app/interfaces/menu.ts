import * as react from "react";

export interface SubMenuItem {
  text: string;
  link: string;
  icon: react.ReactNode;
  roles?: string[];
}

export interface MenuItem {
  id: number;
  text: string;
  icon: react.ReactNode;
  roles: string[]
  items: SubMenuItem[];
}
