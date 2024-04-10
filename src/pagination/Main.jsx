import { useEffect, useState } from "react";
import axios from "axios";

function Main() {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      setPosts(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.floor(posts.length / perPage));
  }, [posts]);

  function outOfBounds(index) {
    console.log(pageNumber);
    if (
      index < pageNumber - 1 * perPage - 1 ||
      index > pageNumber * perPage - 1
    )
      return true;
    else return false;
  }

  return (
    <>
      <h2>Pagination</h2>
      <div className="posts">
        {posts.map((post, index) => {
          if (outOfBounds(index)) return;
          return (
            <div className="post" key={index}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {pageNumber > 1 ? (
          <button onClick={() => setPageNumber(pageNumber - 1)}>
            Previous
          </button>
        ) : (
          ""
        )}
        {pageNumber <= totalPages ? (
          <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Main;
