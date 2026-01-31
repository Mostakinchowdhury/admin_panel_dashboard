// components/LoadingLoader.tsx
'use client'
import React from 'react'

type Props = {
  text?: string
  sizeClass?: string // Tailwind text size e.g. "text-6xl lg:text-9xl"
  gradient?: string // css gradient or image+gradient like "url('/bg.jpg'), linear-gradient(...)"
  className?: string
  delayStep?: number // seconds between letters
}

export function LoadingLoader({
  text = 'LOADING...',
  sizeClass = 'md:text-6xl lg:text-9xl text-4xl',
  // default gradient (orange -> yellow). If you want an image behind text, pass:
  // "url('/your.jpg'), linear-gradient(90deg,#ff8a00,#ffd200)"
  gradient = 'linear-gradient(90deg,#ff8a00 0%,#ffd200 60%)',
  className = '',
  delayStep = 0.08
}: Props) {
  const letters = Array.from(text)

  return (
    <div
      className={`h-screen w-full flex justify-center items-center gap-3 font-extrabold tracking-wider ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex items-center ${sizeClass} leading-none`}
        style={{ display: 'flex', gap: '0.2ch' }}
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            className="loader-letter inline-block"
            // inline CSS variable --i used in the CSS for delay calc
            style={
              {
                // set the CSS var for this letter's index (used to stagger animation)
                // and set background-image for bg-clip:text
                // note: we set both backgroundImage and backgroundSize so the clip works
                ['--i' as any]: i,
                backgroundImage: gradient,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              } as React.CSSProperties
            }
          >
            {ch}
          </span>
        ))}
      </div>

      <style jsx>{`
        .loader-letter {
          /* animation */
          animation-name: letter-bounce;
          animation-duration: 700ms;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
          /* stagger by index: animation-delay = i * delayStep */
          animation-delay: calc(var(--i) * ${delayStep}s);
          will-change: transform, filter;
          display: inline-block;
          transform-origin: 50% 100%;
          /* subtle 3D pop */
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
          /* For smoother text clip on some browsers */
          -webkit-font-smoothing: antialiased;
        }

        /* small scale pulsing after the initial bounce to keep it alive */
        .loader-letter {
          animation-iteration-count: infinite;
        }

        @keyframes letter-bounce {
          0% {
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
            opacity: 0;
          }
          20% {
            transform: translateY(-36px) scale(1.05);
            opacity: 1;
          }
          40% {
            transform: translateY(0) scale(0.98);
            opacity: 1;
          }
          60% {
            transform: translateY(-12px) scale(1.02);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        /* optional subtle repeating shimmer for the whole word after animation finished */
        /* you can remove this block if you don't want shimmer */
        .loader-letter:nth-child(n) {
          animation-fill-mode: both;
        }

        /* accessibility: reduce motion users */
        @media (prefers-reduced-motion: reduce) {
          .loader-letter {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export const loading = () => {
  return <LoadingLoader />
}

export const Blurload = ({ text }: { text?: string }) => {
  const loadtext = text || 'loading...'
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex items-center justify-center">
      <LoadingLoader text={loadtext} />
    </div>
  )
}

export default Blurload
