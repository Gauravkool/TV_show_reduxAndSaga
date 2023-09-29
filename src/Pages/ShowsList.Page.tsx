import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { serachShow } from "../api";
import { Show } from "../models/Show";

function ShowListPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    serachShow(query).then((shows) => setShows(shows));
  }, [query]);
  return (
    <div className="mt-2">
      <SearchBar />
      <div className="flex flex-wrap justify-center">
        {shows.map(s=><ShowCard show={s}></ShowCard>)}
      </div>
    </div>
  );
}

export default ShowListPage;
