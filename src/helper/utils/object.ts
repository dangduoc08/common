export class ObjectData {
  private static instance: ObjectData;

  public static getInstance(): ObjectData {
    if (!ObjectData.instance) {
      ObjectData.instance = new ObjectData();
    }
    return ObjectData.instance;
  }

  public sortObjectKey(
    object: Record<string, unknown>
  ): Record<string, unknown> {
    const sortedObject: Record<string, unknown> = {};
    const keys = Object.keys(object);

    keys.forEach((key) => {
      const value = object[key];
      const isArray = Array.isArray(value);
      if (typeof value === 'object' && !isArray) {
        object[key] = this.sortObjectKey(value as Record<string, unknown>);
      } else if (isArray) {
        object[key] = value.map((eachValue) => {
          if (typeof eachValue === 'object' && !Array.isArray(eachValue)) {
            return this.sortObjectKey(eachValue as Record<string, unknown>);
          }
          return eachValue;
        });
      }
    });

    keys.sort().forEach((key) => (sortedObject[key] = object[key]));

    return sortedObject;
  }
}
