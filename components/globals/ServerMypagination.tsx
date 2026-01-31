import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { Button } from '../ui/button';

export default function ServerMypagination({
  page,
  totalpages,
  from = 'menu',
}: {
  page: number;
  totalpages: number;
  from?: string;
}) {
  const fromVal = from || 'menu';
  const pageNum = Number(page);
  const totalPagesNum = Number(totalpages);
  const ldot = totalPagesNum > 5 && pageNum >= 4;
  const rdot =
    (totalPagesNum > 3 && pageNum <= 2) ||
    (totalPagesNum > 4 && pageNum <= 3) ||
    (totalPagesNum > 5 && pageNum + 2 < totalPagesNum);

  if (totalPagesNum == 0) {
    return <></>;
  }

  return (
    <section className="flex items-center gap-2.5 md:gap-3 justify-center flex-wrap mx-auto">
      {/* previous link */}
      {pageNum > 1 && (
        <Button
          asChild
          className="manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-green-500 bg-amber-400"
        >
          <Link href={`/${fromVal}?page=${Math.max(1, pageNum - 1)}`}>
            <MdSkipPrevious />
            Previous
          </Link>
        </Button>
      )}
      {/* 1 or 1 to 2 */}

      {totalPagesNum > 1 &&
        (totalPagesNum > 2 ? (
          Array(2)
            .fill(0)
            .map((_, i) => (
              <Button
                key={i + 1}
                asChild
                className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 ${
                  pageNum == i + 1 ? 'bg-green-600' : 'bg-primary'
                }`}
              >
                <Link href={`/${fromVal}?page=${i + 1}`}>{i + 1}</Link>
              </Button>
            ))
        ) : (
          <Button
            asChild
            className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 ${
              pageNum == 1 ? 'bg-green-600' : 'bg-primary'
            }`}
          >
            <Link href={`/${fromVal}?page=1`}>1</Link>
          </Button>
        ))}
      {/* 3 by condition */}
      {pageNum >= 2 && pageNum <= 3 && totalPagesNum > 4 && (
        <Button
          asChild
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 ${
            pageNum == 3 ? 'bg-green-600' : 'bg-primary'
          }`}
        >
          <Link href={`/${fromVal}?page=3`}>3</Link>
        </Button>
      )}
      {/* 4 by condition */}
      {pageNum == 3 && totalPagesNum > 5 && (
        <Button
          asChild
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 ${
            pageNum == 4 ? 'bg-green-600' : 'bg-primary'
          }`}
        >
          <Link href={`/${fromVal}?page=4`}>4</Link>
        </Button>
      )}
      {ldot && (
        <Button className="manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-black bg-orange-800">
          <BsThreeDots />
        </Button>
      )}
      {ldot &&
        rdot &&
        [pageNum, pageNum + 1, pageNum + 2].map(i => (
          <Button
            key={i}
            asChild
            className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 ${
              pageNum == i ? 'bg-green-600' : 'bg-primary'
            }`}
          >
            <Link href={`/${fromVal}?page=${i}`}>{i}</Link>
          </Button>
        ))}
      {ldot &&
        !rdot &&
        totalPagesNum > 4 &&
        [totalPagesNum - 2, totalPagesNum - 1].map(i => (
          <Button
            key={i}
            asChild
            className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 ${
              pageNum == i ? 'bg-green-600' : 'bg-primary'
            }`}
          >
            <Link href={`/${fromVal}?page=${i}`}>{i}</Link>
          </Button>
        ))}
      {rdot && (
        <Button className="manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-black bg-orange-800">
          <BsThreeDots />
        </Button>
      )}
      {totalPagesNum > 0 && (
        <Button
          asChild
          className={`manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-blue-600 ${
            pageNum == totalPagesNum ? 'bg-green-500' : 'bg-primary'
          }`}
        >
          <Link href={`/${fromVal}?page=${totalPagesNum}`}>
            {totalPagesNum}
          </Link>
        </Button>
      )}
      {pageNum != totalPagesNum && (
        <Button
          asChild
          className="manrope txtstlh3 font-extrabold text-white focus-visible:ring-0 focus:ring-0 hover:bg-green-500 bg-amber-400"
        >
          <Link
            href={`/${fromVal}?page=${Math.min(totalPagesNum, pageNum + 1)}`}
          >
            Next <MdSkipNext />
          </Link>
        </Button>
      )}
    </section>
  );
}
