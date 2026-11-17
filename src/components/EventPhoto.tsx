'use client'

import { useState } from 'react'

/**
 * A thumbnail of the giveaway beside an event card's title. Renders nothing if
 * the picture can't be loaded, so a bad link leaves the card as it would be
 * without one.
 */
const EventPhoto = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    // Editors can link a picture on any site, which next/image can't be set up for in advance.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="size-16 shrink-0 rounded-lg border bg-muted object-cover"
    />
  )
}

export default EventPhoto
