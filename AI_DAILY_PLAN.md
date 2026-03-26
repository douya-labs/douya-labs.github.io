# AI Daily plan for douya-labs

## Confirmed schedule
- 08:00 Asia/Shanghai: start collecting + generating AI Daily
- 09:00 Asia/Shanghai: send Feishu reminder with link + one-line summary

## Goals
- Daily AI homepage update
- Mobile-first reading experience
- Historical archive by date
- Homepage summary + daily detail page + archive view

## Coverage
- AI GitHub updates
- AI product / feature updates
- AI major events
- Important papers / technical directions
- One featured item of the day
- One short Sprout Note explaining why it matters

## Expected output
- Structured data file for the day
- Homepage summary update
- Daily page update
- Historical archive entry
- 09:00 Feishu reminder with URL + one-sentence summary

## UX direction
- Mobile first
- Large readable cards
- Clean hierarchy
- Homepage should work as a morning briefing surface

## Implementation notes
- `src/data/ai-daily.ts` currently contains seed data and archive placeholders
- Future automation should update data sources and drive the homepage from generated content
