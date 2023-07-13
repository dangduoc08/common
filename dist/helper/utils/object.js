"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectData = void 0;
class ObjectData {
    static instance;
    static getInstance() {
        if (!ObjectData.instance) {
            ObjectData.instance = new ObjectData();
        }
        return ObjectData.instance;
    }
    sortObjectKey(object) {
        const sortedObject = {};
        const keys = Object.keys(object);
        keys.forEach((key) => {
            const value = object[key];
            const isArray = Array.isArray(value);
            if (typeof value === 'object' && !isArray && value !== null) {
                object[key] = this.sortObjectKey(value);
            }
            else if (isArray) {
                object[key] = value.map((eachValue) => {
                    if (typeof eachValue === 'object' &&
                        !Array.isArray(eachValue) &&
                        value !== null) {
                        return this.sortObjectKey(eachValue);
                    }
                    return eachValue;
                });
            }
        });
        keys.sort().forEach((key) => (sortedObject[key] = object[key]));
        return sortedObject;
    }
}
exports.ObjectData = ObjectData;
