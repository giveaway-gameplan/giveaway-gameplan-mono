'use client'

import { FieldDescription, FieldError, FieldLabel, fieldBaseClass, useField } from '@payloadcms/ui'
import { mergeFieldStyles } from '@payloadcms/ui/shared'
import type { TextFieldClientComponent } from 'payload'

const HEX_COLOR = /^#[0-9a-f]{6}$/i

/**
 * A colour picker for a text field that stores a hex colour. The colour can
 * also be typed or pasted, and cleared to go back to the site's own colour.
 */
const ColorField: TextFieldClientComponent = ({ field, path: pathFromProps, readOnly }) => {
  const { path, value, setValue, showError, errorMessage } = useField<string | null>({
    potentiallyStalePath: pathFromProps,
  })
  const description = field.admin?.description

  return (
    <div
      className={[fieldBaseClass, 'text', showError && 'error', readOnly && 'read-only']
        .filter(Boolean)
        .join(' ')}
      style={mergeFieldStyles(field)}
    >
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div className={`${fieldBaseClass}__wrap`}>
        <FieldError message={errorMessage} path={path} showError={showError} />
        <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
          <input
            type="color"
            aria-label={`${typeof field.label === 'string' ? field.label : field.name} picker`}
            // The picker can't be empty, so an unset colour shows as mid-grey.
            value={value && HEX_COLOR.test(value) ? value : '#808080'}
            onChange={(event) => setValue(event.target.value)}
            disabled={readOnly}
            style={{
              cursor: readOnly ? 'default' : 'pointer',
              flex: '0 0 3rem',
              height: '2.5rem',
              opacity: value ? 1 : 0.45,
              padding: '0.15rem',
              width: '3rem',
            }}
          />
          <input
            type="text"
            id={`field-${path.replace(/\./g, '__')}`}
            name={path}
            value={value ?? ''}
            placeholder="Site default"
            onChange={(event) => setValue(event.target.value || null)}
            disabled={readOnly}
            style={{ flex: '1 1 auto', minWidth: 0 }}
          />
          {value && !readOnly && (
            <button
              type="button"
              onClick={() => setValue(null)}
              style={{
                background: 'none',
                border: 0,
                color: 'inherit',
                cursor: 'pointer',
                flex: '0 0 auto',
                textDecoration: 'underline',
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>
      {description && <FieldDescription description={description} path={path} />}
    </div>
  )
}

export default ColorField
