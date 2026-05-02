import React from 'react';

const Sidebar = ({ sections, highlightedSections, onNavClick }) => {
  const sectionLabels = ['A', 'B', 'C', 'D'];
  
  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-white/95 backdrop-blur-md shadow-2xl flex flex-col justify-center px-8 z-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center  bg-clip-text">
        Navigation
      </h2>
      <div className="flex flex-col gap-8">
        {sections.map((section, index) => (
          <div
            key={section.id}
            onClick={() => onNavClick(section.id)}
            className="flex items-center gap-4 cursor-pointer transition-transform hover:translate-x-1 group"
          >
            <div className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${highlightedSections.includes(section.id) 
                ? 'bg-gray-700 shadow-lg shadow-purple-200 scale-125' 
                : 'bg-gray-300 group-hover:text-gray-900'
              }
            `} />
            <span className={`
              text-base font-medium transition-all duration-300
              ${highlightedSections.includes(section.id) 
                ? 'text-gray-900 font-semibold' 
                : 'text-gray-500 group-hover:text-gray-900'
              }
            `}>
              Section {sectionLabels[index]} — {section.title.split('—')[1]?.trim() || section.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;