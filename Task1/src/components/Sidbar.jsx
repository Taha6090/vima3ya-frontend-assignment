import React from 'react';

const Sidebar = ({ sections, highlightedSections, onNavClick }) => {
  const sectionLabels = ['A', 'B', 'C', 'D'];
  
  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-white/95 backdrop-blur-md shadow-2xl flex flex-col justify-center px-8 z-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
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
                ? 'bg-purple-600 shadow-lg shadow-purple-200 scale-125' 
                : 'bg-gray-300 group-hover:bg-purple-400'
              }
            `} />
            <span className={`
              text-base font-medium transition-all duration-300
              ${highlightedSections.includes(section.id) 
                ? 'text-purple-600 font-semibold' 
                : 'text-gray-500 group-hover:text-purple-500'
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