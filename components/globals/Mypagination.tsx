'use client';
import { Dispatch, SetStateAction } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { Button } from '../ui/button';

export default function Mypagination({
  page,
  setpage,
  totalpages,
}: {
  page: number;
  setpage: Dispatch<SetStateAction<number>>;
  totalpages: number;
}) {
  page = Number(page);
  totalpages = Number(totalpages);
  const ldot = totalpages > 5 && page >= 4;
  const rdot =
    (totalpages > 3 && page <= 2) ||
    (totalpages > 4 && page <= 3) ||
    (totalpages > 5 && page + 2 < totalpages);

  if (totalpages == 0) {
    return <></>;
  }
  return (
    <section className="flex items-center gap-2 md:gap-3 justify-center flex-wrap mx-auto py-4">
      {/* previous link */}
      {page > 1 && (
        <Button
          className="manrope text-sm font-bold bg-muted hover:bg-muted/80 text-foreground border border-border/50 rounded-xl px-4 transition-all active:scale-95"
          onClick={() => setpage(pre => Math.max(1, pre - 1))}
        >
          <MdSkipPrevious className="w-4 h-4" />
          <span>Previous</span>
        </Button>
      )}

      <div className="flex items-center gap-2">
        {totalpages > 1 &&
          (totalpages > 2 ? (
            Array(2)
              .fill(0)
              .map((_, i) => (
                <Button
                  key={i + 1}
                  className={`manrope size-10 font-bold rounded-xl transition-all active:scale-95 ${
                    page == i + 1
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-white dark:bg-card text-font1 border dark:border-border/50 hover:bg-secondary'
                  }`}
                  onClick={() => setpage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))
          ) : (
            <Button
              className={`manrope size-10 font-bold rounded-xl transition-all active:scale-95 ${
                page == 1
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white dark:bg-card text-font1 border dark:border-border/50 hover:bg-secondary'
              }`}
              onClick={() => setpage(1)}
            >
              1
            </Button>
          ))}

        {page >= 2 && page <= 3 && totalpages > 4 && (
          <Button
            className="manrope size-10 font-bold rounded-xl bg-white dark:bg-card text-font1 border dark:border-border/50 hover:bg-secondary transition-all active:scale-95"
            onClick={() => setpage(3)}
          >
            3
          </Button>
        )}

        {page == 3 && totalpages > 5 && (
          <Button
            className="manrope size-10 font-bold rounded-xl bg-white dark:bg-card text-font1 border dark:border-border/50 hover:bg-secondary transition-all active:scale-95"
            onClick={() => setpage(4)}
          >
            4
          </Button>
        )}

        {ldot && (
          <div className="flex items-center justify-center size-10 text-font2">
            <BsThreeDots />
          </div>
        )}

        {ldot &&
          rdot &&
          [page, page + 1, page + 2].map(i => (
            <Button
              key={i}
              className={`manrope size-10 font-bold rounded-xl transition-all active:scale-95 ${
                i == page
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white dark:bg-card text-font1 border dark:border-border/50 hover:bg-secondary'
              }`}
              onClick={() => setpage(i)}
            >
              {i}
            </Button>
          ))}

        {ldot &&
          !rdot &&
          totalpages > 4 &&
          [totalpages - 2, totalpages - 1].map(i => (
            <Button
              key={i}
              className={`manrope size-10 font-bold rounded-xl transition-all active:scale-95 ${
                i == page
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white dark:bg-card text-font1 border dark:border-border/50 hover:bg-secondary'
              }`}
              onClick={() => setpage(i)}
            >
              {i}
            </Button>
          ))}

        {rdot && (
          <div className="flex items-center justify-center size-10 text-font2">
            <BsThreeDots />
          </div>
        )}

        {totalpages > 0 && (
          <Button
            className={`manrope size-10 font-bold rounded-xl transition-all active:scale-95 ${
              page == totalpages
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white dark:bg-card text-font1 border dark:border-border/50 hover:bg-secondary'
            }`}
            onClick={() => setpage(totalpages)}
          >
            {totalpages}
          </Button>
        )}
      </div>

      {page != totalpages && (
        <Button
          className="manrope text-sm font-bold bg-primary hover:bg-primary/90 text-white rounded-xl px-4 transition-all active:scale-95 shadow-lg shadow-primary/20"
          onClick={() => setpage(pre => Math.min(totalpages, pre + 1))}
        >
          <span>Next</span>
          <MdSkipNext className="w-4 h-4" />
        </Button>
      )}
    </section>
  );
}
