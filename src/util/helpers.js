// --- Recursive Tree Helpers ---
export const insertItem = (fields, parentId, item) => {
  if (!parentId) return [...fields, item];
  return fields.map((f) => {
    if (f.id === parentId) {
      return { ...f, children: [...(f.children || []), item] };
    }
    if (f.children) {
      return { ...f, children: insertItem(f.children, parentId, item) };
    }
    return f;
  });
};

export const deleteItem = (fields, idToRemove) => {
  return fields
    .filter((f) => f.id !== idToRemove)
    .map((f) => {
      if (f.children) return { ...f, children: deleteItem(f.children, idToRemove) };
      return f;
    });
};

export const updateItemInTree = (fields, updatedItem) => {
  return fields.map((f) => {
    if (f.id === updatedItem.id) return updatedItem;
    if (f.children) return { ...f, children: updateItemInTree(f.children, updatedItem) };
    return f;
  });
};