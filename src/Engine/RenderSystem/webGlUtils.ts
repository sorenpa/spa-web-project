export function reziseCanvas(canvas:HTMLCanvasElement) {
    const cssToRealPixels = window.devicePixelRatio || 1;
  
    // Lookup the size the browser is displaying the canvas in CSS pixels
    // and compute a size needed to make our drawingbuffer match it in
    // device pixels.
    const displayWidth  = Math.floor(canvas.clientWidth  * cssToRealPixels);
    const displayHeight = Math.floor(canvas.clientHeight * cssToRealPixels);
  
    // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {
  
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
  }

  export function radToDeg(r:number) : number {
    return r * 180 / Math.PI;
  }

  export function degToRad(d:number) : number {
    return d * Math.PI / 180;
  }

  