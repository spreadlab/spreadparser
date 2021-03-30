import Keyable from '../KeyableInterface'

interface ReplaceMethod {
    from: RegExp;
    to: Function;
}

type CaseStyles = 'none' | 'camelCase' | 'snakeCase' ;

export default class StringUtilities {
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

    fromPatternToValue(value: string): any {
        const replacer = this.replacers.find((replacer) : boolean => {
            return replacer.from.test(value);
        }) || null;

        const callback: any = (value: string, replacer: ReplaceMethod) => {
            return replacer.to(value, replacer);
        };

        return replacer === null ? value : callback(value, replacer);
    }

    static toCase(original: string, caseName: CaseStyles = 'none'): string {
        const caseNameToMethod: Keyable = {
            none: this.dontChangeCase,
            camelCase: this.toCamelCase,
            snakeCase: this.toSnakeCase
        };

        return caseNameToMethod[caseName](original);
    }

    private static clear(original: string): string {
        return original
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
    }

    private static toCamelCase(original: string): string {
        return StringUtilities.clear(original)
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, char) => char.toUpperCase())
    }

    private static toSnakeCase(original: string): string {
        return StringUtilities.clear(original)
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, char) => `_${char}`)
    };

    private static dontChangeCase(original: string): string {
        return original;
    }
}
