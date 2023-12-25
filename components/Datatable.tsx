"use client";

import Checkbox from "./Checkbox";
import { useState } from "react";
import OutlinedButton from "./buttons/OutlinedButton";
import { Button } from "./ui/button";
import Text from "./Text";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import SortPopover from "./SortPopover";
import Input from "./Input";
import FilledButton from "./buttons/FilledButton";
import AddViewDialog from "./AddViewDialog";
import SortableHeader from "./SortableHeader";
import AddFilterPopover from "./AddFilterPopover";
import {
  FilterElements,
  View,
  HeaderItem,
  SortKey,
  RowComponent,
  DataItem,
  ActionCardComponent,
  SortPopoverProps,
} from "@/types/Datatable";

export default function Datatable<T extends DataItem>({
  initialItems,
  sortPopoverProps,
  ActionsCard,
  Row,
  headerItems,
  views,
  filters,
}: {
  initialItems: T[];
  headerItems: HeaderItem<T>[];
  ActionsCard: ActionCardComponent<T>;
  sortPopoverProps: SortPopoverProps;
  Row: RowComponent<T>;
  views: View[];
  filters: FilterElements;
}) {
  const [selectedView, setSelectedView] = useState<View>("all");
  const [activeFilters, setActiveFilters] = useState<FilterElements>({});

  const [items, setItems] = useState<T[]>(initialItems);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [currentSortKey, setCurrentSortKey] = useState<SortKey>("asc");

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-hidden">
      <div className=" flex justify-between items-start min-w-full w-full px-2 py-1">
        {isSearching ? (
          <div className="flex mr-2 flex-col w-full">
            <div className="flex items-center w-full">
              <Input
                id="search"
                placeholder="Searching all products"
                value={search}
                className="border-blue-500"
                icon={<IoSearchOutline size={16} className="text-gray-800" />}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="w-4" />
              <Button
                variant="ghost"
                className="px-2 mr-2 h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                onClick={() => setIsSearching(false)}
              >
                Cancel
              </Button>
              <FilledButton>Save as</FilledButton>
            </div>

            <div className="flex flex-col"></div>

            <div className="w-full border-t border-gray-300 pt-2 mt-2 mb-1 flex gap-1">
              {Object.entries(activeFilters).map(([_, element]) => element)}

              <AddFilterPopover
                filters={Object.keys(filters)}
                disabled={Object.keys(activeFilters)}
                onSelect={(f) => {
                  setActiveFilters({ ...activeFilters, [f]: filters[f] });
                }}
              />

              <Button
                variant="ghost"
                className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                onClick={() => setActiveFilters({})}
              >
                Clear all
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex mr-2 w-full justify-between items-center">
            <div className="flex gap-2 items-center">
              {views.map((v) => (
                <Button
                  key={v}
                  variant="ghost"
                  className={`hover:bg-gray-200/75 px-3 py-1.5 h-min ${
                    v === selectedView ? "bg-gray-200" : "bg-transparent"
                  }`}
                  onClick={() => setSelectedView(v)}
                >
                  <Text className="text-gray-800 capitalize">{v}</Text>
                </Button>
              ))}
              <AddViewDialog onSave={(name) => {}} />
            </div>

            <OutlinedButton
              className="p-1.5 flex gap-0.5"
              onClick={() => setIsSearching(true)}
            >
              <IoSearchOutline size={16} className="text-black" />
              <MdOutlineFilterList size={20} className="text-black" />
            </OutlinedButton>
          </div>
        )}

        <SortPopover {...sortPopoverProps} />
      </div>

      <div className="w-full bg-white hidden md:block">
        <table className="w-full bg-white text-sm text-left overflow-y-scroll rtl:text-right text-gray-500 ">
          <thead
            className={`text-[10px] text-gray-700 uppercase border-t-2 border-b-2 ${
              selectedItems.length > 0 ? "bg-white" : "bg-gray-100"
            }`}
          >
            <tr>
              <th scope="col" className="px-4 relative">
                <Text
                  className={`absolute whitespace-nowrap z-10 top-1 left-12 ${
                    selectedItems.length > 0 ? "" : "hidden"
                  }`}
                >
                  {selectedItems.reduce((acc, p) => (p ? acc + 1 : acc), 0)}{" "}
                  SELECTED
                </Text>
                <Checkbox
                  id="select-all-items"
                  checked={selectedItems.length > 0}
                  onChange={(e) => {
                    if (
                      e.target.checked &&
                      selectedItems.length < initialItems.length
                    ) {
                      setSelectedItems([...initialItems]);
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </th>
              {headerItems.map((h) => (
                <th
                  key={h.label}
                  scope="col"
                  className={`px-6 py-1 ${
                    selectedItems.length > 0 ? "opacity-0 cursor-default" : ""
                  }`}
                >
                  {h.sortable ? (
                    <SortableHeader
                      header={h}
                      sortKey={currentSortKey}
                      setSortKey={setCurrentSortKey}
                      onSort={(sortedItems) => setItems(sortedItems)}
                    />
                  ) : (
                    h.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-xs">
            {items.map((item, index) => (
              <Row
                key={item._id}
                item={item}
                view={selectedView}
                filterElements={filters}
                index={index}
                isSelected={
                  !!selectedItems.find((_item) => _item._id === item._id)
                }
                setSelected={(b) => {
                  if (b) {
                    setSelectedItems([...selectedItems, item]);
                  } else {
                    setSelectedItems(
                      selectedItems.filter((_item) => _item._id !== item._id)
                    );
                  }
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedItems.length > 0 && (
        <ActionsCard selectedItems={selectedItems} />
      )}
    </div>
  );
}
