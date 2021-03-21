interface ReplaceMethod {
    from: RegExp;
    to: Function | boolean;
}

export default class Replacer {
    replacers : ReplaceMethod[] = [];

    constructor(customReplaceMethods: ReplaceMethod[] = []) {
        this.replacers = [{
            from: /^TRUE$/i,
            to: true
        }, {
            from: /^FALSE$/i,
            to: false
        }];
        this.replacers.concat(customReplaceMethods);
    }

    transform(value: string) {
        const replacer = this.replacers.find((replacer) : boolean => {
            return replacer.from.test(value);
        }) || null;

        const replacerCallbackByMethod: any = {
            "boolean": (value: string, replacer: ReplaceMethod) => {
                return typeof replacer.to === "boolean" ? replacer.to : value;
            },
            "function": (value: string, replacer: ReplaceMethod) => value.replace(replacer.from, (match: string) => {
                return typeof replacer.to === "function" ? replacer.to(match) : match;
            })
        };

        return replacer === null ? value : replacerCallbackByMethod[typeof replacer.to](value, replacer);
    }
}
