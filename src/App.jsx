import { AddPost } from "./components/AddPost";
import { FetchPost } from "./components/FetchPost";

const App = () => {
  return (
    <div className="flex justify-center items-start m-32  min-h-screen">
      <div className="flex flex-col">
        <AddPost />
        <FetchPost />
      </div>
    </div>
  );
};

export default App;
