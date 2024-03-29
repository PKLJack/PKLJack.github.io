/* 
  Utilities for client side
*/

import { CardData, TagData } from "../models"

/** Returns descending ordered TagData[] */
function calculateTags(cardsArray: CardData[]): TagData[] {
  const counter: any = {}

  for (const card of cardsArray) {
    for (const tag of card.tags) {
      if (tag in counter) {
        counter[tag] += 1
      } else {
        counter[tag] = 1
      }
    }
  }

  const pairs = Object.keys(counter).map((tag) => ({
    name: tag,
    count: counter[tag],
  }))

  pairs.sort((a, b) => b.count - a.count)

  return pairs
}

function dateStringToArray(dateString: string) {
  // Expect yyyy-mm-dd
  const date = new Date(dateString)
  const [dateOnly] = date.toISOString().split("T")
  const [year, month, day] = dateOnly.split("-")
  return [year, month, day]
}

export { calculateTags, dateStringToArray }
