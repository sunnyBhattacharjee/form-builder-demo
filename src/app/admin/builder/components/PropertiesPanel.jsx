import { useState, useEffect } from 'react';
import { styles } from '@/util/styles';
// 3. Right Section: Properties Panel
export const PropertiesPanel = ({ selectedField, onSave }) => {
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    setLocalData(selectedField);
  }, [selectedField]);

  if (!localData) {
    return (
      <div style={styles.propertiesPanel}>
        <h3>Properties</h3>
        <p style={{ color: '#888', fontSize: '14px' }}>Select an element on the canvas to edit its properties.</p>
      </div>
    );
  }

  const handleChange = (key, value) => {
    setLocalData({ ...localData, [key]: value });
  };

  return (
    <div style={styles.propertiesPanel}>
      <h3>Field Properties</h3>
      
      <div style={styles.propGroup}>
        <label style={styles.propLabel}>Label</label>
        <input style={styles.input} type="text" value={localData.label || ''} onChange={(e) => handleChange('label', e.target.value)} />
      </div>

      {['text', 'textarea', 'number'].includes(localData.type) && (
        <div style={styles.propGroup}>
          <label style={styles.propLabel}>Placeholder</label>
          <input style={styles.input} type="text" value={localData.placeholder || ''} onChange={(e) => handleChange('placeholder', e.target.value)} />
        </div>
      )}

      <div style={styles.propGroup}>
        <label style={styles.propLabel}>Width (Grid Columns: 1-12)</label>
        <input style={styles.input} type="number" min="1" max="12" value={localData.width || 12} onChange={(e) => handleChange('width', parseInt(e.target.value) || 12)} />
      </div>

      {localData.type !== 'row' && (
        <div style={styles.propGroup}>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px' }}>
            <input type="checkbox" checked={localData.required || false} onChange={(e) => handleChange('required', e.target.checked)} />
            Required Field
          </label>
        </div>
      )}

      <button style={styles.saveBtn} onClick={() => onSave(localData)}>Save Properties</button>
    </div>
  );
};