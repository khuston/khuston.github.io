

export function WidthAndHeight(Component) {
    
    return function(props) {
        const elementRef = React.useRef()
        const { width, height } = useResize(elementRef)

        return (
            <div ref={elementRef}>
                <Component {...props} width={width} height={height} ></Component>
            </div>);
    }
}

function useResize(myRef) {
    const [width, setWidth] = React.useState(0)
    const [height, setHeight] = React.useState(0)

    React.useEffect(() => {
        const handleResize = () => {
            setWidth(myRef.current.offsetWidth)
            setHeight(myRef.current.offsetHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [myRef])

    return { width, height }
}