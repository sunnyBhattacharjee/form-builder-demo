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

// util/helpers.js

export const moveItemInTree = (tree, dragId, dropId, dropType = 'adjacent') => {
  let draggedItem = null;

  // 1. First Pass: Find and Remove the dragged item
  const removeNode = (nodes) => {
    return nodes.filter(node => {
      if (node.id === dragId) {
        draggedItem = { ...node }; // Clone it
        return false;
      }
      if (node.children) {
        node.children = removeNode(node.children);
      }
      return true;
    });
  };

  let newTree = removeNode([...tree]);

  if (!draggedItem) return tree; // Item not found

  // 2. Second Pass: Insert the item at the target location
  const insertNode = (nodes) => {
    let result = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      if (node.id === dropId) {
        if (dropType === 'inside' && node.type === 'row') {
          // Drop inside a row
          result.push({ ...node, children: [...(node.children || []), draggedItem] });
        } else {
          // Drop adjacent (before the target)
          result.push(draggedItem);
          result.push(node);
        }
      } else {
        if (node.children) {
          node.children = insertNode(node.children);
        }
        result.push(node);
      }
    }
    return result;
  };

  return insertNode(newTree);
};