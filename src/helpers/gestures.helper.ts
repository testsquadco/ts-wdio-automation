export class GestureHelper {
    /**
     * Performs a swipe gesture from one point to another
     */
    async swipe(
        fromX: number,
        fromY: number,
        toX: number,
        toY: number,
        duration: number = 1000
    ) {
        await browser.touchPerform([
            {
                action: 'press',
                options: { x: fromX, y: fromY }
            },
            {
                action: 'wait',
                options: { ms: duration }
            },
            {
                action: 'moveTo',
                options: { x: toX, y: toY }
            },
            {
                action: 'release'
            }
        ]);
    }

    /**
     * Performs a scroll gesture until an element is visible
     */
    async scrollIntoView(selector: string, direction: 'up' | 'down' = 'down') {
        const element = await $(selector);
        await browser.execute('mobile: scroll', {
            direction,
            element: element.elementId
        });
    }

    /**
     * Performs a pinch gesture (zoom in/out)
     */
    async pinch(scale: number) {
        await browser.execute('mobile: pinch', {
            scale,
            velocity: 2.0
        });
    }

    /**
     * Performs a long press gesture on an element
     */
    async longPress(selector: string, duration: number = 2000) {
        const element = await $(selector);
        await browser.touchPerform([
            {
                action: 'longPress',
                options: {
                    element: element.elementId,
                    duration: duration
                }
            }
        ]);
    }
}

export default new GestureHelper(); 