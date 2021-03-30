import Keyable from '../KeyableInterface';
import StringUtilities from '../StringUtilities/StringUtilities';

class NestedObject {

    static assign(target: Keyable, value: any, paths: string, separator: string =  "__") {
        const pathList = paths.split(separator);
        const property: string = StringUtilities.toCase(pathList.shift() || "");

        if(property !== "") {
            target[property] = typeof target[property] === 'undefined'
                ? (pathList.length === 0 ? value : {})
                : (pathList.length === 0 ? ([] as any[]).concat(target[property], value) : target[property]);

            this.assign(target[property], value, pathList.join(separator));
        }
    }
}

export default NestedObject;

