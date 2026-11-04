"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Trip } from "@/content/trip";

type TripBoardProps = {
  trip: Trip;
};

type Theme = "light" | "dark";
type GalleryMode = "single" | "collage";

const publicAsset = (src: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${basePath}${src}` : src;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d={direction === "left" ? "M20 12H4m6-6-6 6 6 6" : "M4 12h16m-6-6 6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "light") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M19.3 15.1A8 8 0 0 1 8.9 4.7 8 8 0 1 0 19.3 15.1Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function TripBoard({ trip }: TripBoardProps) {
  const [selectedId, setSelectedId] = useState(trip.events[0]?.id ?? "");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [theme, setTheme] = useState<Theme>("light");
  const [galleryMode, setGalleryMode] = useState<GalleryMode>("single");

  const selectedEvent = useMemo(
    () => trip.events.find((event) => event.id === selectedId) ?? trip.events[0],
    [selectedId, trip.events],
  );

  useEffect(() => {
    setPhotoIndex(0);
  }, [selectedId]);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("trip-board-theme", nextTheme);
    } catch {
      // The visual toggle still works when browser storage is unavailable.
    }
    setTheme(nextTheme);
  };

  if (!selectedEvent) {
    return <main className="empty-state">Add your first trip event to begin.</main>;
  }

  const currentPhoto = selectedEvent.photos[photoIndex];
  const movePhoto = (direction: -1 | 1) => {
    setPhotoIndex((current) =>
      (current + direction + selectedEvent.photos.length) % selectedEvent.photos.length,
    );
  };

  return (
    <main>
      <header className="trip-header page-shell">
        <div className="trip-header__topline" aria-label="Trip overview">
          <span>{trip.eyebrow}</span>
          <div className="trip-header__actions">
            <span className="trip-header__entry-count">
              {String(trip.events.length).padStart(2, "0")} journal entries
            </span>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-pressed={theme === "dark"}
            >
              <span className="theme-toggle__icon">
                <ThemeIcon theme={theme} />
              </span>
              <span>{theme === "light" ? "Dark" : "Light"}</span>
            </button>
          </div>
        </div>
        <div className="trip-header__content">
          <div>
            <p className="kicker">A food, wine & culture journal</p>
            <h1>{trip.title}</h1>
          </div>
          <p className="trip-description">{trip.description}</p>
        </div>
      </header>

      <section className="featured-section page-shell">
        <div className="featured-section__image">
          <Image
            src={publicAsset("/images/featured.jpg")}
            alt="European food and travel experiences"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 1120px"
          />
        </div>

        <div className="featured-section__caption">
          <div>
            <p className="kicker">The Traveling Table / Winter 2027</p>
            <h2>A Journey Through Food & Culture</h2>
          </div>

          <p>Vienna · Ljubljana · Venice</p>
        </div>
      </section>

      <section className="timeline-section" aria-labelledby="timeline-heading">
        <div className="page-shell section-heading">
          <p className="section-index">01 / Timeline</p>
          <h2 id="timeline-heading">Choose a day</h2>
          <p>Follow the line, then open an entry.</p>
        </div>

        <div className="timeline-scroll">
          <div
            className="timeline-track"
            role="tablist"
            aria-label="Trip events"
            style={{ "--event-count": trip.events.length } as React.CSSProperties}
          >
            <span className="timeline-track__line" aria-hidden="true" />
            {trip.events.map((event, index) => {
              const isActive = event.id === selectedEvent.id;
              const position = index % 2 === 0 ? "above" : "below";

              return (
                <button
                  type="button"
                  role="tab"
                  id={`tab-${event.id}`}
                  aria-controls="event-panel"
                  aria-selected={isActive}
                  className={`timeline-event timeline-event--${position}${isActive ? " is-active" : ""}`}
                  key={event.id}
                  onClick={() => setSelectedId(event.id)}
                >
                  <span className="timeline-event__branch" aria-hidden="true" />
                  <span className="timeline-event__label">
                    <span>{event.city}</span>
                    <small>{event.hook}</small>
                  </span>
                  <span className="timeline-event__node">
                    <small>{event.shortMonth}</small>
                    <strong>{event.shortDay}</strong>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <article
        className="event-panel"
        id="event-panel"
        role="tabpanel"
        aria-labelledby={`tab-${selectedEvent.id}`}
        key={selectedEvent.id}
      >
        <section className="gallery page-shell" aria-labelledby="gallery-title">
          <div className="gallery__heading">
            <div>
              <p className="section-index">02 / Frames from the day</p>
              <h2 id="gallery-title">{selectedEvent.city}</h2>
            </div>
            <div className="gallery__toolbar">
              <div className="gallery__view-toggle" role="group" aria-label="Gallery layout">
                <button
                  type="button"
                  className={galleryMode === "single" ? "is-active" : ""}
                  onClick={() => setGalleryMode("single")}
                  aria-pressed={galleryMode === "single"}
                >
                  Single
                </button>
                <button
                  type="button"
                  className={galleryMode === "collage" ? "is-active" : ""}
                  onClick={() => setGalleryMode("collage")}
                  aria-pressed={galleryMode === "collage"}
                  disabled={selectedEvent.photos.length < 2}
                >
                  Collage
                </button>
              </div>

              {galleryMode === "single" ? (
                <div className="gallery__controls">
                  <span aria-live="polite">
                    {String(photoIndex + 1).padStart(2, "0")} / {String(selectedEvent.photos.length).padStart(2, "0")}
                  </span>
                  <button type="button" onClick={() => movePhoto(-1)} aria-label="Previous photo">
                    <ArrowIcon direction="left" />
                  </button>
                  <button type="button" onClick={() => movePhoto(1)} aria-label="Next photo">
                    <ArrowIcon direction="right" />
                  </button>
                </div>
              ) : (
                <span className="gallery__photo-total" aria-live="polite">
                  {String(selectedEvent.photos.length).padStart(2, "0")} photos together
                </span>
              )}
            </div>
          </div>

          {galleryMode === "single" ? (
            <div className="gallery__single-view" key={`single-${selectedEvent.id}`}>
              <figure className="gallery__frame">
                <Image
                  key={currentPhoto.src}
                  src={publicAsset(currentPhoto.src)}
                  alt={currentPhoto.alt}
                  fill
                  priority
                  sizes="(max-width: 760px) 100vw, 1200px"
                />
                <figcaption>
                  <span>{selectedEvent.date}</span>
                  <p>{currentPhoto.caption}</p>
                </figcaption>
              </figure>

              <div className="gallery__dots" aria-label="Choose a photo">
                {selectedEvent.photos.map((photo, index) => (
                  <button
                    type="button"
                    key={photo.src}
                    className={index === photoIndex ? "is-active" : ""}
                    onClick={() => setPhotoIndex(index)}
                    aria-label={`Show photo ${index + 1}`}
                    aria-current={index === photoIndex ? "true" : undefined}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              className={`gallery__collage gallery__collage--count-${Math.min(selectedEvent.photos.length, 6)}`}
              aria-label={`${selectedEvent.city} photo collage`}
              key={`collage-${selectedEvent.id}`}
            >
              {selectedEvent.photos.map((photo, index) => (
                <figure className="gallery__collage-item" key={photo.src}>
                  <Image
                    src={publicAsset(photo.src)}
                    alt={photo.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 560px) 50vw, (max-width: 820px) 70vw, 60vw"
                  />
                  <figcaption>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{photo.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>

        <section className="story page-shell" aria-label={`Day ${selectedEvent.day} journal entry`}>
          <div className="story__title">
            <p className="section-index">03 / Journal entry</p>
            <span className="story__day-number" aria-hidden="true">
              {String(selectedEvent.day).padStart(2, "0")}
            </span>
            <h2>
              Day {selectedEvent.day}, {selectedEvent.date}: {selectedEvent.hook}
            </h2>
            <p className="story__location">{selectedEvent.city}</p>
          </div>

          <div className="story__sections">
            <section>
              <p className="story__label"><span>02</span> Opening</p>
              <p>{selectedEvent.opening}</p>
            </section>
            <section>
              <p className="story__label"><span>03</span> The day’s activities</p>
              <p>{selectedEvent.activities}</p>
            </section>
            <section>
              <p className="story__label"><span>04</span> What I learned</p>
              <p>{selectedEvent.learned}</p>
            </section>
            <section>
              <p className="story__label"><span>05</span> Closing</p>
              <p>{selectedEvent.closing}</p>
            </section>
          </div>
        </section>
      </article>

      <footer className="page-shell">
        <p>{trip.title}</p>
        <p>Collected one day at a time.</p>
      </footer>
    </main>
  );
}