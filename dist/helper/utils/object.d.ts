export declare class ObjectData {
    private static instance;
    static getInstance(): ObjectData;
    sortObjectKey(object: Record<string, unknown>): Record<string, unknown>;
}
