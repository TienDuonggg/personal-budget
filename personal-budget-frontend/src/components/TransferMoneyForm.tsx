import { useState } from "react";
import axios from "axios";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const API_URL = "http://localhost:4001/envelopes/transfer";

const TransferMoneyForm = ({ envelopes, onTransferSuccess }: { envelopes: any[], onTransferSuccess: () => void }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  const handleTransfer = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!from || !to || amount === "" || from === to) {
      alert("Vui lòng nhập đủ thông tin hợp lệ!");
      return;
    }

    try {
      await axios.put(`${API_URL}/${from}/${to}`, { amount: Number(amount) });
      console.log(from )
      onTransferSuccess(); // Cập nhật danh sách phong bì sau khi chuyển tiền
      setFrom("");
      setTo("");
      setAmount("");
    } catch (error) {
      console.error("Lỗi khi chuyển tiền:", error);
    }
  };

  return (
    <form onSubmit={handleTransfer} >
      <FormControl fullWidth>
        <InputLabel id="from-label" >Chọn phong bì nguồn</InputLabel>
        <Select labelId="from-label" value={from} onChange={(e) => setFrom(e.target.value)} displayEmpty>
          {envelopes.map((env) => (
            <MenuItem key={env._id} value={env._id}>{env.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="to-label" >Chọn phong bì đích</InputLabel>
        <Select labelId="to-label" value={to} onChange={(e) => setTo(e.target.value)} displayEmpty>
          {envelopes.map((env) => (
            <MenuItem key={env._id} value={env._id}>{env.name}</MenuItem>
          ))}
          
        </Select>
      </FormControl>

      <TextField
        label="Số tiền chuyển"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mb: 5, mt: 2 }}>
        Chuyển tiền
      </Button>
    </form>
  );
};

export default TransferMoneyForm;
