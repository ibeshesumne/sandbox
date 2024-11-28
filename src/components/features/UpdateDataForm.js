// UpdateDataForm.js
import React from 'react';

function UpdateDataForm({ selectedId, formData, setFormData, handleSubmit }) {
  return (
    <div className="flex-1">
      {selectedId ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold text-zenDark dark:text-zenDarkText">
            Editing Record ID: {selectedId}
          </h3>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
          />
          <input
            type="text"
            name="sender"
            value={formData.sender}
            onChange={(e) =>
              setFormData({ ...formData, sender: e.target.value })
            }
            placeholder="Sender"
            required
            className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
          />
          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={(e) =>
              setFormData({ ...formData, receiver: e.target.value })
            }
            placeholder="Receiver"
            required
            className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="Notes"
            required
            className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText resize-none"
          />
          <button
            type="submit"
            className="w-full bg-zenBlue text-zenLight py-2 rounded-md hover:bg-zenAccent transition"
          >
            Update Record
          </button>
        </form>
      ) : (
        <p className="text-gray-600">Select a record to edit from the list.</p>
      )}
    </div>
  );
}

export default UpdateDataForm;
