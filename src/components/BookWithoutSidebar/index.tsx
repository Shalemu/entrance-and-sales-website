"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";

import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import CustomSelect from "../ShopWithSidebar/CustomSelect";

import servicesData from "../Shop/shopData"; // rename your data file later if possible

const ServicesWithoutSidebar = () => {
  const [serviceStyle, setServiceStyle] = useState("grid");

  const options = [
    { label: "Latest Services", value: "0" },
    { label: "Most Popular", value: "1" },
    { label: "Old Services", value: "2" },
  ];

  return (
    <>
      <Breadcrumb
        title={"Explore Our Services & Packages"}
        pages={["services", "/", "services without sidebar"]}
      />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            <div className="w-full">
              {/* Top Bar */}
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  {/* Left */}
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomSelect options={options} />

                    <p>
                      Showing <span className="text-dark">9 of 50</span>{" "}
                      Services
                    </p>
                  </div>

                  {/* Right (View toggle) */}
                  <div className="flex items-center gap-2.5">
                    {/* GRID BUTTON */}
                    <button
                      onClick={() => setServiceStyle("grid")}
                      aria-label="grid view"
                      className={`${
                        serviceStyle === "grid"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <path d="M4.836 1.3125C4.162..." />
                      </svg>
                    </button>

                    {/* LIST BUTTON */}
                    <button
                      onClick={() => setServiceStyle("list")}
                      aria-label="list view"
                      className={`${
                        serviceStyle === "list"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <path d="M4.4234 0.899903C3.749..." />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Services Grid/List */}
              <div
                className={`${
                  serviceStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }`}
              >
                {servicesData.map((item, key) =>
                  serviceStyle === "grid" ? (
                    <SingleGridItem item={item} key={key} />
                  ) : (
                    <SingleListItem item={item} key={key} />
                  )
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-15">
                <div className="bg-white shadow-1 rounded-md p-2">
                  <ul className="flex items-center">
                    <li>
                      <button
                        disabled
                        className="flex items-center justify-center w-8 h-9 rounded-[3px] disabled:text-gray-4"
                      >
                        <svg width="18" height="18">
                          <path d="M12.1782..." />
                        </svg>
                      </button>
                    </li>

                    <li>
                      <a className="flex py-1.5 px-3.5 bg-blue text-white rounded-[3px]">
                        1
                      </a>
                    </li>

                    <li><a className="flex py-1.5 px-3.5">2</a></li>
                    <li><a className="flex py-1.5 px-3.5">3</a></li>
                    <li><a className="flex py-1.5 px-3.5">4</a></li>
                    <li><a className="flex py-1.5 px-3.5">5</a></li>
                    <li><a className="flex py-1.5 px-3.5">...</a></li>
                    <li><a className="flex py-1.5 px-3.5">10</a></li>

                    <li>
                      <button className="flex items-center justify-center w-8 h-9 rounded-[3px] hover:bg-blue hover:text-white">
                        <svg width="18" height="18">
                          <path d="M5.82197..." />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesWithoutSidebar;