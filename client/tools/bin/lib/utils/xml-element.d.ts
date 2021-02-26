import { XMLAttribute } from './xml-attribute';
export declare class XMLElement extends XMLAttribute {
    namespaces: any;
    attributes: XMLAttribute[];
    list: XMLElement[];
    value: any;
    constructor();
    addNameSpace(nameSpace: any): void;
    getAttribute(name: any): XMLAttribute;
    getNameSapce(name: any): any;
    getElementByAttribute(atrName: any, value: any): XMLElement;
    filter(filterName?: (elementName: string) => boolean, filterAttribute?: (attribute: XMLAttribute) => boolean, layer?: number): XMLElement[];
    filterInChildren(list: XMLElement[], filterName?: (elementName: string) => boolean, filterAttribute?: (attribute: XMLAttribute) => boolean, layer?: number): void;
    getElement(name: any): XMLElement;
    getElementsIn(name: any): XMLElement;
    getElements(atrName: any): any[];
    getAllElements(): XMLElement[];
    parse(content: any): void;
    __isStringEmpty(str: any): boolean;
    readInfo(content: any, startIndex?: number): number;
    toString(): string;
    static parse(content: any): XMLElement;
}
