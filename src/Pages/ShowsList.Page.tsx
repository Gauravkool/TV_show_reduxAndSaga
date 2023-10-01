import { FC, useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { Show } from "../models/Show";
import { ShowsLoadedAction, ShowsQueryChangeAction } from "../actions/Shows";
import { searchShows } from "../api";
import { connect } from "react-redux";
import { State } from "../store";
import { showsQuerySelector, showsSelector } from "../selectors/Shows";

type ShowListPageProps = {
  shows: Show[];
  query: string;
  showsLoaded: (shows: Show[]) => void;
  showsQueryChnage: (query: string) => void;
};
const ShowListPage: FC<ShowListPageProps> = ({
  showsLoaded,
  query,
  shows,
  showsQueryChnage,
}) => {
  useEffect(() => {
    searchShows(query).then((shows) => showsLoaded(shows));
  }, [query]);
  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          showsQueryChnage(event.target.value);
        }}
      />
      <div className="flex flex-wrap justify-center">
        {shows.map((s) => (
          <ShowCard key={s.id} show={s}></ShowCard>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state: State) => {
  return { query: showsQuerySelector(state), shows: showsSelector(state) };
};

const mapDispatchToProps = {
  showsLoaded: ShowsLoadedAction,
  showsQueryChnage: ShowsQueryChangeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowListPage);
