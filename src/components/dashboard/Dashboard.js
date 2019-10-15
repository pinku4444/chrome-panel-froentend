import React, { Component } from 'react'
import { stat } from 'fs';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';
import './dashboard.css';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { API } from '../../utils';


class DashBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'functionName': '',
			'tags': '',
			'definition': '',
			'syntax': '',
			'example': '',
			'output': '',
			'errorMsg': '',
			'formIsValid': true,
			'params': [],
		}

	}
	onEditorChange = (evt) => {
		this.setState({
			example: evt.editor.getData()
		});
	}
	onEditorChangeOutput = (evt) => {
		this.setState({
			output: evt.editor.getData()
		});
	}

	handleChange(changeEvent) {
		this.setState({
			data: changeEvent.target.value
		});
	}
	handleShareholderNameChange = idx => evt => {
		const newShareholders = this.state.params.map((shareholder, sidx) => {
			if (idx !== sidx) return shareholder;
			return { ...shareholder, name1: evt.target.value };
		});

		this.setState({ params: newShareholders });
	};
	handleShareholderName2Change = idx => evt => {
		const newShareholders = this.state.params.map((shareholder, sidx) => {
			if (idx !== sidx) return shareholder;
			return { ...shareholder, name2: evt.target.value };
		});

		this.setState({ params: newShareholders });
	};

	handleAddShareholder = () => {
		this.setState({
			params: this.state.params.concat([{ name1: "" }])
		});
	};

	handleRemoveShareholder = idx => () => {
		this.setState({
			params: this.state.params.filter((s, sidx) => idx !== sidx)
		});
	};

	handleValidation = (event) => {
		event.preventDefault();
		const functionName = this.state.functionName;
		const tags = this.state.tags;
		const definition = this.state.definition;
		const syntax = this.state.syntax;
		const example = this.state.example;
		const output = this.state.output;
		let errorMsg = '';
		let formIsValid = true;

		if (functionName == '') {
			formIsValid = false;
			errorMsg = " Function Name Cannot be empty";
		} else if (tags === '') {
			formIsValid = false;
			errorMsg = " Tags Cannot be empty";
		} else if (definition === '') {
			formIsValid = false;
			errorMsg = " definition Cannot be empty";
		} else if (syntax === '') {
			formIsValid = false;
			errorMsg = " syntax Cannot be empty";
		} else if (example === '') {
			formIsValid = false;
			errorMsg = " example Cannot be empty";
		} else if (output === '') {
			formIsValid = false;
			errorMsg = " output Cannot be empty";
		} else {
			formIsValid = true;
			errorMsg = "";
		}
		this.setState({ 'errorMsg': errorMsg, 'formIsValid': false }, () => {
			this.submitHanlder();
		});


	}



	onChangeHandle = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}
	submitHanlder = () => {
		const { formIsValid, errorMsg } = this.state;
		console.log('checked::::::', this.state);
		if (formIsValid) {
			try {

			}catch(ex) {
				
			}
		} else {
			alert("Form has errors." + errorMsg);

		}
	}

	render() {
		console.log('props:::::::', this.state);
		console.log('props data:::::::', this.state.data);

		return (
			<div className="App">
				<form className="form"  >
					<TextField
						required="true"
						onChange={this.onChangeHandle}
						label="Function Name"
						placeholder="array.join()"
						defaultValue=""
						margin="normal"
						variant="outlined"
						name="functionName"
						id="functionName"
						autoComplete="functionName"
						autoFocus
					/>
					{/* <p item xs>              
               Multiple Keys separated by comma (,)
                 </p>             */}
					<TextField required
						label="Tags and Multiple Tags separated by comma (,)"
						onChange={this.onChangeHandle}
						placeholder="join"
						defaultValue=""
						margin="normal"
						variant="outlined"
						name="tags"
					/>
					<TextareaAutosize
						className="textarea"
						onChange={this.onChangeHandle}
						rows={7}
						rowsMax={7}
						// aria-label="maximum height"
						label="Definition"
						placeholder=" DEFINITION=  The join() method returns the array as a string."
						// variant="outlined"
						defaultValue=""
						name="definition"
					/>
					<TextField required
						onChange={this.onChangeHandle}
						label="Syntax"
						defaultValue=""
						placeholder="array.join(separator)"
						margin="normal"
						variant="outlined"
						name="syntax"
					/>
					{/* <button
            type="button"
            onClick={this.handleAddShareholder}
            className="small"
          > Add parameters
           </button><br></br> */}


					<span className='addbtn1'>
						<Fab
							color="primary"
							aria-label="add"
							onClick={this.handleAddShareholder}
							className="addbtn1"
						>
							<AddIcon />
						</Fab>
						<span className='addbtn'> <b> Add parameters  </b>
						</span>
					</span>


					{this.state.params.map((shareholder, idx) => (
						<div className="shareholder">
							<TextField className="tex1"
								placeholder={`Arguments #${idx + 1}`}
								value={shareholder.name1}
								onChange={this.handleShareholderNameChange(idx)}
							/>
							<TextField className="tex2"
								placeholder={`Discription #${idx + 1}`}
								value={shareholder.name2}
								onChange={this.handleShareholderName2Change(idx)}
							/>
							<button
								type="button"
								onClick={this.handleRemoveShareholder(idx)}
								className="small1"
							>
								-
							</button>
						</div>
					))}<br />
					<span className='exText'><b> Example </b></span><CKEditor
						// data={this.state.data}
						onChange={this.onEditorChange} ></CKEditor>
					<br />
					<span className='exText'>
						<b> Output </b>
					</span>
					<CKEditor onChange={this.onEditorChangeOutput} />


					< Button
						className="btn"
						variant="contained"
						onClick={this.handleValidation}
						size="large"
						color="primary"
						startIcon={<SaveIcon />}>
						Save
          </Button>
				</form>




			</div>
		)
	}
}


export default DashBoard;

