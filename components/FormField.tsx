import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label?: string
  error?: FieldError
  required?: boolean
  children: ReactNode
  helperText?: string
}

export const FormField = ({
  label,
  error,
  required,
  children,
  helperText,
}: FormFieldProps) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-destructive text-sm mt-1">{error.message}</p>
      )}
      {helperText && !error && (
        <p className="text-muted-foreground text-sm mt-1">{helperText}</p>
      )}
    </div>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
}

export const Input = ({ error, className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'w-full px-4 py-2.5 border border-border rounded-lg',
        'bg-input text-foreground placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
        'transition-colors',
        error && 'border-destructive focus:ring-destructive',
        className
      )}
      {...props}
    />
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError
}

export const TextArea = ({ error, className, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-2.5 border border-border rounded-lg',
        'bg-input text-foreground placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
        'transition-colors resize-none',
        error && 'border-destructive focus:ring-destructive',
        className
      )}
      {...props}
    />
  )
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>
  error?: FieldError
}

export const Select = ({ options, error, className, ...props }: SelectProps) => {
  return (
    <select
      className={cn(
        'w-full px-4 py-2.5 border border-border rounded-lg',
        'bg-input text-foreground',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
        'transition-colors',
        error && 'border-destructive focus:ring-destructive',
        className
      )}
      {...props}
    >
      <option value="">Tanlang...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
}

export const FileInput = ({ error, className, ...props }: FileInputProps) => {
  return (
    <input
      type="file"
      className={cn(
        'w-full px-4 py-2.5 border border-border rounded-lg',
        'bg-input text-foreground text-sm',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
        'transition-colors',
        'file:mr-4 file:py-2 file:px-4 file:rounded file:border-0',
        'file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground',
        'hover:file:bg-blue-700',
        error && 'border-destructive focus:ring-destructive',
        className
      )}
      {...props}
    />
  )
}
