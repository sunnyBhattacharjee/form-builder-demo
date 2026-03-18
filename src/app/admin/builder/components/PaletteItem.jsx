import { useDrag, useDrop } from 'react-dnd';
import * as C from "../../../../util/constants"
import { styles } from '@/util/styles';
// 1. Left Section: Draggable Palette Item
export const PaletteItem = ({ element }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: C.ITEM_TYPE,
    item: { type: element.type },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div ref={drag} style={{ ...styles.paletteItem, opacity: isDragging ? 0.5 : 1 }}>
      <span>{element.icon}</span> {element.label}
    </div>
  );
};