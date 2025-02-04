import React from "react";

import { GoHomeFill } from "react-icons/go";
import DshButtonLink from "../components/dshButtonLink";
import DshButton from "../components/DshButton";
import ThemeToggle from "../components/Theme/ThemeToggle";
import { HiMenuAlt3 } from "react-icons/hi";

import getImgConv from "../components/utils";

const DshHeader = ({ handleToggleSidebar }) => {
  return (
    <header className="flex items-center flex-shrink-0 h-20 px-2 dsh-primary border-b gap-x-4 sm:px-8">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/aneupi-a05ed.appspot.com/o/brand%2Fbrand.png?alt=media&token=3baa4aad-fc09-4782-a468-087122152d6e"
        className="h-10 md:hidden dark:brightness-0 dark:invert"
      />
      <DshButtonLink
        to="/"
        Icon={GoHomeFill}
        label="Ir a la página principal"
        className="ml-auto md:ml-0 md:flex"
        labelClass="hidden"
      />
      <ThemeToggle className="ml-0 md:ml-auto" />
      <DshButton
        icon={HiMenuAlt3}
        onClick={handleToggleSidebar}
        className="dsh-btn-icon md:hidden"
      />
    </header>
  );
};

export default DshHeader;
