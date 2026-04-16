'use client';
import React, { useState, useEffect } from 'react';
export default function GeneratedForm() {
  const [formData, setFormData] = useState({});

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', backgroundColor: '#f9fafb' }}>
      {/* ROW START */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px', width: '100%' }}>
        
        {/* TEXT INPUT START */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          <label style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>New Text Input</label>
          <input 
            type="text"
            style={{
              color: '#1f2937',
              backgroundColor: '#ffffff',
              borderColor: '#d1d5db',
              borderRadius: '6px',
              padding: '10px 12px',
              fontSize: '14px',
              width: '100%',
              height: 'auto'
            }}
            value={formData.var_1776364742794 || ''}
            onChange={(e) => setFormData({...formData, var_1776364742794: e.target.value})}
          />
        </div>
        {/* TEXT INPUT END */}

        {/* TEXT INPUT START */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          <label style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>New Text Input</label>
          <input 
            type="text"
            style={{
              color: '#1f2937',
              backgroundColor: '#ffffff',
              borderColor: '#d1d5db',
              borderRadius: '6px',
              padding: '10px 12px',
              fontSize: '14px',
              width: '100%',
              height: 'auto'
            }}
            value={formData.var_1776364744663 || ''}
            onChange={(e) => setFormData({...formData, var_1776364744663: e.target.value})}
          />
        </div>
        {/* TEXT INPUT END */}

        {/* SELECT START */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          <label style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>New Dropdown</label>
          <select 
            style={{
              color: '#1f2937',
              backgroundColor: '#ffffff',
              borderColor: '#d1d5db',
              borderRadius: '6px',
              padding: '10px 12px',
              fontSize: '14px',
              width: '100%',
              height: 'auto'
            }}
          >
            <option value="opt1">Option 1</option>
            <option value="opt2">Option 2</option>
          </select>
        </div>
        {/* SELECT END */}

        {/* RADIO GROUP START */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          <label style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>New Radio Group</label>
          <input 
            type="radio"
            name="opt1"
            value="opt1"
            checked={formData.var_1776364750178 === 'opt1'}
            onChange={(e) => setFormData({...formData, var_1776364750178: e.target.value})}
          />
          <label style={{ marginLeft: '10px' }}>Option 1</label>
          <input 
            type="radio"
            name="opt1"
            value="opt2"
            checked={formData.var_1776364750178 === 'opt2'}
            onChange={(e) => setFormData({...formData, var_1776364750178: e.target.value})}
          />
          <label style={{ marginLeft: '10px' }}>Option 2</label>
        </div>
        {/* RADIO GROUP END */}

        {/* DATE PICKER START */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          <label style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>New Date Picker</label>
          <input 
            type="date"
            style={{
              color: '#1f2937',
              backgroundColor: '#ffffff',
              borderColor: '#d1d5db',
              borderRadius: '6px',
              padding: '10px 12px',
              fontSize: '14px',
              width: '100%',
              height: 'auto'
            }}
            value={formData.var_1776364764159 || ''}
            onChange={(e) => setFormData({...formData, var_1776364764159: e.target.value})}
          />
        </div>
        {/* DATE PICKER END */}

        {/* FILE UPLOAD START */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          <label style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>New File Upload</label>
          <input 
            type="file"
            style={{
              color: '#1f2937',
              backgroundColor: '#ffffff',
              borderColor: '#d1d5db',
              borderRadius: '6px',
              padding: '10px 12px',
              fontSize: '14px',
              width: '100%',
              height: 'auto'
            }}
          />
        </div>
        {/* FILE UPLOAD END */}

        {/* SAVE BUTTON START */}
        <button 
          type="submit"
          style={{
            color: '#ffffff',
            backgroundColor: '#109e4d',
            borderColor: '#2563eb',
            borderRadius: '6px',
            padding: '10px 24px',
            fontSize: '14px',
            width: '100%',
            height: 'auto'
          }}
        >
          Save
        </button>
        {/* SAVE BUTTON END */}
      </div>
      {/* ROW END */}
    </div>
  );
}