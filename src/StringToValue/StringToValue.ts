interface ReplaceMethod {
    from: RegExp;
    to: Function;
}

export default class StringToValue {
    replacers : ReplaceMethod[] = [];

    constructor(customReplaceMethods: ReplaceMethod[] = []) {
        this.replacers = [{
            from: /^TRUE|FALSE$/i,
            to: function(bool: string){
                return bool.toLowerCase() === "true"
                    ? true
                    : bool.toLowerCase() === "false" ? false : bool;
            }
        }, {
            from: /^-?[0-9]+(.[0-9]+)?$/,
            to: function(numeric: string) {
                return Number(numeric);
            }
        }];
        this.replacers = this.replacers.concat(customReplaceMethods);
    }

    transform(value: string) {
        const replacer = this.replacers.find((replacer) : boolean => {
            return replacer.from.test(value);
        }) || null;

        const callback: any = (value: string, replacer: ReplaceMethod) => {
            return replacer.to(value, replacer);
        };

        return replacer === null ? value : callback(value, replacer);
    }
}
