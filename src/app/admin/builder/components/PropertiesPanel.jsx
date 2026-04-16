import React from 'react';
import { styles } from '@/util/styles';
export const PropertiesPanel = ({ selectedField, onSave }) => {
  if (!selectedField) {
    return (
      <div className="w-80 border-l bg-white p-6 overflow-y-auto">
        <h3 className="font-bold mb-4">Properties</h3>
        <p className="text-sm text-gray-500">Select an element on the canvas to edit its properties.</p>
      </div>
    );
  }

  // Helper to update top-level properties
  const handleChange = (key, value) => {
    onSave({ ...selectedField, [key]: value });
  };

  // Helper to update nested styling properties
  const handleStyleChange = (key, value) => {
    onSave({
      ...selectedField,
      styles: { ...selectedField.styles, [key]: value }
    });
  };

  // Helpers for array options (Dropdowns/Radios)
  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...selectedField.options];
    updatedOptions[index] = { ...updatedOptions[index], [key]: value };
    handleChange('options', updatedOptions);
  };

  const addOption = () => {
    const newOpt = { label: `Option ${selectedField.options.length + 1}`, value: `opt${selectedField.options.length + 1}` };
    handleChange('options', [...selectedField.options, newOpt]);
  };

  const removeOption = (indexToRemove) => {
    handleChange('options', selectedField.options.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-80 border-l bg-white p-6 overflow-y-auto h-full flex flex-col gap-4">
      <h3 className="font-bold border-b pb-2">Properties</h3>

      {/* --- Basic Settings --- */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Field Name (Variable)</label>
        <input type="text" className="w-full p-2 border rounded" value={selectedField.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Label</label>
        <input type="text" className="w-full p-2 border rounded" value={selectedField.label || ''} onChange={(e) => handleChange('label', e.target.value)} />
      </div>

      {/* --- Options Manager --- */}
      {selectedField.options && (
        <div className="bg-gray-50 p-3 rounded border">
          <label className="block text-xs font-bold text-gray-700 mb-2">List Options</label>
          {selectedField.options.map((opt, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input type="text" placeholder="Label" className="w-full p-1 border rounded text-sm" value={opt.label} onChange={(e) => handleOptionChange(idx, 'label', e.target.value)} />
              <input type="text" placeholder="Value" className="w-full p-1 border rounded text-sm" value={opt.value} onChange={(e) => handleOptionChange(idx, 'value', e.target.value)} />
              <button onClick={() => removeOption(idx)} className="bg-red-100 text-red-600 px-2 rounded hover:bg-red-200">✕</button>
            </div>
          ))}
          <button onClick={addOption} className="text-xs text-blue-600 hover:underline">+ Add Option</button>
        </div>
      )}

      <hr />

      {/* --- Validation & API --- */}
      <h4 className="font-semibold text-sm">Logic & API</h4>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Regex Validation</label>
        <input type="text" placeholder="^[0-9]+$" className="w-full p-2 border rounded font-mono text-sm" value={selectedField.regexValidation || ''} onChange={(e) => handleChange('regexValidation', e.target.value)} />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Error Message</label>
        <input type="text" placeholder="Invalid input" className="w-full p-2 border rounded" value={selectedField.errorMessage || ''} onChange={(e) => handleChange('errorMessage', e.target.value)} />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">API Endpoint</label>
        <input type="text" placeholder="https://..." className="w-full p-2 border rounded" value={selectedField.apiEndpoint || ''} onChange={(e) => handleChange('apiEndpoint', e.target.value)} />
      </div>

      <label className="flex items-center gap-2 text-sm mt-2">
        <input type="checkbox" checked={selectedField.required || false} onChange={(e) => handleChange('required', e.target.checked)} />
        Is Required Field
      </label>

      <hr />
      {/* --- Row / Grid Settings (ONLY SHOWS FOR ROWS) --- */}
      {selectedField.type === 'row' && (
        <>
          <h4 style={{ fontWeight: '600', fontSize: '14px', marginTop: '16px', marginBottom: '8px' }}>Grid Layout</h4>
          <div style={styles.inputGroup}>
            <label style={styles.panelLabel}>Number of Columns</label>
            <select 
              style={styles.panelInput} 
              value={selectedField.styles?.columns || 1} 
              onChange={(e) => handleStyleChange('columns', parseInt(e.target.value))}
            >
              <option value={1}>1 Column (100%)</option>
              <option value={2}>2 Columns (50% / 50%)</option>
              <option value={3}>3 Columns (33% / 33% / 33%)</option>
              <option value={4}>4 Columns (25% / 25% / 25% / 25%)</option>
              <option value={6}>6 Columns</option>
            </select>
          </div>
          <hr style={{ marginTop: '16px', borderTop: '1px solid #e5e7eb' }} />
        </>
      )}
      {/* --- Appearance --- */}
      <h4 className="font-semibold text-sm">Appearance</h4>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Text Color</label>
          <input type="color" className="w-full h-8 cursor-pointer" value={selectedField.styles?.color || '#333333'} onChange={(e) => handleStyleChange('color', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Background</label>
          <input type="color" className="w-full h-8 cursor-pointer" value={selectedField.styles?.backgroundColor || '#ffffff'} onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} />
        </div>
            
        <div>
          <label style={styles.panelLabel}>Border Radius (px)</label>
          <input type="text" style={styles.panelInput} value={selectedField.styles?.borderRadius || '4px'} onChange={(e) => handleStyleChange('borderRadius', e.target.value)} />
        </div>
      <div>
          <label style={styles.panelLabel}>Width (%, px, fr)</label>
          <input 
            type="text" 
            placeholder="e.g., 100%, 50%, 250px"
            style={styles.panelInput} 
            value={selectedField.styles?.width || '100%'} 
            onChange={(e) => handleStyleChange('width', e.target.value)} 
          />
        </div>
        <div>
          <label style={styles.panelLabel}>Height (px, auto)</label>
          <input 
            type="text" 
            placeholder="e.g., auto, 100px"
            style={styles.panelInput} 
            value={selectedField.styles?.height || 'auto'} 
            onChange={(e) => handleStyleChange('height', e.target.value)} 
          />
        </div>
        
      </div>
    </div>
  );
};