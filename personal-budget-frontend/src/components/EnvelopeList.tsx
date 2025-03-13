import { useEffect, useState } from "react";
import axios from "axios";
import { Envelope } from "../models/Envelope";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Container,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import AddEnvelopeForm from "./AddEnvelopeForm";
import TransferMoneyForm from "./TransferMoneyForm";
import UpdateEnvelopeForm from "./UpdateEnvelopeForm";

const API_URL = "http://localhost:4001/envelopes";

 const EnvelopeList = () => {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEnvelope, setSelectedEnvelope] = useState<Envelope | null>(null);

  const fetchEnvelopes =  async () => {
    try {
      const response = await axios.get<Envelope[]>(API_URL);
      setEnvelopes(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phong bì:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect( () => {


    fetchEnvelopes()
  
  }, [])


  if (loading) {
    return <CircularProgress />;
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa phong bì này?")) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEnvelopes(); // Cập nhật danh sách sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa phong bì:", error);
    }
  };

  return (
    <Container>
    <Typography variant="h4" gutterBottom>
      Danh sách phong bì
    </Typography>
    
    <AddEnvelopeForm onEnvelopeAdded={fetchEnvelopes} />
    {/* Thêm form chuyển tiền */}
  <TransferMoneyForm envelopes={envelopes} onTransferSuccess={fetchEnvelopes} />

  {selectedEnvelope && (
      <UpdateEnvelopeForm
        envelope={selectedEnvelope}
        onUpdateSuccess={() => {
          fetchEnvelopes();
          setSelectedEnvelope(null);
        }}
      />
    )}

<Grid container spacing={3}>
  {envelopes.map((envelope) => (
    <Grid item xs={12} sm={6} md={4} key={envelope._id}>
      <Card sx={{ p: 2, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {envelope.name}
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 1 }}>
            Số dư: ${envelope.balance}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {envelope.name}: {envelope.balance}₫
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, mr: 1 }}
            onClick={() => setSelectedEnvelope(envelope)}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => handleDelete(envelope._id)}
          >
            Xóa
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

  </Container>
  )
}


export default EnvelopeList;