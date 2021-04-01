import Keyable from '../KeyableInterface';
import StringUtilities from '../StringUtilities/StringUtilities';
import {CaseStyles} from "../CaseStyles";

interface AssignOptions {
    separator?: string;
    titleCase?: CaseStyles
}

class NestedObject {

    private static DefaultAssignOptions: AssignOptions = {
        separator: '__',
        titleCase: 'none'
    };

    static assign(target: Keyable, value: any, paths: string, options: AssignOptions = NestedObject.DefaultAssignOptions) {
        options = {...NestedObject.DefaultAssignOptions, ...options};
        const pathList = (paths || "").split(options.separator as string);
        const property: string = StringUtilities.toCase(pathList.shift() || "", options.titleCase);

        if(property !== "") {
            target[property] = typeof target[property] === 'undefined'
                ? (pathList.length === 0 ? value : {})
                : (pathList.length === 0 ? ([] as any[]).concat(target[property], value) : target[property]);

            this.assign(target[property], value, pathList.join(options.separator), options);
        }
    }
}

export default NestedObject;

