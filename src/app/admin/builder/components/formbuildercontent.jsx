import { deleteItem, insertItem, updateItemInTree } from '@/util/helpers';
import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PaletteItem } from './PaletteItem';
import { PropertiesPanel } from './PropertiesPanel';
import * as C from "../../../../util/constants"
import { styles } from '@/util/styles';
import { CanvasItem } from './CanvasItem';




export function FormBuilderContent() {
  const [formFields, setFormFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const findFieldById = (fields, id) => {
    for (const field of fields) {
      if (field.id === id) return field;
      if (field.children) {
        const found = findFieldById(field.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: C.ITEM_TYPE,
    drop: (item, monitor) => {
      if (monitor.didDrop()) return; 
      addFieldToCanvas(item.type, null);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  const addFieldToCanvas = (type, parentId = null) => {
    const template = C.ELEMENT_TYPES.find((el) => el.type === type);
    const newField = {
      id: `field_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type: type,
      label: `New ${template.label}`,
      width: 12,
      ...(type === 'row' ? { children: [] } : { placeholder: '', required: false }),
    };

    setFormFields((prev) => insertItem(prev, parentId, newField));
    setSelectedFieldId(newField.id);
  };

  const handleRemoveField = (id) => {
    setFormFields((prev) => deleteItem(prev, id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const handleSaveProperties = (updatedField) => {
    setFormFields((prev) => updateItemInTree(prev, updatedField));
  };

  const selectedFieldData = findFieldById(formFields, selectedFieldId);
  const handlePublish = async () => {
    const formSchema = {
      formId: `form_${Date.now()}`,
      createdAt: new Date().toISOString(),
      fields: formFields, 
    };

    try {
      const response = await fetch('/api/forms/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formSchema),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Successfully routed through Node to Java:', result);
        alert('Form successfully generated, Please login as user to check!');
      } else {
        console.error('Failed to save form:', result.error);
        alert(`Failed to publish form: ${result.error}`);
      }
    } catch (error) {
      console.error('Frontend Error:', error);
      alert('Network error while contacting the Node layer.');
    }
  };
  return (
    <>
      <div style={styles.header}>
        <h2 style={styles.h2}>Drag & Drop Form Builder (Nested)</h2>
        <button style={styles.publishBtn} onClick={() => handlePublish()}>🚀 Publish</button>
      </div>

      <div style={styles.container}>
        {/* Left Section */}
        <div style={styles.sidebar}>
          <h3>Elements</h3>
          {C.ELEMENT_TYPES.map((element) => <PaletteItem key={element.type} element={element} />)}
        </div>

        {/* Center Section */}
        <div 
          ref={drop} 
          style={{ ...styles.canvas, backgroundColor: isOver ? '#e8f4ff' : '#fafafa' }}
          onClick={() => setSelectedFieldId(null)} 
        >
          {formFields.length === 0 ? (
            <div style={styles.emptyState}>Drop elements here</div>
          ) : (
            <div style={styles.gridLayer}>
              {formFields.map((field) => (
                <CanvasItem
                  key={field.id}
                  field={field}
                  selectedFieldId={selectedFieldId}
                  onSelect={(f) => setSelectedFieldId(f.id)}
                  onDelete={handleRemoveField}
                  onDropItem={addFieldToCanvas}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <PropertiesPanel selectedField={selectedFieldData} onSave={handleSaveProperties} />
      </div>

      {/* JSON Publish Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Published Form JSON</h3>
            <pre style={styles.jsonBox}>
              {JSON.stringify({ formId: `form_${Date.now()}`, fields: formFields }, null, 2)}
            </pre>
            <button style={styles.closeBtn} onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}