import Keyable from "./KeyableInterface";

class NestedObject {

    static assign(target: Keyable, value: any, paths: string, separator: string =  "__") {
        const pathList = paths.split(separator);
        const property: string = pathList.shift() || "";
        if(property !== "" && ["object", "undefined"].includes(typeof target[property])) {

            target[property] = target[property]
                ? target[property]
                : pathList.length === 0 ? value : {} ;
            target = target[property];

            this.assign(target, value, pathList.join(separator));
        }
    }
}

export default NestedObject;

