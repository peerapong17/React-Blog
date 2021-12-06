
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  container: {
    width: "100%",
    maxWidth: "600px"
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '30px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  input: {
    display: 'none',
  },
  labelUpload: {
    width: "100%"
  },
  btnUpload: {
    margin: "1rem 0",
    float: "right"
  }
}));
