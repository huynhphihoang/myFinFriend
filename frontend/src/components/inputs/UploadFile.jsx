import { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadTransaction } from "../../api/transaction";

function UploadFile() {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    try {
      setUploading(true);
      await uploadTransaction(selected); 
      alert("Uploaded!");
      window.location.reload();
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = ""; 
    }
  };

  return (
    <div>
      <button
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        className={`flex items-center shadow-lg font-manrope font-bold gap-2 border border-black 
        rounded-full px-5 py-3 hover:bg-black hover:text-white hover:-translate-y-0.5 duration-500 disabled:opacity-60 ${uploading ? "cursor-progress" : ""}`}
      >
        {uploading ? "Uploading..." : "Upload file"}
        <MdOutlineFileUpload className="text-xl" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv, .pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UploadFile;
