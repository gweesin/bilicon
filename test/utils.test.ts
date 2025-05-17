import { describe, expect, it } from 'vitest'
import { replaceSquareBrackets } from '../src/utils'

describe('replaceSquareBrackets', () => {
  it('should replace square brackets with curly braces', () => {
    expect(replaceSquareBrackets('[doge_金箍]')).toBe('doge_金箍')
  })
})
