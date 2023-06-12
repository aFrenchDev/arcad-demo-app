import React from "react";

export default function Loading() {

  document.title = "Loading...";

  return (
    <div className="building-view">
      <h1>Loading...</h1>
      <img src="images/loading-icon.svg" alt="Loading icon"></img>
    </div>
  );
}