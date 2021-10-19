import React, { useEffect, useState } from "react";
import s from "./Paginator.module.css";

const Paginator = ({
  totalItemCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 20,
}) => {
  let pagesCount = Math.ceil(totalItemCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setportionNumber] = useState(
    Math.ceil(currentPage / portionSize)
  );
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  let nextPageSelect = () => {
    onPageChanged(portionNumber * portionSize + 1);
    setportionNumber(portionNumber + 1);
  };

  let previosPageSelect = () => {
    setportionNumber(portionNumber - 1);
    onPageChanged((portionNumber - 1) * portionSize);
  };

  useEffect(() => {
    setportionNumber(Math.ceil(currentPage / portionSize));
  }, [currentPage]);

  return (
    <div className={s.paginator}>
      <button
        disabled={portionNumber === 1}
        className={s.previos}
        onClick={previosPageSelect}
      >
        Previos
      </button>
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <button
              key={p}
              className={currentPage === p ? s.selectedPage : s.pageNumber}
              onClick={() => {
                onPageChanged(p);
              }}
            >
              {p}
            </button>
          );
        })}
      <button
        className={s.next}
        disabled={portionNumber === portionCount}
        onClick={nextPageSelect}
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
