import { useEffect } from 'react'

const useOutsideClick = (
  refs: React.RefObject<HTMLElement | null>[],
  callback: () => void
) => {
  const listener = (event: MouseEvent) => {
    if (
      refs.some(
        ref =>
          !ref.current ||
          (event.target instanceof Node && ref.current.contains(event.target))
      )
    ) {
      return
    }

    callback()
  }

  useEffect(() => {
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', () => listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', () => listener)
    }
  }, [refs, callback])
}

export default useOutsideClick
