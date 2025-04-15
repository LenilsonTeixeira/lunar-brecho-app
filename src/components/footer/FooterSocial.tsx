import { Link } from "react-router";
import InstagramIcon from "../icon/InstagramIcon";

type FooterSocialProps = {
  instagramHandle: string;
};

const FooterSocial = ({ instagramHandle }: FooterSocialProps) => {
  return (
    <div>
      <Link
        to={`https://instagram.com/${instagramHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-pink-400 transition-colors"
      >
        <InstagramIcon />
        <span>@{instagramHandle}</span>
      </Link>
    </div>
  );
};

export default FooterSocial;