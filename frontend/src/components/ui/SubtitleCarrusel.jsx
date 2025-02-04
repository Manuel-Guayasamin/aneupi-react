import React from "react";
import PropTypes from "prop-types";

const SubCarrusel = ({ title, children, font }) => {
    return (
        <header className="prose-lg text-center md:prose-xl ">
            {/* <header className="prose-lg md:prose-xl text-center md:!text-left ml-20"> */}
            <h2 className="font-bold text-[#ffffff]" style={{ fontFamily: font }}>
                {title || children}
            </h2>
        </header>
    );
};

SubCarrusel.propTypes = {
    title: PropTypes.string.isRequired,
};

export default SubCarrusel;
