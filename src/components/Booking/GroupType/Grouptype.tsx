"use client";

import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

export type GroupType = {
  id: number;
  code: string;
  name: string;
};

type Props = {
  groups: GroupType[];
  selectedId: number | null;
  onChange: (id: number) => void;
};

export default function GroupTypeSelect({
  groups,
  selectedId,
  onChange,
}: Props) {
  const selectedGroup = groups.find(
    (g) => Number(g.id) === Number(selectedId)
  );

  return (
    <div className="mb-8">
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        Group Type
      </label>

      <Listbox value={selectedId} onChange={onChange}>
        <div className="relative">
          {/* BUTTON */}
          <Listbox.Button className="flex h-14 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-5 text-left">
            <span className="truncate">
              {selectedGroup?.name ?? "Select group type"}
            </span>

            <ChevronDown size={18} />
          </Listbox.Button>

          {/* OPTIONS */}
          <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border bg-white shadow-lg">
            {groups.map((group) => (
              <Listbox.Option
                key={group.id}
                value={group.id}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-3 ${
                    active ? "bg-gray-100" : ""
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>{group.name}</span>

                    {selected && <Check size={16} className="text-green-600" />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}