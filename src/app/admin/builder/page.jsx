"use client";
import { FormBuilderContent } from "./components/formbuildercontent";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "../../../util/style.css"
export default function FormBuilder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormBuilderContent />
    </DndProvider>
  );
}