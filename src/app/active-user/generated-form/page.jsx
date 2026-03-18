'use client';
import React, { useState, useEffect } from 'react';
export default function GeneratedForm() {
  const [formData, setFormData] = useState({});

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <label
          htmlFor="field_1773862033627_301"
          className="block text-sm font-medium text-gray-700"
        >
          New Text Input11
        </label>
        <input
          type="text"
          id="field_1773862033627_301"
          value={formData['field_1773862033627_301'] || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              ['field_1773862033627_301']: e.target.value,
            })
          }
          placeholder=""
          required
          className="block w-full text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md py-2 px-4"
        />
      </div>
      <div className="col-span-12">
        <label
          htmlFor="field_1773862035075_468"
          className="block text-sm font-medium text-gray-700"
        >
          New Text Input1
        </label>
        <input
          type="text"
          id="field_1773862035075_468"
          value={formData['field_1773862035075_468'] || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              ['field_1773862035075_468']: e.target.value,
            })
          }
          placeholder=""
          className="block w-full text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md py-2 px-4"
        />
      </div>
      <button
        type="submit"
        id="field_1773862054122_428"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      >
        New Submit Button1
      </button>
    </div>
  );
}