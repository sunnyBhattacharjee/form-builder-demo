"use client";
export default function GeneratedForm() {
  const [formData, setFormData] = useState({});

  return (
    <div className="grid grid-cols-12 gap-4">
      {Object.values(formData).map((field) => (
        <div key={field.id} className={`col-span-${field.width}`}>
          {field.type === "text" ? (
            <input
              type="text"
              value={formData[field.id] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field.id]: e.target.value,
                })
              }
              placeholder={field.placeholder}
              required={field.required}
              className="block w-full p-2 pl-4 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
          ) : field.type === "select" ? (
            <select
              value={formData[field.id] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field.id]: e.target.value,
                })
              }
              placeholder={field.placeholder}
              required={field.required}
              className="block w-full p-2 pl-4 text-gray-700 bg-white border border-gray-200 rounded-lg"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={`Option ${i + 1}`}>
                  Option {i + 1}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData[field.id] || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.id]: e.target.checked,
                  })
                }
                className="h-4 w-4 text-gray-700 border-gray-200 rounded-lg"
              />
              <span className="ml-2">{field.label}</span>
            </div>
          ) : field.type === "button" ? (
            <button
              onClick={() => {
                // Custom validation logic here
                if (field.customValidation && !/^[a-zA-Z]+$/.test(formData[field.id])) {
                  alert("Invalid input");
                  return;
                }
                // API endpoint for submission
                fetch('/api/submit', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
                })
                  .then((response) => response.json())
                  .then((data) => console.log(data))
                  .catch((error) => console.error(error));
              }}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              {field.label}
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}