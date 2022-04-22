import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import logo from "./assets/logo.png";
import usePersistence from "./hooks/usePersistence";
import React, { useEffect, useState } from "react";
import { StoryType } from "./types";

const title = "React Training";

const listOfItems = [
  {
    title: "react",
    url: "https://github.com/gautham-g-nayak",
    created_at: "2022-09-02",
    author: "grey-area",
    points: 1107,
    num_comments: 12,
    objectID: 1,
  },
  {
    title: "TypeScript",
    url: "https://github.com/gautham-g-nayak",
    created_at: "2022-04-19",
    author: "grey-area",
    points: 6107,
    num_comments: 1,
    objectID: 2,
  },
  {
    created_at: "2022-04-19",
    title: "Redux",
    url: "https://github.com/gautham-g-nayak",
    author: "grey-area",
    points: 407,
    num_comments: 830,
    objectID: 3,
  },
  {
    created_at: "2022-09-02",
    title: "Google",
    url: "https://github.com/gautham-g-nayak",
    author: "grey-area",
    points: 103,
    num_comments: 70,
    objectID: 4,
  },
];

function getAsyncData() {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve({ data: listOfItems }), 3000)
  );
}

function App(): JSX.Element {
  const [searchText, setSearchText] = usePersistence("searchTerm", "React");
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAsyncData()
      .finally(() => setIsLoading(false))
      .then((value: any) => setStories(value.data))
      .catch((e) => setIsError(true));
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleDeleteClick(objectId: number) {
    const newListOfItems = stories.filter(
      (story: StoryType) => story.objectID !== objectId
    );
    setStories(newListOfItems);
  }

  const filteredList = stories.filter((item: StoryType) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isError) {
    return (
      <h1 style={{ marginTop: "10rem", color: " red" }}>
        Something went wrong
      </h1>
    );
  }

  return (
    <div>
      <nav>
        <div className="heading">
          <h1>{title}</h1>
          <img src={logo} />
        </div>
        <InputWithLabel
          searchText={searchText}
          onChange={handleChange}
          id="searchBox"
        >
          Search
        </InputWithLabel>
      </nav>
      {isLoading ? (
        <h1 style={{ marginTop: "10rem" }}>Loading</h1>
      ) : (
        <List listOfItems={filteredList} onClickDelete={handleDeleteClick} />
      )}
    </div>
  );
}

export default App;
