import { useEffect, useRef, useState, type FormEvent } from 'react'
import { audiences, enquiryPrompts, type Audience } from './content'
import { Arrow, ButtonArrow } from './visuals'

type Field = 'name' | 'email' | 'audience' | 'message'
type Errors = Partial<Record<Field, string>>

interface EnquiryFormProps {
  audience: Audience | ''
  setAudience: (audience: Audience | '') => void
  request: number
}

const fieldIds: Record<Field, string> = {
  name: 'enquiry-name',
  email: 'enquiry-email',
  audience: 'audience-employer',
  message: 'enquiry-message',
}

const requiredError = 'Please complete this field.'

export default function EnquiryForm({ audience, setAudience, request }: EnquiryFormProps) {
  const [errors, setErrors] = useState<Errors>({})
  const [confirmation, setConfirmation] = useState<{ audience: Audience; request: number } | null>(null)
  const [storageError, setStorageError] = useState(false)
  const pendingFocus = useRef<string | null>(null)
  const [focusRequest, setFocusRequest] = useState(0)

  useEffect(() => {
    if (pendingFocus.current) {
      document.getElementById(pendingFocus.current)?.focus()
      pendingFocus.current = null
    }
  }, [focusRequest])

  function focusAfterUpdate(id: string) {
    pendingFocus.current = id
    setFocusRequest((count) => count + 1)
  }

  function clearError(field: Field) {
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  function hasError(field: Field) {
    return errors[field] && (field !== 'audience' || !audience) ? true : undefined
  }

  function errorDescription(field: Field) {
    return hasError(field) ? fieldIds[field] + '-error' : undefined
  }

  function errorText(field: Field) {
    return hasError(field) && (
      <p className="field-error" id={fieldIds[field] + '-error'}>{errors[field]}</p>
    )
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const emailInput = form.elements.namedItem('email') as HTMLInputElement

    const nextErrors: Errors = {}
    if (!name) nextErrors.name = requiredError
    if (!email) nextErrors.email = requiredError
    else if (emailInput.validity.typeMismatch) nextErrors.email = 'Please enter a valid email address.'
    if (!audience) nextErrors.audience = 'Please select Employer or Candidate.'
    if (!message) nextErrors.message = requiredError

    setErrors(nextErrors)
    setStorageError(false)
    const firstError = (Object.keys(nextErrors) as Field[])[0]
    if (!audience || firstError) {
      focusAfterUpdate(fieldIds[firstError ?? 'audience'])
      return
    }

    try {
      const key = 'wattlebridge-demo-' + audience.toLowerCase()
      localStorage.setItem(key, JSON.stringify({ name, email, audience, company, message }))
    } catch {
      setStorageError(true)
      focusAfterUpdate('enquiry-storage-error')
      return
    }

    setConfirmation({ audience, request })
    focusAfterUpdate('enquiry-confirmation')
  }

  if (confirmation?.request === request) {
    return (
      <div className="form-panel confirmation">
        <div className="confirmation-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="m5 12 4.5 4.5L19 7" pathLength={1} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 tabIndex={-1} id="enquiry-confirmation">Thank you. Your test enquiry has been received.</h3>
        <p>Your {confirmation.audience.toLowerCase()} enquiry was saved in this browser for the assessment demonstration. No email was sent.</p>
        <button className="text-link" type="button" onClick={() => {
          setConfirmation(null)
          focusAfterUpdate(fieldIds.name)
        }}>
          Start another enquiry <Arrow />
        </button>
      </div>
    )
  }

  return (
    <form className="form-panel" aria-labelledby="enquiry" aria-describedby="test-guidance" noValidate onSubmit={submit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={fieldIds.name}>Name</label>
          <span className="control">
            <input id={fieldIds.name} name="name" autoComplete="name" required maxLength={120}
              aria-invalid={hasError('name')} aria-describedby={errorDescription('name')}
              onChange={() => clearError('name')} />
          </span>
          {errorText('name')}
        </div>
        <div className="field">
          <label htmlFor={fieldIds.email}>Email</label>
          <span className="control">
            <input id={fieldIds.email} name="email" type="email" autoComplete="email" required maxLength={254}
              aria-invalid={hasError('email')} aria-describedby={errorDescription('email')}
              onChange={() => clearError('email')} />
          </span>
          {errorText('email')}
        </div>

        <fieldset className="field field-wide audience-field" aria-describedby={errorDescription('audience')}>
          <legend>You are a...</legend>
          <div className="audience-options" data-selected={audience || undefined}>
            <span className="audience-indicator" aria-hidden="true" />
            {audiences.map((option) => (
              <label key={option} className="audience-option">
                <input id={'audience-' + option.toLowerCase()} name="audience" type="radio"
                  value={option} checked={audience === option} required
                  aria-invalid={hasError('audience')} aria-describedby={errorDescription('audience')}
                  onChange={() => {
                    setAudience(option)
                    clearError('audience')
                  }} />
                <span className="audience-mark" aria-hidden="true" />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errorText('audience')}
        </fieldset>

        <div className="field field-wide">
          <label htmlFor="enquiry-company">Company <span>(optional)</span></label>
          <span className="control">
            <input id="enquiry-company" name="company" autoComplete="organization" maxLength={160} />
          </span>
        </div>
        <div className="field field-wide">
          <label htmlFor={fieldIds.message}>Message</label>
          <div aria-live="polite" className="form-prompt">
            {audience && <p id="enquiry-prompt">{enquiryPrompts[audience]}</p>}
          </div>
          <span className="control">
            <textarea id={fieldIds.message} name="message" rows={4} required maxLength={3000}
              aria-invalid={hasError('message')}
              aria-describedby={[audience && 'enquiry-prompt', errorDescription('message')].filter(Boolean).join(' ') || undefined}
              onChange={() => clearError('message')} />
          </span>
          {errorText('message')}
        </div>
      </div>

      <button className="button button-primary form-submit" type="submit">
        Send enquiry <ButtonArrow />
      </button>
      <p className="form-note">Demonstration only: your enquiry is saved in this browser, not emailed.</p>
      {storageError && (
        <p className="field-error" id="enquiry-storage-error" tabIndex={-1}>
          Your test enquiry could not be saved in this browser. Check that local storage is available and try again.
        </p>
      )}
    </form>
  )
}
