import PropTypes from "prop-types";

const Subtitle = ({ title, children }) => {
  return (
    <header className="prose-lg md:prose-xl text-center md:!text-left">
      <h2 className="font-bold text-[#00335f]">{title || children}</h2>
    </header>
  );
};

Subtitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Subtitle;
