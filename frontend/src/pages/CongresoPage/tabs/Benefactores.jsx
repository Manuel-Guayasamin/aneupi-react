import { Accordion, AccordionItem } from "@nextui-org/react";
import { BenefactoresItems } from "./BenefactoresItems";
export const Benefactores = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const Items = [
    {
      title: "Patrocinadores",
      content: <BenefactoresItems />,
    },
    {
      title: "Auspiciantes",
      content: <BenefactoresItems />,
    },
    {
      title: "Avales",
      content: <BenefactoresItems />,
    },
  ];

  return (
    <Accordion defaultExpandedKeys={["0"]}>
      {Items.map(({ title, content }, index) => (
        <AccordionItem key={index} aria-label="Accordion 1" title={title}>
          {content}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
