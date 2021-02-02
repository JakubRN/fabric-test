import { fabric } from 'fabric';

(function () {
  fabric.CustomObject = fabric.util.createClass(fabric.Rect, {
    initialize(options) {
      options = {
        ...options,
        width: 200,
        height: 200,
        fill: 'yellow',
      };

      fabric.Object.prototype.transparentCorners = false;
      this.cornerSize = 20;
      this.borderColor = 'black';
      this.cornerColor = 'black';
      this.padding = 20;
      this.transparentCorners = true;
      this.setControlsVisibility({
        bl: true,
        br: true,
        tl: true,
        tr: true,
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        mtr: false,
      });
      this.callSuper('initialize', options);
    },
  });

  fabric.Object.prototype._setCornerCoords = function() {

    const padding = 30;
    var coords = this.oCoords,
        newTheta = fabric.util.degreesToRadians(45 - this.angle),
        /* Math.sqrt(2 * Math.pow(this.cornerSize, 2)) / 2, */
        /* 0.707106 stands for sqrt(2)/2 */
        cornerHypotenuse = (this.cornerSize + padding) * 0.707106,
        cosHalfOffset = cornerHypotenuse * fabric.util.cos(newTheta),
        sinHalfOffset = cornerHypotenuse * fabric.util.sin(newTheta),
        x, y;

    for (var point in coords) {
        x = coords[point].x;
        y = coords[point].y;
        coords[point].corner = {
        tl: {
            x: x - sinHalfOffset,
            y: y - cosHalfOffset
        },
        tr: {
            x: x + cosHalfOffset,
            y: y - sinHalfOffset
        },
        bl: {
            x: x - cosHalfOffset,
            y: y + sinHalfOffset
        },
        br: {
            x: x + sinHalfOffset,
            y: y + cosHalfOffset
        }
        };
    }
  };

  fabric.Canvas.prototype._getActionFromCorner = function (
    alreadySelected,
    corner
  ) {
    if (!corner || !alreadySelected) {
        return "drag";
      }
    switch (corner) {
      case "tl":
      case "br":
        return "rotate";
      default:
        return "scale";
    }
  };

  fabric.Object.prototype._drawControl = function (
    control,
    ctx,
    styleOverride,
  ) {
    let x = 0, y = 0;

    this.setCoords();
    const bbw = this.getScaledWidth() / 2 + 20;
    const bbh = this.getScaledHeight() / 2 + 20;

    const controlsColor = styleOverride.controlsColor || this.borderColor;

    ctx.strokeStyle = controlsColor;
    ctx.fillStyle = controlsColor;
    const circleRadius = 14;
    const circleOffset = circleRadius + 5;
    const triangleEdgeSize = 16;
    switch (control) {
      case 'tl':
        x = -bbw - circleOffset;
        y = -bbh - circleOffset;
        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, 2 * Math.PI, true);
        ctx.stroke();
        break;
      case 'tr':
        x = bbw + triangleEdgeSize;
        y = -bbh - triangleEdgeSize;
        ctx.beginPath();
        ctx.moveTo(x + triangleEdgeSize, y - triangleEdgeSize);
        ctx.lineTo(x + triangleEdgeSize / 2.0, y + triangleEdgeSize);
        ctx.lineTo(x - triangleEdgeSize, y - triangleEdgeSize / 2.0);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'bl':
        x = -bbw - triangleEdgeSize;
        y = bbh + triangleEdgeSize;
        ctx.beginPath();
        ctx.moveTo(x - triangleEdgeSize, y + triangleEdgeSize);
        ctx.lineTo(x - triangleEdgeSize / 2.0, y - triangleEdgeSize);
        ctx.lineTo(x + triangleEdgeSize, y + triangleEdgeSize / 2.0);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'br':
        x = bbw + circleOffset;
        y = bbh + circleOffset;
        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, 2 * Math.PI, true);
        ctx.stroke();
        break;
      default:
        break;
    }
  };
  
}());

const createFabricObject = () => new fabric.CustomObject();

export default createFabricObject;
