import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomTypeDropdown({
  selectedType,
  setSelectedType,
  setCurrentPage,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const typeOptions = [
    "All Types",
    "Grass",
    "Fire",
    "Water",
    "Bug",
    "Normal",
    "Poison",
    "Electric",
    "Ground",
    "Fairy",
    "Fighting",
    "Psychic",
    "Rock",
    "Ghost",
    "Ice",
    "Dragon",
  ];

  const handleSelect = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
    setIsOpen(false);
  };

  return (
    <div className="relative md:col-span-3 z-[999]">
      {/* Main Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3 rounded-2xl bg-white/[0.03] border border-[#D4A569] text-white flex items-center justify-between focus:outline-none"
      >
        <span>{selectedType}</span>

        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-full max-h-[320px] overflow-y-auto rounded-2xl bg-[#241812] border border-[#D4A569] shadow-2xl z-[9999]">

          {typeOptions.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSelect(type)}
              className={`w-full text-left px-5 py-3 transition-all duration-200 ${
                selectedType === type
                  ? "bg-[#D4A569] text-black"
                  : "text-[#D4A569] hover:bg-[#D4A569] hover:text-black"
              }`}
            >
              {type}
            </button>
          ))}

        </div>
      )}
    </div>
  );
}