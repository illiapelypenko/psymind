import React, { useState, useEffect } from 'react';
import {
	withStyles,
	Theme,
	createStyles,
	makeStyles
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const StyledTableCell = withStyles(theme =>
	createStyles({
		head: {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.common.white,
			align: 'center'
		},
		root: {
			fontSize: 16,
			'&:nth-of-type(5n)': {
				width: '5%'
			},
			'&:nth-of-type(5n-1)': {
				width: '5%'
			},
			'&:nth-of-type(5n-2)': {
				width: '15%'
			},
			'&:nth-of-type(5n-3)': {
				width: '45%'
			},
			'&:nth-of-type(5n-4)': {
				width: '30%'
			},
			spellcheck: false
		}
	})
)(TableCell);

const StyledTableRow = withStyles(theme =>
	createStyles({
		root: {
			'&:nth-of-type(odd)': {}
		}
	})
)(TableRow);

const useStyles = makeStyles({
	tableContainer: {},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end'
	},
	button: {},
	icon: {
		'& svg': {
			cursor: 'pointer'
		},
		'& svg:hover': {
			color: '#f57c00'
		}
	}
});

const initialTable = [
	{
		event: 'event 1',
		thought: 'thought 1',
		reaction: 'reaction 1'
	},
	{
		event: 'event 2',
		thought: 'thought 2',
		reaction: 'reaction 2'
	},
	{
		event: 'event 3',
		thought: 'thought 3',
		reaction: 'reaction 3'
	}
];

export default function CustomizedTables() {
	const classes = useStyles();
	const [table, setTable] = useState([]);
	const [event, setEvent] = useState('');
	const [thought, setThought] = useState('');
	const [reaction, setReaction] = useState('');

	useEffect(() => {
		setTable(getTable());
	}, []);

	const getTable = () => {
		return initialTable;
	};

	const handleAddRow = e => {
		table.push({
			event,
			thought,
			reaction
		});

		setEvent('');
		setThought('');
		setReaction('');
	};

	const handleDeleteRow = (e, index) => {
		const newTable = table.slice();
		newTable.splice(index, 1);
		setTable(newTable);
	};

	const handleEditRow = (e, index) => {
		//set edition
		setEvent(table[index].event);
		setThought(table[index].thought);
		setReaction(table[index].reaction);

		// delete row
		const newTable = table.slice();
		newTable.splice(index, 1);
		setTable(newTable);
	};

	return (
		<TableContainer component={Paper} className={classes.tableContainer}>
			<Table aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell align='center'>Event</StyledTableCell>
						<StyledTableCell align='center'>Thought</StyledTableCell>
						<StyledTableCell align='center'>Reaction</StyledTableCell>
						<StyledTableCell align='center'></StyledTableCell>
						<StyledTableCell align='center'></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{table.map((row, index) => (
						<StyledTableRow key={index} hover>
							<StyledTableCell>{row.event}</StyledTableCell>
							<StyledTableCell>{row.thought}</StyledTableCell>
							<StyledTableCell>{row.reaction}</StyledTableCell>
							<StyledTableCell align='center' className={classes.icon}>
								<DeleteIcon onClick={e => handleDeleteRow(e, index)} />
							</StyledTableCell>
							<StyledTableCell align='center' className={classes.icon}>
								<EditIcon onClick={e => handleEditRow(e, index)} />
							</StyledTableCell>
						</StyledTableRow>
					))}

					<StyledTableRow key={-1}>
						<StyledTableCell>
							<TextField
								id='outlined-basic'
								variant='outlined'
								multiline
								fullWidth
								value={event}
								onChange={e => setEvent(e.target.value)}
							/>
						</StyledTableCell>
						<StyledTableCell>
							<TextField
								id='outlined-basic'
								variant='outlined'
								multiline
								fullWidth
								value={thought}
								onChange={e => setThought(e.target.value)}
							/>
						</StyledTableCell>
						<StyledTableCell>
							<TextField
								id='outlined-basic'
								variant='outlined'
								multiline
								fullWidth
								value={reaction}
								onChange={e => setReaction(e.target.value)}
							/>
						</StyledTableCell>
						<StyledTableCell></StyledTableCell>
						<StyledTableCell align='right'>
							<Button
								onClick={handleAddRow}
								variant='contained'
								color='primary'
								className={classes.button}>
								<span>Add</span>
								<AddIcon />
							</Button>
						</StyledTableCell>
					</StyledTableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
