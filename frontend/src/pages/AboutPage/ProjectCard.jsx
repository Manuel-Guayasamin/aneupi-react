import { Link } from "@nextui-org/react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
export const ProjectCard = ({ title, description, href }) => {
  return (
    <section className="border-2 border-[#00335f] rounded-xl p-4 flex flex-col justify-between gap-4">
      <h3 className="text-[#00335f] text-xl">{title}</h3>
      <p className="text-sm text-default-600 text-justify">{description}</p>
      <Link href={href}>
        Para más información <HiOutlineArrowUpRight />
      </Link>
    </section>
  );
};
