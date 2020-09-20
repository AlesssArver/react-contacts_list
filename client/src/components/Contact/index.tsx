import React, { FC, useState } from "react";
import { Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Button } from "@material-ui/core";

type IProps = {
  id: string;
  name: string;
  surname: string;
  phone: string;
  deleteContact: (id: string) => void;
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 250,
    boxShadow: "0 2px 5px 1px rgba(17, 17, 17, 0.10) !important",
  },
  field: {
    marginBottom: 15,
    display: "flex",
  },
  cardHeader: {
    height: 25,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
}));

const Contact: FC<IProps> = ({ id, name, surname, phone, deleteContact }) => {
  const classes = useStyles();

  const [openForm, setOpenForm] = useState(false);

  const onDelete = (id: string) => deleteContact(id);

  return (
    <Card className={classes.card}>
      <div className={classes.cardHeader}>
        <Button onClick={() => setOpenForm(!openForm)}>
          <Link to={`/contacts/${id}`}>edit</Link>
        </Button>
        <Button onClick={() => onDelete(id)}>x</Button>
      </div>
      <CardContent>
        {/* <div className={classes.field}> */}
        <Typography style={{ marginRight: 20 }}>{name}</Typography>
        <Typography>{surname}</Typography>
        {/* </div> */}
        <Typography>{phone}</Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(Contact);
