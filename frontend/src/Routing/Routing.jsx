import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

function Routing() {
  const params = useParams();

  const [URLSearchParams, SetURLSearchParams] = useSearchParams();

  return (
    <div>
      <div>Routing</div>
      <h1>ROUTE Params-{JSON.stringify(params)}</h1>
      <h1>Search Params-{URLSearchParams.get("search")}</h1>
      <input
        type="text"
        placeholder="Enter search query"
        onChange={(e) => SetURLSearchParams({ search: e.target.value })}
      ></input>
    </div>
  );
}

export default Routing;
