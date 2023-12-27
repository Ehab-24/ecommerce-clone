import { ApiVariant, Variant, VariantValue } from "@/types/product";

export function multiplyArrays(arrayNames: string[], ...arrays: string[][]): VariantValue[] {
  const combineArrays = (result: string[][], arr: string[]) => {
    if (arr.length === 0) {
      return result;
    }
    if (result.length === 0) {
      return arr.map(item => [item]);
    }
    return result.flatMap(combination =>
      arr.map(item => [...combination, item])
    );
  };

  let result: string[][] = [];
  arrays.forEach(arr => {
    result = combineArrays(result, arr);
  });

  const ans: VariantValue[] = result.map(arr => {
    const obj: VariantValue = {};
    for (let i = 0; i < arrayNames.length; i++) {
      obj[arrayNames[i]] = arr[i];
    }
    return obj;
  });

  return ans
}

export function variantToAPIVariant(v: Variant): ApiVariant {
  return {
    ...v,
    inventoryLevels: v.inventoryLevels.map(level => ({
      ...level,
      location: level.location._id,
      createdAt: level.createdAt,
      updatedAt: level.updatedAt,
    }))
  }
}
