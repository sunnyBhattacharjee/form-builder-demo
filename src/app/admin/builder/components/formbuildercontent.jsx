import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { PaletteItem } from './PaletteItem';
import { CanvasItem } from './CanvasItem';
import { PropertiesPanel } from './PropertiesPanel';
import { deleteItem, insertItem, updateItemInTree, moveItemInTree } from '@/util/helpers';
import * as C from "../../../../util/constants";
import { styles } from '@/util/styles';

export function FormBuilderContent() {
  const [formFields, setFormFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Recursive Finder ---
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

  // --- DnD Reordering Logic ---
  const handleMoveItem = (dragId, dropId, dropType) => {
    setFormFields((prevTree) => moveItemInTree(prevTree, dragId, dropId, dropType));
  };

  // --- Main Canvas Drop Zone ---
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [C.ITEM_TYPE, 'CANVAS_ITEM'],
    drop: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return; // Prevent double-firing on nested drops

      if (item.type === 'CANVAS_ITEM') {
        handleMoveItem(item.id, null, 'root'); 
      } else {
        addFieldToCanvas(item.type, null);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  // --- Add New Field (With Advanced Properties & Styles) ---
  const addFieldToCanvas = (type, parentId = null) => {
    const template = C.ELEMENT_TYPES.find((el) => el.type === type);
    const newField = {
      id: `field_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: `var_${Date.now()}`, // Variable name for state/API
      type: type,
      label: `New ${template.label}`,
      width: 12,
      required: false,
      placeholder: '',
      
      // Advanced Properties
      regexValidation: '',
      errorMessage: '',
      apiEndpoint: '',
      onChangeAction: 'default',
      onBlurAction: 'default',
      
      // Options (Only for select/radio/checkbox)
      options: ['select', 'radio', 'checkbox'].includes(type) 
        ? [{ label: 'Option 1', value: 'opt1' }] 
        : undefined,
        
      // Default Styles
      styles: {
        color: '#333333',
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderRadius: '4px',
        padding: '8px',
        fontSize: '16px'
      },
      
      ...(type === 'row' ? { children: [] } : {}),
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

  // --- API Publish ---
  const handlePublish = async () => {
    const formSchema = {
      formId: `form_${Date.now()}`,
      createdAt: new Date().toISOString(),
      fields: formFields,
    };

    try {
      const response = await fetch('/api/forms/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formSchema),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Successfully saved:', result);
        alert('Form successfully generated! Please login as user to check.');
      } else {
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
        <h2 style={styles.h2}>Low-Code Form Builder</h2>
        <button style={styles.publishBtn} onClick={handlePublish}>🚀 Publish</button>
      </div>

      <div style={styles.container}>
        {/* Left Section: Elements */}
        <div style={styles.sidebar}>
          <h3>Elements</h3>
          {C.ELEMENT_TYPES.map((element) => <PaletteItem key={element.type} element={element} />)}
        </div>

        {/* Center Section: Canvas */}
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
                  onMoveItem={handleMoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Properties */}
        <PropertiesPanel 
          selectedField={selectedFieldData} 
          onSave={handleSaveProperties} 
        />
      </div>
    </>
  );
}