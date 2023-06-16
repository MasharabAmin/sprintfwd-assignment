export const getValueByPath = (path: string, obj: any) => {
  if (path.includes(".")) {
    const keys = path.split(".")
    let value = obj

    for (const key of keys) {
      value = value?.[key]
      if (value === undefined) break
    }

    return value
  } else {
    return obj[path]
  }
}

export const capitalize = (word: string) => {
  if (!word) {
    return ""
  }
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const createUrl = (args: string[]) => {
  return args.join('/')
}
