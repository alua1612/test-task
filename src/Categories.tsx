import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  paymentMethod: string,
  amount: number,
  subcats?: any[]
) {
  return { id, date, name, paymentMethod, amount, subcats };
}

let rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Cosmetics',
    'VISA ⠀•••• 3719',
    312.44,
    [
        {
            id: 5,
            name: 'Face Palm',
        },
        {
            id: 6,
            name: 'nails',
        }
    ]
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Home',
    'VISA ⠀•••• 2574',
    866.99, []
  ),
  createData(2, '16 Mar, 2019', '8 march', 'MC ⠀•••• 1253', 100.81, []),
  createData(
    3,
    '16 Mar, 2019',
    'New Year',
    'AMEX ⠀•••• 2000',
    654.39, []
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Lorem Ipsum',
    'VISA ⠀•••• 5919',
    212.79, []
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
let catId: number;

export default function Categories() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [cats, setCats] = React.useState(rows)
    const [openSubcatModal, setOpenSubCatModel] = React.useState(false);
    const [subCat, setSubCat] = React.useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCreate = () => {
        console.log('adf', name)
        rows.push(createData(
            rows.length + 100,
            '15 Mar, 2019',
            name,
            'VISA ⠀•••• 5919',
            212.79,
          ),);
          setCats(rows);
          setOpen(false);
    }

    const handleChange = (ev: any) => {
        setName(ev.target.value)
    }

    const handleDelete = (ev: any, id: number) => {
        console.log('delete', rows.filter(row => row.id !== id));
        rows = rows.filter(row => row.id !== id)
        setCats(rows)
    }

    const handleOpenSubcat = (id: number) => {
        catId = id;  
        setOpenSubCatModel(true)
    }

    const handleCloseSubCat = () => {
        setOpenSubCatModel(false)
    }

    const handleChangeSubCat = (ev: any) => {
        setSubCat(ev.target.value)
    }

    const handleCreateSubCat = () => {
        rows.find(row => row.id === catId)?.subcats?.push(
            createData(
                rows.length + 100,
                `'Sub cat' ${rows.length + 100}`,
                subCat,
                'VISA ⠀•••• 5919',
                212.79,
              )
        );
        console.log('subcat', rows, rows.find(row => row.id === catId)?.subcats)
        setCats(rows)
        setOpenSubCatModel(false)
    }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Categories
      </Typography>
      <Button variant="contained" onClick={handleClickOpen}>Create Category</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="email"
            fullWidth
            variant="standard"
            value={name}
            onChange={(ev) => {handleChange(ev)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>CreatedDate</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cats.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                  {row.name}
                  {console.log(row)}
                  {row.subcats?.length && 
                  row.subcats.map(sub => (
                      <li key={sub.id}>{sub.name}</li>
                  ))}
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                  <DeleteForeverIcon onClick={(ev) => handleDelete(ev, row.id)} />
                  <Button onClick={() => handleOpenSubcat(row.id)}>add subcategory
                  
                  </Button>
                  
            </TableCell>
            </TableRow>
          ))}
          <Dialog open={openSubcatModal} onClose={handleCloseSubCat}>
                    <DialogTitle>Create Subcategory</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Title"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={subCat}
                        onChange={(ev) => {handleChangeSubCat(ev)}}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseSubCat}>Cancel</Button>
                    <Button onClick={() => handleCreateSubCat()}>Create</Button>
                    </DialogActions>
                </Dialog>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}