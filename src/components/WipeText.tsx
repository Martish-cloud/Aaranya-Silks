import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';

const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface WipeTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  direction?: 'left-to-right' | 'bottom-to-top' | 'diagonal';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const WipeText: React.FC<WipeTextProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  direction = 'left-to-right',
  delay = 0,
  duration = 0.85,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: '-60px 0px -60px 0px',
    amount: 0.2,
    once,
  });
  const shouldReduceMotion = useReducedMotion();

  // Define directional clip-path coordinates
  const getVariants = (): Variants => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 1, clipPath: 'none', y: 0 },
        visible: { opacity: 1, clipPath: 'none', y: 0 },
        exit: { opacity: 1, clipPath: 'none', y: 0 },
      };
    }

    if (direction === 'bottom-to-top') {
      return {
        hidden: {
          opacity: 0,
          clipPath: 'inset(100% 0 0% 0)',
          y: 20,
        },
        visible: {
          opacity: 1,
          clipPath: 'inset(0% 0 0% 0)',
          y: 0,
          transition: {
            duration,
            delay,
            ease: LUXURY_EASE,
          },
        },
        exit: {
          opacity: 0.3,
          clipPath: 'inset(0% 0 100% 0)',
          y: -10,
          transition: {
            duration: duration * 0.7,
            ease: LUXURY_EASE,
          },
        },
      };
    }

    if (direction === 'diagonal') {
      return {
        hidden: {
          opacity: 0,
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          x: -15,
        },
        visible: {
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          x: 0,
          transition: {
            duration,
            delay,
            ease: LUXURY_EASE,
          },
        },
        exit: {
          opacity: 0.3,
          clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          x: 15,
          transition: {
            duration: duration * 0.7,
            ease: LUXURY_EASE,
          },
        },
      };
    }

    // Default: left-to-right cinematic horizontal mask wipe
    return {
      hidden: {
        opacity: 0,
        clipPath: 'inset(0 100% 0 0)',
        x: -12,
      },
      visible: {
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        x: 0,
        transition: {
          duration,
          delay,
          ease: LUXURY_EASE,
        },
      },
      exit: {
        opacity: 0.25,
        clipPath: 'inset(0 0 0 100%)',
        x: 12,
        transition: {
          duration: duration * 0.7,
          ease: LUXURY_EASE,
        },
      },
    };
  };

  const variants = getVariants();

  return (
    <div ref={ref} className="overflow-hidden inline-block align-top max-w-full">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'exit'}
        variants={variants}
        className="will-change-transform will-change-[clip-path]"
      >
        <Component className={className}>{children}</Component>
      </motion.div>
    </div>
  );
};
