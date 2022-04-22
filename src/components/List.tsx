const listOfItems = [
  {
    title: "react",
    url: "https://github.com/gautham-g-nayak",
    createdAt: "2022-09-02",
    num_comments: 12,
    objectId: 1,
  },
  {
    title: "TypeScript",
    url: "https://github.com/gautham-g-nayak",
    createdAt: "2022-04-19",
    num_comments: 1,
    objectId: 2,
  },
];

const List = () => {
  return (
    <div>
      <ul>
        <li>{listOfItems[0].title}</li>
        <li>{listOfItems[0].url}</li>
      </ul>
    </div>
  );
};

export default List;
