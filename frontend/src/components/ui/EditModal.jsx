import { useState } from "react";

export default function EditTransactionModal({ transaction, onClose, onSave }) {
  const [amount, setAmount] = useState(transaction.transaction_amount);
  const [description, setDescription] = useState(transaction.transaction_details);
  const [category, setCategory] = useState(transaction.category_name);
  const [date, setDate] = useState(transaction.transaction_date);
  const categories = [
  { id: 1, name: "Groceries" },
  { id: 2, name: "Utilities" },
  { id: 3, name: "Cash" },
  { id: 4, name: "Eating out & Takeaway" },
  { id: 5, name: "Shopping" },
  { id: 6, name: "Entertainment" },
  { id: 7, name: "Health & Medical" },
  { id: 8, name: "Rent" },
  { id: 9, name: "Mortgage" },
  { id: 10, name: "Insurance" },
  { id: 11, name: "Travel & Holidays" },
  { id: 12, name: "Vehicle & Transport" },
  { id: 13, name: "Income" },
  { id: 14, name: "Fees & Interest" },
  { id: 15, name: "Subscriptions" },
  { id: 16, name: "Sport & Fitness" },
  { id: 17, name: "Super Contributions" },
  { id: 18, name: "Other" },
];


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...transaction,
      transaction_date: date,
      transaction_amount: amount,
      transaction_details: description,
      category_name: category,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96"
      >
        <h2 className="text-lg font-bold mb-4">Edit Transaction</h2>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">
          Transaction date
          </label>
          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-sm font-bold border border-gray-300 rounded-lg px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 mb-4 bg-white"
          >
            <option value="">Select category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">
          Description
          </label>
          <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 mb-4"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">
          Amount
          </label>
           <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 mb-3"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" className="text-blue-600 font-bold">Save</button>
        </div>
      </form>
    </div>
  );
}