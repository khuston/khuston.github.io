
export function draggable_rect_view(RectViewComponent, initialBoundingRect=defaultBoundingRect) {
    
    // This function must be called in the component that shares state with the draggable view.
    const [boundingRect, setBoundingRect] = React.useState(initialBoundingRect);
    const [dragging, setDragging] = React.useState(false);

    return (
        function DraggableRectViewComponent(props) {
            let draggableView = new DraggableRectView(setBoundingRect, dragging, setDragging, props.width, props.height);

            let overriddenProps = Object.assign({}, props);

            overriddenProps['handleMouseDown'] = draggableView.handleMouseDown;
            overriddenProps['handleMouseUp'] = draggableView.handleMouseUp;
            overriddenProps['handleMouseLeave'] = draggableView.handleMouseLeave;
            overriddenProps['handleMouseMove'] = draggableView.handleMouseMove;
            overriddenProps['boundingRect'] = boundingRect;
    
            return <RectViewComponent {...overriddenProps} />;

    })
}

export function DraggableRectView(setBoundingRect, dragging, setDragging, width, height) {
    return ({
        handleMouseDown: (event) => setDragging(true),
        handleMouseUp: (event) => setDragging(false),
        handleMouseLeave: (event) => setDragging(false),
        handleMouseMove: (event) => {
            if (dragging) {
                event.persist(); // event needs to survive until anonymous function is evaluated
                setBoundingRect(
                    function(boundingRect) {
    
                        let mouseCoordRatioX = (boundingRect.maxX - boundingRect.minX)/width
                        let mouseCoordRatioY = (boundingRect.maxY - boundingRect.minY)/height
            
                        let dx = -event.movementX*mouseCoordRatioX
                        let dy = event.movementY*mouseCoordRatioY
    
                        return {
                            minX: boundingRect.minX + dx,
                            minY: boundingRect.minY + dy,
                            maxX: boundingRect.maxX + dx,
                            maxY: boundingRect.maxY + dy
                        }
                    }
                )
            }
        } 
    })
}

const defaultBoundingRect = {
    minX: 0,
    minY: 0,
    maxX: 1,
    maxY: 20}