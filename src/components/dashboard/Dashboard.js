import React, { Component } from 'react'
import CKEditor from 'ckeditor4-react';
import './dashboard.css';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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
	onExampleEditorChange = (evt) => {
		this.setState({
			example: evt.editor.getData()
		});
	}
	onOutputEditorChange = (evt) => {
		this.setState({
			output: evt.editor.getData()
		});
	}
	handleChange(changeEvent) {
		this.setState({
			data: changeEvent.target.value
		});
	}
	handleAddTextfield1 = index => evt => {
		const newparams = this.state.params.map((keys, textIndex) => {
			if (index !== textIndex)
				return keys;
			return { ...keys, name1: evt.target.value };
		});
		this.setState({ params: newparams });
	};
	handleAddTextfield2 = index => evt => {
		const newparams = this.state.params.map((keys, textIndex) => {
			if (index !== textIndex)
				return keys;
			return { ...keys, name2: evt.target.value };
		});
		this.setState({ params: newparams });
	};
	AddTextfield = () => {
		this.setState({
			params: this.state.params.concat([{ name1: "" }])
		});
	};
	RemoveTextfield = idx => () => {
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

		if (functionName === '') {
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
		this.setState({ 'errorMsg': errorMsg, 'formIsValid': formIsValid }, () => {
			this.submitHanlder();
		});
	}
	onChangeHandle = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}
	submitHanlder = async () => {
		const { formIsValid, errorMsg } = this.state;
		if (formIsValid) {
			try {
				alert("Form save successfully.");
			} catch (ex) {

			}
		} else {
			alert("Form has errors." + errorMsg);

		}
	}
	render() {
		console.log('props:::::::', this.state);
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
						onChange={this.onChangeHandle}
						rows={7}
						rowsMax={7}
						label="Definition"
						placeholder=" DEFINITION=  The join() method returns the array as a string."
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
					<span className='addbtn'>
						<Fab
							color="primary"
							aria-label="add"
							onClick={this.AddTextfield}
							className="addFeb"
						>
							<AddIcon />
						</Fab>
						<span className='addParambtn'>
							<b> Add parameters  </b>
						</span>
					</span>
					{this.state.params.map((element, index) => (
						<div className="params">
							<TextField className="paramTex1"
								placeholder={`Arguments #${index + 1}`}
								value={element.name1}
								onChange={this.handleAddTextfield1(index)}
							/>
							<TextField className="paramTex2"
								placeholder={`Discription #${index + 1}`}
								value={element.name2}
								onChange={this.handleAddTextfield2(index)}
							/>
							<button
								type="button"
								onClick={this.RemoveTextfield(index)}
								className="removeBtn"
							>
								X
							</button>
						</div>
					))}<br />
					<span className='editorText'>
						<b> Example </b>
					</span>
					<CKEditor
						onChange={this.onExampleEditorChange} />
					<br />
					<span className='editorText'>
						<b> Output </b>
					</span>
					<CKEditor
						onChange={this.onOutputEditorChange}
					/>
					<Button
						className="btn"
						variant="contained"
						onClick={this.handleValidation}
						size="large"
						color="primary"
						startIcon={<SaveIcon />}
					>
						Save
         			</Button>
				</form>
			</div>
		)
	}
}
export default DashBoard;

