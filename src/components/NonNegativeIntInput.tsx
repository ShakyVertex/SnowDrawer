import { useEffect, useState } from 'react'

function parseNonNegativeInt(value: string): number {
  const trimmed = value.trim()
  if (trimmed === '') return 0
  const parsed = Number.parseInt(trimmed, 10)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

function normalizeDigitInput(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits === '') return ''
  return String(parseNonNegativeInt(digits))
}

type NonNegativeIntInputProps = {
  value: number
  onChange: (value: number) => void
}

export function NonNegativeIntInput({ value, onChange }: NonNegativeIntInputProps) {
  const [focused, setFocused] = useState(false)
  const [text, setText] = useState(String(value))

  useEffect(() => {
    if (!focused) {
      setText(String(value))
    }
  }, [value, focused])

  return (
    <input
      type="text"
      inputMode="numeric"
      value={focused ? text : String(value)}
      onFocus={(e) => {
        setFocused(true)
        setText(String(value))
        e.target.select()
      }}
      onBlur={() => {
        setFocused(false)
        const parsed = parseNonNegativeInt(text)
        setText(String(parsed))
        onChange(parsed)
      }}
      onChange={(e) => {
        const next = normalizeDigitInput(e.target.value)
        setText(next)
        if (next !== '') {
          onChange(parseNonNegativeInt(next))
        }
      }}
    />
  )
}
