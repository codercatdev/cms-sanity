"use client";

import type { AuthorQueryResult } from "@/sanity.types";

import {
  FaDev,
  FaGithub,
  FaCodepen,
  FaDiscord,
  FaLastfm,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaMastodon,
  FaMedium,
  FaStackOverflow,
  FaSquareXTwitter,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa6";
import { BsSubstack } from "react-icons/bs";

import Dribble from "@/components/icons/dribble.svg";
import Link from "next/link";
import { IconContext } from "react-icons/lib";

export default function UserSocials({
  socials,
}: {
  socials?: NonNullable<AuthorQueryResult>["socials"];
}) {
  if (!socials) {
    return <></>;
  }

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "codepen":
        return <FaCodepen />;

      case "devto":
        return <FaDev />;

      case "discord":
        return <FaDiscord />;

      case "dribble":
        return <Dribble />;

      case "facebook":
        return <FaFacebook />;

      case "github":
        return <FaGithub />;

      case "instagram":
        return <FaInstagram />;

      case "lastfm":
        return <FaLastfm />;

      case "linkedin":
        return <FaLinkedin />;

      case "mastodon":
        return <FaMastodon />;

      case "medium":
        return <FaMedium />;

      case "stackoverflow":
        return <FaStackOverflow />;

      case "substack":
        return <BsSubstack />;

      case "tiktok":
        return <FaTiktok />;

      case "twitch":
        return <FaTwitch />;

      case "twitter":
        return <FaSquareXTwitter />;

      case "youtube":
        return <FaYoutube />;
    }
  };

  return (
    <IconContext.Provider value={{ size: "100%" }}>
      {Object.entries(socials).map((s) => (
        <Link
          href={s.at(1) || ""}
          key={s.at(0)}
          className="w-8 md:w-8 hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderIcon(s.at(0) || "")}
        </Link>
      ))}
    </IconContext.Provider>
  );
}
