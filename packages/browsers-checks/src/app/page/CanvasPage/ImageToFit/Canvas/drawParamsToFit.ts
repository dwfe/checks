export function drawParamsToFitImage(canvas: ILinearSizes, image: ILinearSizes): { dx: number; dy: number; dw: number; dh: number; } {
  const aspectRatioCanvas = canvas.width / canvas.height
  const aspectRatioImage = image.width / image.height
  let dx = 0
  let dy = 0
  let dw = canvas.width
  let dh = canvas.height
  if (aspectRatioCanvas > aspectRatioImage) { // ТОГДА высота на весь канвас
    dw = aspectRatioImage * dh
    dx = (canvas.width - dw) / 2
  } else if (aspectRatioCanvas < aspectRatioImage) { // ТОГДА ширина на весь канвас
    dh = dw / aspectRatioImage
    dy = (canvas.height - dh) / 2
  }
  return {dx, dy, dw, dh}
}

interface ILinearSizes {
  width: number;
  height: number;
}
