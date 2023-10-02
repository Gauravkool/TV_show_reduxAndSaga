import { FC, useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { Show } from "../models/Show";
import { ShowsQueryChangeAction } from "../actions/Shows";
import { ConnectedProps, connect } from "react-redux";
import { State } from "../store";
import { showsQuerySelector, showsSelector } from "../selectors/Shows";

type ShowListPageProps = {} & ReduxProps;
const ShowListPage: FC<ShowListPageProps> = ({ query, shows, queryChange }) => {
  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          queryChange(event.target.value);
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
  queryChange: ShowsQueryChangeAction,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
