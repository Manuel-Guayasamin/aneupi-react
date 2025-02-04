import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Chip,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@nextui-org/react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
export const TabsCongreso = ({ tabsOptions }) => {
  const [selected, setSelected] = useState(
    "Planificación del Congreso Internacional"
  );
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollWidth > clientWidth + scrollLeft);
    }
  };

  useEffect(() => {
    checkScroll();
  }, [scrollRef.current]);
  return (
    <div className="flex mx-auto flex-col relative">
      <Autocomplete
        className="block lg:hidden"
        selectedKey={selected}
        onSelectionChange={setSelected}
        defaultItems={tabsOptions}
        color="primary"
      >
        {(tab) => (
          <AutocompleteItem key={tab.title}>{tab.title}</AutocompleteItem>
        )}
      </Autocomplete>
      <Button
        onPress={scrollLeft}
        className="w-10 h-11 absolute right-0 z-50 hidden lg:flex border-[#00335f]"
        isIconOnly
        variant="bordered"
        color="primary"
      >
        <HiOutlineChevronRight size={20} />
      </Button>
      <Button
        onPress={scrollRight}
        className="w-10 h-11 absolute left-0 z-50 hidden lg:flex border-[#00335f]"
        isIconOnly
        variant="bordered"
        color="primary"
      >
        <HiOutlineChevronLeft size={20} />
      </Button>

      <Tabs
        ref={scrollRef}
        fullWidth
        variant="solid"
        size="lg"
        color="warning"
        selectedKey={selected}
        onSelectionChange={setSelected}
        aria-label="Options"
        classNames={{
          wrapper: "",
          tabList: "border-2 border-[#00335f] hidden lg:flex w-[90%] mx-auto",
          tabContent: "text-black font-semibold",
        }}
      >
        {tabsOptions.map((tab, index) => (
          <Tab
            title={
              <div className="flex items-center space-x-6">
                <span>{tab.title}</span>
              </div>
            }
            key={tab.title}
          >
            <Card radius="sm">
              <CardBody>{tab.content}</CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
