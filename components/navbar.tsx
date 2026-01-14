"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SiDiscord, SiTwitch, SiYoutube } from "react-icons/si";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface NavbarProps {
  links?: NavLink[];
}

const defaultLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/hunt-sensitivity", label: "Sensitivity" },
];

const socialLinks = [
  {
    href: "https://discord.gg/9KrBNvBH7a",
    label: "Discord",
    icon: SiDiscord,
  },
  {
    href: "https://www.youtube.com/@bloodlineranks",
    label: "YouTube",
    icon: SiYoutube,
  },
  {
    href: "https://www.twitch.tv/acidtib",
    label: "Twitch",
    icon: SiTwitch,
  },
];

export function Navbar({ links = defaultLinks }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-colors"
        >
          <span className="font-display text-lg uppercase tracking-widest text-parchment transition-colors group-hover:text-primary">
            Bloodline Ranks
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "group inline-flex h-9 items-center justify-center px-4 py-2 font-display text-base uppercase tracking-widest text-muted-foreground transition-colors",
                        "hover:text-parchment focus:text-parchment focus:outline-none",
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Social Links */}
          <div className="flex items-center gap-2 border-l border-border/50 pl-6">
            {socialLinks.map((social) => (
              <Button
                key={social.href}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                asChild
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-parchment"
                aria-label="Toggle menu"
              >
                {isOpen
                  ? <X className="h-5 w-5" />
                  : <Menu className="h-5 w-5" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-56 border-border/50 bg-card/95 p-2 backdrop-blur-md"
            >
              <nav className="flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setIsOpen(false)}
                    className="rounded-md px-3 py-2 font-display text-base uppercase tracking-widest text-muted-foreground transition-colors hover:bg-accent/10 hover:text-parchment"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Divider */}
                <div className="my-2 h-px bg-border/50" />

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 py-2">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-muted-foreground transition-colors hover:text-accent"
                    >
                      <social.icon className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              </nav>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </header>
  );
}
