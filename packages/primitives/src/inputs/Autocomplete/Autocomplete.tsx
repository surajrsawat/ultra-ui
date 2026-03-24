/**
 * Autocomplete Component - Searchable dropdown input
 */

import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { BaseComponentProps, DisableableProps, SizeProps } from '../../types';

export interface AutocompleteOption {
  value: string | number;
  label: string;
}

export interface AutocompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'onSelect'>,
    BaseComponentProps,
    DisableableProps,
    SizeProps {
  /**
   * Available options
   */
  options: AutocompleteOption[];
  /**
   * Label text
   */
  label?: string;
  /**
   * Callback when option is selected
   */
  onSelect?: (option: AutocompleteOption) => void;
  /**
   * Callback when input value changes
   */
  onInputChange?: (value: string) => void;
}

const sizeStyles: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
  sm: { padding: '0.25rem 0.75rem', fontSize: '0.875rem' },
  md: { padding: '0.5rem 0.75rem', fontSize: '1rem' },
  lg: { padding: '0.75rem 1rem', fontSize: '1.125rem' },
};

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      label,
      size = 'md',
      disabled = false,
      onSelect,
      onInputChange,
      className = '',
      style = {},
      value: externalValue,
      ...rest
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(externalValue as string || '');
    const [filtered, setFiltered] = useState<AutocompleteOption[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const newFiltered = options.filter((opt) =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFiltered(newFiltered);
      setSelectedIndex(-1);
    }, [inputValue, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(true);
      if (onInputChange) {
        onInputChange(newValue);
      }
    };

    const handleSelectOption = (option: AutocompleteOption) => {
      setInputValue(option.label);
      setIsOpen(false);
      if (onSelect) {
        onSelect(option);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || filtered.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex !== -1) {
            handleSelectOption(filtered[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    const inputStyle: React.CSSProperties = {
      ...sizeStyles[size],
      ...style,
      width: '100%',
      boxSizing: 'border-box',
      border: '1px solid #ddd',
      borderRadius: '4px',
      opacity: disabled ? 0.6 : 1,
    };

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
    };

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderTop: 'none',
      borderRadius: '0 0 4px 4px',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    const optionStyle = (isSel: boolean): React.CSSProperties => ({
      padding: '0.5rem 0.75rem',
      cursor: 'pointer',
      backgroundColor: isSel ? '#e9ecef' : 'transparent',
      color: isSel ? '#007bff' : '#333',
      fontSize: '0.875rem',
      userSelect: 'none',
    });

    return (
      <div style={containerStyle} ref={containerRef}>
        {label && <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>{label}</label>}
        <input
          ref={ref}
          type="text"
          disabled={disabled}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          style={inputStyle}
          className={className}
          autoComplete="off"
          {...rest}
        />
        {isOpen && filtered.length > 0 && (
          <ul style={dropdownStyle as any}>
            {filtered.map((option, index) => (
              <li
                key={option.value}
                style={optionStyle(index === selectedIndex)}
                onClick={() => handleSelectOption(option)}
                role="option"
                aria-selected={index === selectedIndex}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';
