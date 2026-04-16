import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import * as C from '../../../../util/constants';
import { styles } from '@/util/styles';
export const CanvasItem = ({ field, selectedFieldId, onSelect, onDelete, onDropItem, onMoveItem }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'CANVAS_ITEM',
    item: { id: field.id, type: 'CANVAS_ITEM' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOverCurrent }, drop] = useDrop({
    accept: [C.ITEM_TYPE, 'CANVAS_ITEM'],
    drop: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;

      if (item.type === 'CANVAS_ITEM') {
        if (item.id === field.id) return; 
        const dropType = field.type === 'row' ? 'inside' : 'adjacent';
        onMoveItem(item.id, field.id, dropType);
      } else {
        const parentId = field.type === 'row' ? field.id : null;
        onDropItem(item.type, parentId);
      }
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  drag(drop(ref));

  const isSelected = selectedFieldId === field.id;
  const opacity = isDragging ? 0.3 : 1;
  const highlightBg = isOverCurrent ? '#e8f4ff' : field.styles?.backgroundColor || '#ffffff';

  return (
    <div 
      ref={ref} 
      onClick={(e) => { e.stopPropagation(); onSelect(field); }}
      className={`relative p-4 rounded-md cursor-grab active:cursor-grabbing transition-all border-2 mb-3
        ${isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}
      style={{
        ...styles.itemContainer,
        ...(isSelected ? styles.itemSelected : styles.itemUnselected),
        opacity, 
        backgroundColor: highlightBg,
        borderColor: field.styles?.borderColor,
        borderRadius: field.styles?.borderRadius,
        width: field.styles?.width || '100%', 
      }}
    >
      {isSelected && (
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(field.id); }}
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
        >✕</button>
      )}

      <label className="block font-medium mb-2" style={{ color: field.styles?.color, fontSize: field.styles?.fontSize }}>
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>

      {field.type === 'row' ? (
        <div style={
          {...styles.rowContainer,
          gridTemplateColumns: `repeat(${field.styles?.columns || 1}, 1fr)`}
          }>
          {field.children?.length === 0 && <span className="text-gray-400 text-sm m-auto">Drop items here</span>}
          {field.children?.map(child => (
            <div key={child.id} style={{ width: '100%' }}>
              <CanvasItem 
                field={child} 
                selectedFieldId={selectedFieldId} 
                onSelect={onSelect} 
                onDelete={onDelete} 
                onDropItem={onDropItem} 
                onMoveItem={onMoveItem} 
              />
            </div>
          ))}
        </div>
      ) : (
        <input 
          type="text" 
          placeholder={field.placeholder || "Preview input"}
          className="w-full border p-2 rounded outline-none bg-gray-50 pointer-events-none"
          style={{
            ...styles.inputPreview,
            height: field.styles?.height || 'auto'
          }}
        />
      )}
    </div>
  );
};