'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface LockKeyholeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LockKeyholeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LockKeyholeIcon = forwardRef<LockKeyholeIconHandle, LockKeyholeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="normal"
          variants={{
            normal: {
              rotate: 0,
              scale: 1,
            },
            animate: {
              rotate: [-3, 1, -2, 0],
              scale: [0.95, 1.05, 0.98, 1],
            },
          }}
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
          }}
          animate={controls}
        >
          <circle cx="12" cy="16" r="1" />
          <rect x="3" y="10" width="18" height="12" rx="2" />
          <motion.path
            d="M7 10V7a5 5 0 0 1 10 0v3"
            initial="normal"
            variants={{
              normal: {
                pathLength: 1,
              },
              animate: {
                pathLength: 0.7,
              },
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            animate={controls}
          />
        </motion.svg>
      </div>
    );
  }
);

LockKeyholeIcon.displayName = 'LockKeyholeIcon';

export { LockKeyholeIcon };
