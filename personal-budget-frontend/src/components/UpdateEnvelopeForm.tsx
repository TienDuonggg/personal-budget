import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:4001/envelopes";

const UpdateEnvelopeForm = ({ envelope, onUpdateSuccess }: { envelope: any; onUpdateSuccess: () => void }) => {
  const [name, setName] = useState(envelope.name);
  const [balance, setBalance] = useState<number | "">(envelope.balance);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault(); //  update nhưng ko reload lại trang

    try {
      await axios.put(`${API_URL}/${envelope._id}`, { name, balance: Number(balance) });
      onUpdateSuccess(); // Cập nhật danh sách phong bì sau khi sửa
    } catch (error) {
      console.error("Lỗi khi cập nhật phong bì:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleUpdate} sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField label="Tên phong bì" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Số dư" type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} required />
      <Button type="submit" variant="contained" color="primary">Cập nhật</Button>
    </Box>
  );
};

export default UpdateEnvelopeForm;

