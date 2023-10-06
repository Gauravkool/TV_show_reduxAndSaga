import { FC, useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { Show } from "../models/Show";
import { showsQueryChangeAction } from "../slices/Shows";
import { ConnectedProps, connect } from "react-redux";
import { State } from "../store";
import {
  showsLoadingSelector,
  showsQuerySelector,
  showsSelector,
} from "../selectors/Shows";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowListPageProps = {} & ReduxProps;
const ShowListPage: FC<ShowListPageProps> = ({
  query,
  shows,
  queryChange,
  loading,
}) => {
  return (
    <div className="mt-2">
      <div className="flex items-center">
        <SearchBar
          value={query}
          onChange={(event) => {
            queryChange(event.target.value);
          }}
        />
        {loading && <LoadingSpinner className="ml-2" />}
      </div>
      <div className="flex flex-wrap justify-center">
        {shows && shows.map((s) => <ShowCard key={s.id} show={s}></ShowCard>)}
      </div>
    </div>
  );
};
const mapStateToProps = (state: State) => {
  return {
    query: showsQuerySelector(state),
    shows: showsSelector(state),
    loading: showsLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  queryChange: showsQueryChangeAction,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
