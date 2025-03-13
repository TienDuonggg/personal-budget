import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:4001/envelopes";

const AddEnvelopeForm = ({ onEnvelopeAdded }: { onEnvelopeAdded: () => void }) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState<number | "">("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || balance === "") {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }

    try {
      await axios.post(API_URL, { name, balance: Number(balance) });
      onEnvelopeAdded(); // Cập nhật danh sách sau khi thêm
      setName("");
      setBalance("");
    } catch (error) {
      console.error("Lỗi khi thêm phong bì:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}  sx={{ display: "flex", gap: 2, mb: 3 } }>
      <TextField label="Tên phong bì" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Số dư" type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} required />
      <Button type="submit" variant="contained" color="primary">Thêm</Button>
    </Box>
  );
};

export default AddEnvelopeForm;
