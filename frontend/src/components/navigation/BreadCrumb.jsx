import { Link } from "react-router-dom";

const BreadCrumb = ({ links, title }) => {
  return (
    <article className="flex items-center justify-center px-10 py-2 text-neutral-500">
      <div className="flex text-sm breadcrumbs">
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.path}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default BreadCrumb;

/* <h3 className="text-2xl font-bold md:text-4xl">{title}</h3> */
