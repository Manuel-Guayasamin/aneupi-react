import React from 'react';

const DshContainer = ({ title, content, children }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center xl:items-start xl:justify-between p-6 space-y-4 border-b dsh-primary xl:flex-row xl:space-y-0">
        <h1 className="text-2xl font-semibold justify-center text-center">{title}</h1>
        {React.Children.map(content, (item, index) => (
          <div key={index} className="flex flex-row gap-2">
            {item}
          </div>
        ))}
      </div>

      <section className="p-2 md:p-4 xl:p-6">
        {children}
      </section>
    </div>
  );
};

export default DshContainer;
