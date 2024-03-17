import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  recruiterCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.primary.main}`,
    width: "200%",
    margin: "auto",
    marginLeft: "-150px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(4),
    gap: theme.spacing(2),
  },
}));

function Recruiters() {
  const classes = useStyles();
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch(apiList.getRecruiter, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) setdata(data);
      });
  }, []);

  function verify(userId, status) {
    fetch(apiList.verify, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: userId, status }),
    })
      .then((res) => res.json())
      .then((result) => {
        let newData = data.map((rec) => {
          if (rec._id === result.id) {
            return {
              ...rec,
              status: result.status,
            };
          }
          return rec;
        });
        setdata(newData);
      });
  }

  return (
    <div>
      {data.map((rec) => (
        <Card key={rec._id} className={classes.recruiterCard}>
          <Typography variant="h6">{rec.email}</Typography>
          {rec.status === "unverified" ? (
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => verify(rec._id, "approved")}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => verify(rec._id, "rejected")}
              >
                Reject
              </Button>
            </div>
          ) : (
            <Typography>{rec.status}</Typography>
          )}
        </Card>
      ))}
    </div>
  );
}

export default Recruiters;
