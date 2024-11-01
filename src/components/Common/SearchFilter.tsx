import { DEV_DEPENDENCIES_LIST } from "@/constants";
import { GrPowerReset } from "react-icons/gr";
import { useFilterStore } from "@stores/searchFiltersStore";
export const SearchFilter = () => {
  const { selectedFilters, addFilter, deleteFilter, clearFilters } = useFilterStore();

  const handleFilterSelect = (item: string) => {
    if (selectedFilters.includes(item)) {
      deleteFilter(item);
    } else if (selectedFilters.length < 3) {
      addFilter(item);
    }
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <>
      <div className="absolute top-36 z-30 w-full bg-white-sub p-4 md:top-28">
        <div className="mx-auto max-w">
          <ul className="flex flex-wrap md:ml-8">
            {DEV_DEPENDENCIES_LIST.map((item) => (
              <li className="mb-2 mr-2" key={item}>
                <button
                  className={`lightgray-btn w-auto px-4 py-2 text-12 md:text-14 ${
                    selectedFilters.includes(item) ? "opacity-90" : ""
                  } ${
                    selectedFilters.length >= 3 && !selectedFilters.includes(item)
                      ? "cursor-not-allowed opacity-50"
                      : "hover:opacity-80"
                  }`}
                  onClick={() => handleFilterSelect(item)}
                  disabled={selectedFilters.length >= 3 && !selectedFilters.includes(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex md:ml-8">
            <button
              className="gray-btn mr-4 flex w-auto items-center px-4 py-2 text-12 hover:opacity-90 md:text-14"
              onClick={handleClearFilters}
            >
              <GrPowerReset className="mr-2" />
              초기화
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
