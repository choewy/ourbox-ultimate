export interface NavbarItem {
  label: string;
  subLabel?: string;
  children?: Array<NavbarItem>;
  href?: string;
}
