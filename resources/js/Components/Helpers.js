export function getCssValue(el, property, asInt = false) {
    const style = window.getComputedStyle(el);
    const value = style.getPropertyValue(property);

    if (! asInt) {
        return value;
    }

    return parseInt(value);
}

export function isMouseOverZone(e, bounds, margin = 0) {
    return (
        e.clientX >= bounds.left - margin &&
        e.clientX <= bounds.right + margin &&
        e.clientY >= bounds.top - margin &&
        e.clientY <= bounds.bottom + margin
    );
}

export function hexToRgb(hex) {
    return hex.replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));
}
