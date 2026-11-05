"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

export interface FooterLinkItem {
  label: string;
  href: string;
}

/** A column of footer links; the page you're on is highlighted. */
export default function FooterLinks({ items, label }: { items: FooterLinkItem[]; label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className="mt-6 space-y-3.5">
        {items.map((item) => {
          const current = !item.href.includes("#") && item.href === pathname;
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={current ? "page" : undefined} className="ft-link ft-body text-[15px]">
                <span className="ft-link-arrow" aria-hidden="true">
                  <FiArrowRight size={14} />
                </span>
                {item.label}
                {current && <span aria-hidden="true" className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2dd4bf]" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
