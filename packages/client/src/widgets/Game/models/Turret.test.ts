import { Base } from './Base'
import { Enemy } from './Enemy'
import { Turret } from './Turret'
import { initialGameState } from '../ui/Game'
import { setupJestCanvasMock } from 'jest-canvas-mock'

describe('Turret', () => {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
  if (ctx === null) throw Error('no CanvasRenderingContext2D for testing!')
  const turret = new Turret(ctx)

  beforeEach(() => {
    jest.resetAllMocks()
    setupJestCanvasMock()
  })

  it('определены публичные интерфейсы Turret', () => {
    expect(typeof turret.update).toBe('function')
    expect(typeof turret.draw).toBe('function')
  })
  it('updates correctly', () => {
    const enemies: Enemy[] = [
      new Enemy(
        ctx,
        { x: 0, y: 0 },
        new Base(ctx, initialGameState.baseMaxHealth),
        initialGameState
      ),
      new Enemy(
        ctx,
        { x: 10, y: 10 },
        new Base(ctx, initialGameState.baseMaxHealth),
        initialGameState
      ),
    ]
    const validateSpy = jest.spyOn(turret, 'update')
    const result = turret.update(2, enemies)

    // Expect update() to be called with arguments above.
    expect(validateSpy).toHaveBeenCalledWith(2, enemies)
    validateSpy.mockClear()
  })
  it('отрисовка турели', () => {
    turret.draw()
    const events = ctx.__getEvents()

    expect(events).toMatchSnapshot()
  })
})
