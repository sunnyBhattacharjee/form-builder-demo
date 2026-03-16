// --- Styles ---
export const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#fff', borderBottom: '1px solid #ddd', fontFamily: 'inherit' },
  container: { display: 'flex', height: 'calc(100vh - 70px)', fontFamily: 'inherit', backgroundColor: '#eee' },
  sidebar: { width: '250px', padding: '15px', backgroundColor: '#fff', borderRight: '1px solid #ddd', overflowY: 'auto' },
  paletteItem: { padding: '10px', margin: '8px 0', backgroundColor: '#f9f9f9', border: '1px dashed #aaa', cursor: 'grab', borderRadius: '4px', display: 'flex', gap: '10px' },
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
  closeBtn: { marginTop: '15px', padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-end' }
};