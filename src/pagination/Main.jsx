import { useEffect, useState } from "react";
import axios from "axios";
import "./main.css";

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
    setTotalPages(Math.ceil(posts.length / perPage));
  }, [posts]);

  function outOfBounds(index) {
    if (
      index < pageNumber - 1 * perPage-1 ||
      index >= pageNumber * perPage-1 
    ) {
      return true;
      } else {
        return false;
    }

  }

  return (
    <>
      <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-100 py-5">
        <div className="text-center bg-gradient-to-br from-red-300 to-orange-500 w-[12rem] sm:w-[15rem] text-slate-900 rounded-md m-auto">
          <h1 className="font-bold sm:text-3xl text-2xl  py-3">Pagination</h1>
        </div>
        <div className="posts flex flex-wrap gap-x-[3rem] gap-y-[2rem] items-center justify-center px-10 my-10">
          {posts.map((post, index) => {
            if (outOfBounds(index)) return;
            return (
              <div
                className="post bg-gradient-to-b from-blue-200 to-rose-200 h-[18rem] w-[16rem] p-5  shadow-lg shadow-gray-400 rounded-lg  overflow-hidden"
                key={index}
              >
                <h3 className="font-bold text-xl text-balance ">
                  {post.title}
                </h3>
                <p className="pt-3">{post.body}</p>
              </div>
            );
          })}
        </div>
        <div className="pagination text-center flex items-center justify-center gap-4">
          {pageNumber > 1 ? (
            <button
              className="text-white bg-gradient-to-br from-red-800 to-orange-300 px-5 py-[6px] rounded-3xl font-medium"
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Previous
            </button>
          ) : (
            ""
          )}
          {pageNumber <= totalPages ? (
            <button
              className=" text-white bg-gradient-to-br from-red-800 to-orange-300 px-5 py-[6px] rounded-3xl font-medium"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
export default Main;
