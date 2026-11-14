'use client';

import React, { useEffect, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ExpandableSearchBarProps = {
  expandDirection?: 'left' | 'right';
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  defaultOpen?: boolean;
  width?: number;
  children?: React.ReactNode;
  value?: string;
};

const COLLAPSED_SIZE = 40;

export default function ExpandableSearchBar(props: ExpandableSearchBarProps) {
  const {
    expandDirection = 'right',
    placeholder = 'Search...',
    onSearch,
    className = '',
    defaultOpen = false,
    width = 280,
    children,
    value: valueProp,
  } = props;

  const [open, setOpen] = useState(defaultOpen);
  const [innerValue, setInnerValue] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const currentValue = valueProp ?? innerValue;

  const inputPadding = expandDirection === 'right' ? 'pl-11' : 'pl-10';
  const placeholderLeft = expandDirection === 'right' ? 'left-11' : 'left-10';

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        open &&
        currentValue === ''
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, currentValue]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => {
        (
          inputRef.current ?? containerRef.current?.querySelector('input')
        )?.focus();
      }, 120);
      return () => clearTimeout(id);
    } else {
      setInnerValue('');
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        setInnerValue('');
      }

      if (e.key === 'Enter' && open && currentValue.trim()) {
        onSearch?.(currentValue);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, currentValue, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(currentValue);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', className)}
      style={{ width: COLLAPSED_SIZE, height: COLLAPSED_SIZE }}
    >
      <button
        type='button'
        aria-label={open ? 'Close search' : 'Open search'}
        onClick={() => setOpen((s) => !s)}
        className={cn(
          'absolute inset-0 z-20 grid place-items-center rounded-[13px] border',
          'bg-secondary text-black hover:text-black transition-colors',
          'dark:bg-secondary dark:text-black dark:hover:text-black cursor-pointer'
        )}
      >
        {open ? <X className='size-4' /> : <Search className='size-4' />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            key='form'
            onSubmit={handleSubmit}
            className={cn(
              'absolute top-0 h-[36] rounded-[15px] border bg-transparent backdrop-blur-3xl backdrop-brightness-100 backdrop-invert-70 backdrop-contrast-125 text-black shadow-sm overflow-hidden flex items-center',
              expandDirection === 'left' ? 'right-0' : 'left-0'
            )}
            initial={{ width: COLLAPSED_SIZE, opacity: 0.98 }}
            animate={{ width: width, opacity: 1 }}
            exit={{
              width: COLLAPSED_SIZE,
              opacity: 0,
              transition: { type: 'spring', stiffness: 260, damping: 26 },
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <span className='absolute left-3 z-10 text-white'>
              <Search className='size-4' />
            </span>

            <div className='relative flex-1 min-w-0 flex items-center'>
              {children ?? (
                <>
                  <input
                    ref={inputRef}
                    type='text'
                    value={innerValue}
                    onChange={(e) => setInnerValue(e.target.value)}
                    placeholder={placeholder}
                    className={cn(
                      'w-full bg-transparent text-sm outline-none placeholder-transparent whitespace-nowrap overflow-x-auto',
                      inputPadding
                    )}
                  />

                  <AnimatePresence>
                    {!innerValue && (
                      <motion.span
                        key='ph'
                        className={cn(
                          'pointer-events-none absolute top-1/2 -translate-y-1/2 w-full truncate text-black text-sm select-none text-left',
                          placeholderLeft
                        )}
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 0.9, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {placeholder}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            <AnimatePresence initial={false}>
              <motion.button
                key='go'
                type='submit'
                className='h-10 w-10 grid place-items-center text-black hover:text-black'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                aria-label='Search'
              >
                <Search className='size-4' />
              </motion.button>
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}