# AI Daily automation notes

## Current direction

- History data is stored as one JSON file per day under `src/data/daily/`.
- Frontend pages read structured daily entries from `src/data/ai-daily.ts`.
- Daily reminder text can be derived from the latest JSON via `scripts/ai-daily-reminder.mjs`.

## Current gap

The content generation step now has a dedicated local script entry, and GitHub real-signal ingestion has been partially scriptified. Product/event/research ingestion still needs to be expanded.

## Stable automation targets

1. Generate or normalize today's file:
   - `npm run ai-daily:generate`
   - optional input: `node scripts/ai-daily-generate.mjs --input=path/to/source.json --date=YYYY-MM-DD`
2. Build site:
   - `npm run ai-daily:build`
3. Produce reminder text:
   - `npm run ai-daily:reminder`
4. Publish updates:
   - `npm run ai-daily:publish`
