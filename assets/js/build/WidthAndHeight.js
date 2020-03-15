var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

export function WidthAndHeight(Component) {

    return function (props) {
        var elementRef = React.useRef();

        var _useResize = useResize(elementRef),
            width = _useResize.width,
            height = _useResize.height;

        return React.createElement(
            'div',
            { ref: elementRef },
            React.createElement(Component, Object.assign({}, props, { width: width, height: height }))
        );
    };
}

function useResize(myRef) {
    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        width = _React$useState2[0],
        setWidth = _React$useState2[1];

    var _React$useState3 = React.useState(0),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        height = _React$useState4[0],
        setHeight = _React$useState4[1];

    React.useEffect(function () {
        var handleResize = function handleResize() {
            setWidth(myRef.current.offsetWidth);
            setHeight(myRef.current.offsetHeight);
        };

        window.addEventListener('resize', handleResize);

        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, [myRef]);

    return { width: width, height: height };
}