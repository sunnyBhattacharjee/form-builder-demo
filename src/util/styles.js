// --- Styles ---
export const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#fff', borderBottom: '1px solid #ddd', fontFamily: 'inherit' },
  container: { display: 'flex', height: 'calc(100vh - 70px)', fontFamily: 'inherit', backgroundColor: '#eee' },
  sidebar: { width: '250px', padding: '15px', backgroundColor: '#fff', borderRight: '1px solid #ddd', overflowY: 'auto' },
  paletteItem: { padding: '10px', margin: '8px 0', backgroundColor: '#f9f9f9', border: '1px solid #c2c2c2', cursor: 'grab', borderRadius: '4px', display: 'flex', gap: '10px', boxShadow:'0px 7px 12px -8px #333' },
  canvas: { flex: 1, padding: '20px', overflowY: 'auto', backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '20px 20px' },
  emptyState: { display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '18px' },
  gridLayer: { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '15px', alignContent: 'start' },
  nestedGridLayer: { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', minHeight: '60px', padding: '10px', backgroundColor: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '4px' },
  canvasItem: { backgroundColor: '#fff', borderRadius: '6px', position: 'relative', cursor: 'pointer', minHeight: '60px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'all 0.2s' },
  deleteBtn: { position: 'absolute', top: '5px', right: '5px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', zIndex: 10 },
  propertiesPanel: { width: '300px', padding: '20px', backgroundColor: '#fff', borderLeft: '1px solid #ddd', overflowY: 'auto' },
  propGroup: { marginBottom: '15px' },
  propLabel: { display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#333' },
  input: { display: 'block', width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
  saveBtn: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
  publishBtn: { padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '600px', maxWidth: '90%', maxHeight: '80vh', display: 'flex', flexDirection: 'column' },
  jsonBox: { backgroundColor: '#2d2d2d', color: '#61dafb', padding: '15px', borderRadius: '6px', overflowX: 'auto', flex: 1, minHeight: '200px' },
  closeBtn: { marginTop: '15px', padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-end' },
  rowContainer: { minHeight: '80px', border: '2px dashed #d1d5db', padding: '16px', borderRadius: '6px', backgroundColor: '#f9fafb', display: 'flex', gap: '16px',flexWrap: 'wrap' },

  // --- Layout & Main Builder ---
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  h2: { fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', margin: 0 },
  publishBtn: { backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '600', padding: '8px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  container: { display: 'flex', height: 'calc(100vh - 73px)', backgroundColor: '#f9fafb', overflow: 'hidden' },
  sidebar: { width: '256px', backgroundColor: '#ffffff', borderRight: '1px solid #e5e7eb', padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 10 },
  canvas: { flex: 1, padding: '32px', overflowY: 'auto', transition: 'background-color 0.2s' },
  emptyState: { textAlign: 'center', color: '#9ca3af', marginTop: '80px', border: '2px dashed #d1d5db', padding: '40px', borderRadius: '12px', maxWidth: '42rem', margin: '80px auto 0', backgroundColor: 'rgba(255, 255, 255, 0.5)' },
  gridLayer: { maxWidth: '48rem', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', minHeight: '600px', display: 'flex', flexDirection: 'column' },

  // --- Canvas Nodes ---
  itemContainer: { position: 'relative', padding: '16px', borderRadius: '6px', cursor: 'grab', transition: 'all 0.2s', border: '2px solid', marginBottom: '12px', backgroundColor: '#ffffff' },
  itemSelected: { borderColor: '#3b82f6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  itemUnselected: { borderColor: '#e5e7eb' },
  deleteBtn: { position: 'absolute', top: '-12px', right: '-12px', backgroundColor: '#ef4444', color: '#ffffff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: 'none', cursor: 'pointer', zIndex: 10 },
  itemLabel: { display: 'block', fontWeight: '500', marginBottom: '8px', color: '#374151' },
  inputPreview: { width: '100%', border: '1px solid #d1d5db', padding: '10px', borderRadius: '6px', outline: 'none', backgroundColor: '#f9fafb', pointerEvents: 'none', color: '#6b7280', boxSizing: 'border-box' },
  rowContainer: { minHeight: '80px', border: '2px dashed #d1d5db', padding: '16px', borderRadius: '6px', backgroundColor: '#f9fafb',display: 'grid', gap: '16px' },

  // --- Properties Panel ---
  panelContainer: { width: '320px', borderLeft: '1px solid #e5e7eb', backgroundColor: '#ffffff', padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 10 },
  panelHeader: { fontWeight: 'bold', fontSize: '1.125rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', margin: 0, color: '#1f2937' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  panelLabel: { display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280' },
  panelInput: { width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' },
  optionsBox: { backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '8px' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: '500', color: '#374151', cursor: 'pointer', marginTop: '4px' },
  colorPickerGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  colorInput: { width: '100%', height: '36px', padding: '2px', border: '1px solid #e5e7eb', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#ffffff', boxSizing: 'border-box' }
};
