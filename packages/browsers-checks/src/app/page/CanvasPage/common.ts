export const truncTo05 = (x: number): number => Math.trunc(x) + 0.5;

export function drawGrid(ctx: CanvasRenderingContext2D, xParams: IGridData, yParams: IGridData) {
  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgba(255,255,0,0.5)'

  //x
  for (let i = xParams.from; i <= xParams.to; i += xParams.step) {
    const pos = truncTo05(i)
    ctx.beginPath()
    ctx.moveTo(pos, 0)
    ctx.lineTo(pos, yParams.to)
    ctx.stroke()
  }

  //y
  for (let i = yParams.from; i <= yParams.to; i += yParams.step) {
    const pos = truncTo05(i)
    ctx.beginPath()
    ctx.moveTo(0, pos)
    ctx.lineTo(xParams.to, pos)
    ctx.stroke()
  }
}

interface IGridData {
  from: number;
  to: number;
  step: number;
}
