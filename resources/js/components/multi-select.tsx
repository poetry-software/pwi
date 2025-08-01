import { ChevronDown, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({ options, value = [], onChange, placeholder = 'Select options...', className, disabled = false }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue];
    onChange?.(newValue);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange?.([]);
  };

  const selectedLabels = options.filter((option) => value.includes(option.value)).map((option) => option.label);

  const displayText =
    selectedLabels.length > 0 ? (selectedLabels.length === 1 ? selectedLabels[0] : `${selectedLabels.length} selected`) : placeholder;

  return (
    <div className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('w-full justify-between pr-8', !value.length && 'text-muted-foreground', className)}
            disabled={disabled}
          >
            <span className="truncate">{displayText}</span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        {value.length ? (
          <Button variant="ghost" size="sm" className="absolute top-0 right-8 h-full px-2 hover:bg-transparent" onClick={handleClear}>
            <X className="h-3 w-3" />
          </Button>
        ) : null}
        <DropdownMenuContent className="w-full min-w-[200px] p-1">
          <div className="max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex cursor-pointer items-center space-x-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={() => handleToggle(option.value)}
              >
                <Checkbox checked={value.includes(option.value)} onChange={() => handleToggle(option.value)} />
                <span className="flex-1">{option.label}</span>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
