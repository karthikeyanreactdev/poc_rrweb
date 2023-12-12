import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { record, getRecordConsolePlugin } from "rrweb";
import "rrweb-player/dist/style.css";
import * as Yup from "yup";
import PlayerComponent from "../player";
let events = [];

const RecordComponent = () => {
  const [player, setPlayer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  };

  const startRecord = () => {
    console.log("cchdsds");
    console.error("dsds");
    record({
      emit: function emit(event) {
        // events.push(event);
        // you should use console.log in this way to avoid errors.
        // const defaultLog = console.log["__rrweb_original__"]
        //   ? console.log["__rrweb_original__"]
        //   : console.log;
        const defaultLog = console.log["__rrweb_original__"]
          ? console.log["__rrweb_original__"]
          : console.log;
        defaultLog(event);
        if (events.length > 500) {
          // stop after 100 events
          return;
          // stopFn();
        }
        events.push(event);
      },
      // skipInactive: true,
      // // packFn: rrweb.pack,
      // maskAllInputs: true,
      // recordCanvas: true,
      sampling: {
        mousemove: true,
        mouseInteraction: true,
        scroll: 150,
        media: 800,
      },
      // plugins: [
      //   getRecordConsolePlugin({
      //     level: ["info", "log", "warn", "error"],
      //     lengthThreshold: 10000,
      //     stringifyOptions: {
      //       stringLengthLimit: 1000,
      //       numOfKeysLimit: 100,
      //       depthOfLimit: 1,
      //     },
      //     logger: window.console,
      //   }),
      // ],
      plugins: [getRecordConsolePlugin()],
    });
  };

  const stopRecord = () => {
    record({
      emit: function emit() {
        return;
      },
    });
  };

  const validationSchema = Yup.object({
    cardNumber: Yup.string().required("Card number is required"),
    cardHolder: Yup.string().required("Card holder name is required"),
    expiryDate: Yup.string().required("Expiry date is required"),
    cvv: Yup.string().required("CVV is required"),
  });

  const onSubmit = (values) => {
    // Handle the submission logic here
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const reset = () => {
    setPlayer(false);
    events = [];
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card elevation={4} sx={{ p: 4, mt: 4 }}>
          {" "}
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Session Record
          </Typography>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={6}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  id="cardNumber"
                  name="cardNumber"
                  label="Card Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardNumber &&
                    Boolean(formik.errors.cardNumber)
                  }
                  helperText={
                    formik.touched.cardNumber && formik.errors.cardNumber
                  }
                />

                <TextField
                  id="cardHolder"
                  name="cardHolder"
                  label="Card Holder"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.cardHolder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardHolder &&
                    Boolean(formik.errors.cardHolder)
                  }
                  helperText={
                    formik.touched.cardHolder && formik.errors.cardHolder
                  }
                />

                <TextField
                  id="expiryDate"
                  name="expiryDate"
                  label="Expiry Date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.expiryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.expiryDate &&
                    Boolean(formik.errors.expiryDate)
                  }
                  helperText={
                    formik.touched.expiryDate && formik.errors.expiryDate
                  }
                />

                <TextField
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                  helperText={formik.touched.cvv && formik.errors.cvv}
                />

                <Button variant="contained" type="submit">
                  Submit
                </Button>

                <Button
                  variant="contained"
                  sx={{ mx: 4 }}
                  onClick={startRecord}
                >
                  start
                </Button>
                <Button
                  variant="contained"
                  sx={{ mr: 4 }}
                  onClick={() => {
                    stopRecord();
                    setOpenDialog(true);
                    // console.log(events);
                    // navigate("/player", { state: { data: events } });
                  }}
                >
                  Play
                </Button>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle>Session Replay</DialogTitle>
        <DialogContent>
          <PlayerComponent events={events} key={"1"} reset={reset} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default RecordComponent;
