import { useState, ChangeEvent, KeyboardEvent, useRef, MouseEvent } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "@stores/searchFiltersStore";

type SearchBarProps = {
  onFocus: () => void;
  onCloseFilter: () => void;
};

export const SearchBar = ({ onFocus, onCloseFilter }: SearchBarProps) => {
  {
    const { selectedFilters, deleteFilter } = useFilterStore();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const displayedFilters = selectedFilters.slice(0, 3);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);
    const onClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    };

    const handleFocus = () => {
      onFocus();
    };

    const onSearch = () => {
      if (query.trim()) {
        const filters =
          selectedFilters.length > 0
            ? `&filters=${selectedFilters.map((filter) => (filter === "C#" ? encodeURIComponent(filter) : filter)).join(",")}`
            : "";

        navigate(`/search/${encodeURIComponent(query)}${filters}`);
        onCloseFilter();
      } else {
        alert("검색어를 입력해주세요.");
      }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch();
      }
    };

    return (
      <div className="w-full">
        <div className="relative flex w-full items-center">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="h-11 flex-1 rounded-[50px] border border-lightgray pr-10 text-12 md:text-16"
            onFocus={handleFocus}
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={inputRef}
            onClick={onClick}
          />
          <button
            onClick={() => {
              onSearch();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform"
          >
            <IoMdSearch className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-wrap">
          {displayedFilters.map((filter) => (
            <div key={filter} className="mr-2 mt-2 flex items-center rounded bg-lightgray px-2 py-1 text-12">
              <span>{filter}</span>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  deleteFilter(filter);
                }}
                className="ml-2"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
