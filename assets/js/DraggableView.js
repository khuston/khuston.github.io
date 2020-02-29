var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

export function draggable_rect_view(RectViewComponent) {
    var initialBoundingRect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultBoundingRect;

    // This function must be called in the component that shares state with the draggable view.
    var _React$useState = React.useState(initialBoundingRect),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        boundingRect = _React$useState2[0],
        setBoundingRect = _React$useState2[1];

    var _React$useState3 = React.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        dragging = _React$useState4[0],
        setDragging = _React$useState4[1];

    return function DraggableRectViewComponent(props) {
        var draggableView = new DraggableRectView(setBoundingRect, dragging, setDragging, props.width, props.height);

        var overriddenProps = Object.assign({}, props);

        overriddenProps['handleMouseDown'] = draggableView.handleMouseDown;
        overriddenProps['handleMouseUp'] = draggableView.handleMouseUp;
        overriddenProps['handleMouseLeave'] = draggableView.handleMouseLeave;
        overriddenProps['handleMouseMove'] = draggableView.handleMouseMove;
        overriddenProps['boundingRect'] = boundingRect;

        return React.createElement(RectViewComponent, overriddenProps);
    };
}

export function DraggableRectView(setBoundingRect, dragging, setDragging, width, height) {
    return {
        handleMouseDown: function handleMouseDown(event) {
            return setDragging(true);
        },
        handleMouseUp: function handleMouseUp(event) {
            return setDragging(false);
        },
        handleMouseLeave: function handleMouseLeave(event) {
            return setDragging(false);
        },
        handleMouseMove: function handleMouseMove(event) {
            if (dragging) {
                event.persist(); // event needs to survive until anonymous function is evaluated
                setBoundingRect(function (boundingRect) {

                    var mouseCoordRatioX = (boundingRect.maxX - boundingRect.minX) / width;
                    var mouseCoordRatioY = (boundingRect.maxY - boundingRect.minY) / height;

                    var dx = -event.movementX * mouseCoordRatioX;
                    var dy = event.movementY * mouseCoordRatioY;

                    return {
                        minX: boundingRect.minX + dx,
                        minY: boundingRect.minY + dy,
                        maxX: boundingRect.maxX + dx,
                        maxY: boundingRect.maxY + dy
                    };
                });
            }
        }
    };
}

var defaultBoundingRect = {
    minX: 0,
    minY: 0,
    maxX: 1,
    maxY: 20 };