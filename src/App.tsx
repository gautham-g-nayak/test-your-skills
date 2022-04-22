import "./App.css";
import List from "./components/List";
import Search from "./components/Search";
import logo from "./assets/logo.png";
import usePersistence from "./hooks/usePersistence";


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

function App() {
  const [searchText, setSearchText]: any = usePersistence(
    "searchTerm",
    "React"
  );

  function handleChange(event: any) {
    setSearchText(event.target.value);
  }

  const filteredList = listOfItems.filter((item: any) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <nav>
        <div className="heading">
          <h1>{title}</h1>
          <img src={logo} />
        </div>
        <Search searchText={searchText} onChange={handleChange}>
          Search
        </Search>
      </nav>
      <List listOfItems={filteredList} />
    </div>
  );
}

export default App;

