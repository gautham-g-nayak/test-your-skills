import React from "react";
import "./List.css";
import Item from "./Item";
import { StoryType } from "../types";
import { useState } from "react";
import usePersistence from "../hooks/usePersistence";

type ListProps = {
  listOfItems: Array<StoryType>;
};

const SORT_COLUMNS = {
  title: (a: StoryType, b: StoryType) => a?.title?.localeCompare(b?.title),
  url: (a: StoryType, b: StoryType) => a?.url?.localeCompare(b?.url),
  author: (a: StoryType, b: StoryType) => a?.author?.localeCompare(b?.author),
};

const List = ({ listOfItems }: ListProps) => {
  const [sortDirection, setSortDirection] = usePersistence("sortDirection", "true");
  const [sortColumnName, setSortColumnName] = usePersistence("sortColumnName", "title");
  const [sortedList, setSortedList] = useState({ data: sortDirection === "true" ? listOfItems.sort(sortByColumn(sortColumnName)).reverse() :listOfItems.sort(sortByColumn(sortColumnName)), flag: sortDirection === "false" ? true : false });


  function sortByColumn(column: string) {
    switch (column) {
      case "title": return (a: StoryType, b: StoryType) => a?.title?.localeCompare(b?.title);
      case "url": return (a: StoryType, b: StoryType) => a?.url?.localeCompare(b?.url);
      case "author": return (a: StoryType, b: StoryType) => a?.author?.localeCompare(b?.author);
    }
  }


  function handleSort(column: "title" | "url" | "author") {
    const sortedListOfItems = { data: sortDirection === "true" ? [...sortedList.data.sort(SORT_COLUMNS[column])] : [...sortedList.data.sort(SORT_COLUMNS[column])].reverse(), flag: !sortedList.flag };
    setSortDirection(sortedList.flag.toString() === "true" ? "true" : "false");
    setSortColumnName(column);
    setSortedList(sortedListOfItems);
  }

  return (
    <div>
      <h4 style={{ marginTop: 100 }}>{sortDirection === "" ? " " : sortDirection === "false" ? " ↑ Ascending  " : " ↓ Descending  "}({sortColumnName})</h4>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("url")}>URL</th>
            <th onClick={() => handleSort("author")}>Author</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.data.map((item) => (
            <Item key={item.objectID} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(List);
