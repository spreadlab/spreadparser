import Keyable from "./KeyableInterface";

const DeepObject = (() => {

    function setProperty(target: Keyable, paths: string, value: any, separator: string = "__") {
        if(paths.match(new RegExp(`[a-z0-9]+${separator}[a-z0-9]+`, "gi"))) {
            paths.split(separator).forEach((property: any, index: number, original: string[]) => {
                target[property] = index === original.length -1 ? value : {};
                target = target[property];
            });
        }
    }

    return {
        setProperty
    };

})();

export default DeepObject;

