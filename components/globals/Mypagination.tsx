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
    <section className="flex items-center gap-2.5 md:gap-3 justify-center  flex-wrap mx-auto">
      {/* previous link */}
      {page > 1 && (
        <Button
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-green-500 bg-amber-400
        }`}
          onClick={() => setpage(pre => Math.max(1, pre - 1))}
        >
          <MdSkipPrevious />
          Previous
        </Button>
      )}
      {/* 1 or 1 to 2 */}

      {totalpages > 1 &&
        (totalpages > 2 ? (
          Array(2)
            .fill(0)
            .map((_, i) => (
              <Button
                key={i + 1}
                className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 ${
                  page == i + 1 ? 'bg-green-600' : 'bg-primary'
                }`}
                onClick={() => setpage(i + 1)}
              >
                {i + 1}
              </Button>
            ))
        ) : (
          <Button
            className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 ${
              page == 1 ? 'bg-green-600' : 'bg-primary'
            }
        }`}
            onClick={() => setpage(1)}
          >
            1
          </Button>
        ))}
      {/* 3 by condition */}
      {page >= 2 && page <= 3 && totalpages > 4 && (
        <Button
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 bg-primary`}
          onClick={() => setpage(3)}
        >
          3
        </Button>
      )}
      {/* 4 by condition */}
      {page == 3 && totalpages > 5 && (
        <Button
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 bg-primary`}
          onClick={() => setpage(4)}
        >
          4
        </Button>
      )}
      {ldot && (
        <Button
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-black bg-orange-800`}
        >
          <BsThreeDots />
        </Button>
      )}
      {ldot &&
        rdot &&
        [page, page + 1, page + 2].map(i => (
          <Button
            key={i}
            className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 ${
              i == page ? 'bg-green-500' : 'bg-primary'
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
            className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 ${
              i == page ? 'bg-green-500' : 'bg-primary'
            }`}
            onClick={() => setpage(i)}
          >
            {i}
          </Button>
        ))}
      {rdot && (
        <Button
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-black bg-orange-800`}
        >
          <BsThreeDots />
        </Button>
      )}
      {totalpages > 0 && (
        <Button
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 bg-primary ${
            page == totalpages ? 'bg-green-500' : 'bg-primary'
          }
        }`}
          onClick={() => setpage(totalpages)}
        >
          {totalpages}
        </Button>
      )}
      {page != totalpages && (
        <Button
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-green-500 bg-amber-400
        }`}
          onClick={() => setpage(pre => Math.min(totalpages, pre + 1))}
        >
          Next <MdSkipNext />
        </Button>
      )}
    </section>
  );
}
