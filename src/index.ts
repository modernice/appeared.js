export interface Options {
  /**
   * Intersection observer threshold.
   */
  threshold?: number

  /**
   * Trigger the 'appear' and 'disappear' callbacks multiple times for each element?
   */
  multiple?: boolean

  /**
   * Runs when the element appears.
   */
  appear?(el: Element, count: number): any

  /**
   * Runs when the element disappears.
   */
  disappear?(el: Element, count: number): any
}

export type Elements = Array<Element|string>|Element|string

/**
 * Watch one or multiple elements appear and disappear from the window.
 */
export default function appeared(el: Elements, options?: Options) {
  const elements = normalizeElements(el)
  const appearCounts = new WeakMap()
  const disappearCounts = new WeakMap()

  const observer = new IntersectionObserver(entries => {
    if (!entries.length) {
      return
    }

    const entry = entries[0]
    const el = entry.target

    let appearCount = appearCounts.has(el) ? appearCounts.get(el) : 0
    
    if (!entry.isIntersecting) {
      if (!appearCounts.has(el)) {
        return
      }

      const disappearCount = disappearCounts.has(el) ? disappearCounts.get(el)+1 : 1
      disappearCounts.set(el, disappearCount)

      if (!options?.multiple && disappearCount > 1) {
        return
      }

      if (options?.disappear) {
        options.disappear(el, disappearCount)
      }

      return
    }

    appearCount++
    appearCounts.set(el, appearCount)

    if (!options?.multiple && appearCount > 1) {
      return
    }

    if (options?.appear) {
      options.appear(el, appearCount)
    }
  }, { threshold: options?.threshold })

  for (const el of elements) {
    observer.observe(el)
  }

  return () => observer.disconnect()
}

function normalizeElements(els: Elements) {
  if (!Array.isArray(els)) {
    els = [els]
  }

  return els.map(el => {
    if (typeof el === 'string') {
      const qels: Element[] = []
      document.querySelectorAll(el).forEach(qel => qels.push(qel))
      return qels
    }

    return [el]
  }).reduce((prev, cur) => prev.concat(cur), [])
}
