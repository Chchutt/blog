export function dateTool(date: string) {
  const day = date.slice(8, 10)
  const month = date.slice(5, 7)
  const year = date.slice(0, 4)
  switch (month) {
  case '01':
    return `JANUARY ${day}, ${year}`
  case '02':
    return `FEBRUARY ${day}, ${year}`
  case '03':
    return `MARCH ${day}, ${year}`
  case '04':
    return `APRIL ${day}, ${year}`
  case '05':
    return `MAY ${day}, ${year}`
  case '06':
    return `JUNE ${day}, ${year}`
  case '07':
    return `JULY ${day}, ${year}`
  case '08':
    return `AUGUST ${day}, ${year}`
  case '09':
    return `SEPTEMBER ${day}, ${year}`
  case '10':
    return `OCTOBER ${day}, ${year}`
  case '11':
    return `NOVEMBER ${day}, ${year}`
  case '12':
    return `DECEMBER ${day}, ${year}`
  default:
    return '12'
  }
}

export const desLenCheck = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...'
  }
  return text
}
