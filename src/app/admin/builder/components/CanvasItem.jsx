// 2. Center Section: Canvas Element (Recursive)
import { useDrag, useDrop } from 'react-dnd';
import * as C from "../../../../util/constants"
import { styles } from '@/util/styles';
export const CanvasItem = ({ field, onSelect, onDelete, onDropItem, selectedFieldId }) => {
  const isSelected = selectedFieldId === field.id;
  
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: C.ITEM_TYPE,
    drop: (item, monitor) => {
      if (monitor.didDrop()) return; 
      onDropItem(item.type, field.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }), [field.id, onDropItem]);

  const isRow = field.type === 'row';

  return (
    <div
      ref={isRow ? drop : null}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(field);
      }}
      style={{
        ...styles.canvasItem,
        gridColumn: `span ${field.width || 12}`,
        border: isSelected ? '2px solid #007bff' : '1px solid #ddd',
        backgroundColor: isOver && canDrop ? '#e8f4ff' : '#fff',
        padding: isRow ? '25px 15px 15px 15px' : '15px',
      }}
    >
      <button 
        style={styles.deleteBtn} 
        onClick={(e) => { e.stopPropagation(); onDelete(field.id); }}
      >✕</button>

      <div style={{ pointerEvents: 'none', marginBottom: isRow ? '15px' : '0' }}>
        <strong>{field.label}</strong> {field.required && <span style={{color: 'red'}}>*</span>}
        {!isRow && (
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
            [{field.type}] {field.placeholder ? `Placeholder: ${field.placeholder}` : ''}
          </p>
        )}
      </div>

      {isRow && (
        <div style={styles.nestedGridLayer}>
          {!field.children || field.children.length === 0 ? (
            <div style={{ color: '#aaa', fontSize: '12px', gridColumn: 'span 12', textAlign: 'center', padding: '10px' }}>
              Drop items inside this row
            </div>
          ) : (
            field.children.map((child) => (
              <CanvasItem
                key={child.id}
                field={child}
                onSelect={onSelect}
                onDelete={onDelete}
                onDropItem={onDropItem}
                selectedFieldId={selectedFieldId}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};