export const throttle = (func, limit) => {
    let context, args, prevArgs, argsChanged, result;
    let lastRan = 0;
    return function() {
        let now, leftTime;
        if(limit) {
            now = Date.now();
            leftTime = limit - (now - lastRan);
        };
        context = this;
        args = arguments;
        prevArgs = {...args};
        argsChanged = JSON.stringify(args) !== JSON.stringify(prevArgs);
        if ((argsChanged || limit) && (leftTime <= 0 || leftTime > limit)) {
            if(limit) {
                lastRan = now;
            }
            result = func.apply(context, args);
            context = args = null;
        };
        return result;
    };
};