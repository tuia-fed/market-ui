declare module '*.gif' {
  const str: string
  export default str
}

declare module '*.md' {
  const str: string
  export default str
}

declare module '*.module.css' {
  const styles: {
    [index: string]: string
  }
  export default styles
}

declare module '*.module.less' {
  const styles: {
    [index: string]: string
  }
  export default styles
}

declare module '*.png' {
  const str: string
  export default str
}

declare module '*.jpg' {
  const str: string
  export default str
}

declare module '*.jpeg' {
  const str: string
  export default str
}

declare module '*.json' {
  const obj: Record<string, unknown>
  export default obj
}
