import React from "react";

export const useToggle = () => {
  const [isToggled, setIsToggled] = React.useState(false);

  const toggle = () => setIsToggled(!isToggled);

  return { isToggled, toggle };
};
