export class StringStream {

    start: number;
    pos: number;
    string: string;
    tabSize: number;
    lastColumnPos: number;
    lastColumnValue: number;
    lineStart

    constructor(string: string, tabSize: number) {
        this.pos = this.start = 0;
        this.string = string;
        this.tabSize = tabSize || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0;
    }

    eol() {
        return this.pos >= this.string.length;
    }

    sol() {
        return this.pos == this.lineStart;
    }

    peek(): string {
        return this.string.charAt(this.pos) || undefined;
    }

    next(): string {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++);
    }

    eat(match: string | RegExp | ((char: string) => boolean)): string {
        var ch = this.string.charAt(this.pos);
        var ok: boolean;
        if (typeof match == "string") ok = ch == match;
        else ok = ch && ((match as RegExp).test ? (match as RegExp).test(ch) : (match as Function)(ch));
        if (ok) {
            ++this.pos;
            return ch;
        }
    }

    eatWhile(match: string | RegExp | ((char: string) => boolean)): boolean {
        var start = this.pos;
        while (this.eat(match)) {
        }
        return this.pos > start;
    }

    eatSpace(): boolean {
        var start = this.pos;
        while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
        return this.pos > start;
    }

    skipToEnd() {
        this.pos = this.string.length;
    }

    skipTo(ch: string) {
        var found = this.string.indexOf(ch, this.pos);
        if (found > -1) { this.pos = found; return true; }
    }

    backUp(n: number) {
        this.pos -= n;
    }

    column() {
        if (this.lastColumnPos < this.start) {
            this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
            this.lastColumnPos = this.start;
        }
        return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    }

    indentation(): number {
        return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    }

    match(pattern: string | RegExp, consume: boolean, caseInsensitive?: boolean) {
        if (typeof pattern == "string") {
            var cased = function (str) { return caseInsensitive ? str.toLowerCase() : str; };
            var substr = this.string.substr(this.pos, pattern.length);
            if (cased(substr) == cased(pattern)) {
                if (consume !== false) this.pos += pattern.length;
                return true;
            }
        } else {
            var match = this.string.slice(this.pos).match(pattern);
            if (match && match.index > 0) return null;
            if (match && consume !== false) this.pos += match[0].length;
            return match;
        }
    }

    current() {
        return this.string.slice(this.start, this.pos)
    }

    hideFirstChars(n: number, inner: Function) {
        this.lineStart += n;
        try {
            return inner();
        } finally {
            this.lineStart -= n;
        }
    }

}

export function countColumn(string: string, end: number, tabSize: number, startIndex?: number, startValue?: number) {
    if (end == null) {
        end = string.search(/[^\s\u00a0]/);
        if (end == -1) end = string.length;
    }
    for (var i = startIndex || 0, n = startValue || 0; ;) {
        var nextTab = string.indexOf("\t", i);
        if (nextTab < 0 || nextTab >= end)
            return n + (end - i);
        n += nextTab - i;
        n += tabSize - (n % tabSize);
        i = nextTab + 1;
    }
}