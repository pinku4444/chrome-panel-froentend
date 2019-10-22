import React, { Component, Fragment } from 'react'
import CKEditor from 'ckeditor4-react';
import './dashboard.css';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { API } from '../../utils';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

class DashBoard extends Component {
	constructor(props) {
		super(props);
		this.schema = yup.object().shape({
			functionName: yup.string().required("Function name is required"),
			tags: yup.string().required("Tags is required"),
			definition: yup.string().required("Definition is required"),
			syntax: yup.string().required("Syntax is required"),
			example: yup.string().required("example is required"),
			output: yup.string().required("output is required")
		});
		this.state = {
			'functionName': '',
			'tags': '',
			'definition': '',
			'syntax': '',
			'example': '',
			'output': '',
			'globalError': '',
			'errors': {
				'functionNameError': '',
				'tagsError': '',
				'definitionError': '',
				'syntaxError': '',
				'exampleError': '',
				'outputError': ''
			},
			'params': [],
			'functionType': 'Predefined'
		}
	}
	handleAddTextfield = index => evt => {
		const newparams = this.state.params.map((keys, textIndex) => {
			if (index !== textIndex)
				return keys;
			return { ...keys, [evt.target.name]: evt.target.value };
		});
		this.setState({ params: newparams });
	};
	AddTextfield = () => {
		this.setState({
			params: this.state.params.concat([{ argument: "" }])
		});
	};
	RemoveTextfield = idx => () => {
		this.setState({
			params: this.state.params.filter((s, sidx) => idx !== sidx)
		});
	};
	handleValidation = async (event) => {
		event.preventDefault();
		const { functionName, tags, definition, syntax, example, output } = this.state;
		let dataWithNoError = {
			'functionNameError': '',
			'tagsError': '',
			'definitionError': '',
			'syntaxError': '',
			'exampleError': '',
			'outputError': ''
		}
		try {
			this.setState({
				errors: {
					...dataWithNoError
				}
			})
			const data = {
				functionName,
				tags,
				definition,
				syntax,
				example,
				output
			};
			const formData = await this.schema.validate(data, { abortEarly: false, stripUnknown: true });
			this.submitHanlder();
		} catch (ValidationError) {
			console.log("errors", ValidationError);
			if (ValidationError.inner !== undefined) {
				const errors = ValidationError.inner;
				errors.map((error) => {
					let key = `${[error.path]}Error`;
					console.log('key: ', key);
					dataWithNoError = { ...dataWithNoError, [key]: error.message }
				});
				this.setState({
					errors: {
						...dataWithNoError
					}
				})
			}
		}
	}
	onChangeHandle = (event) => {
		if (typeof event.target === 'undefined') {
			if (event.editor.name === 'editor1') {
				this.setState({
					example: event.editor.getData()
				});
			} else {
				this.setState({
					output: event.editor.getData()
				});
			}
		} else {
			this.setState({ [event.target.name]: event.target.value });
		}
	}
	submitHanlder = async () => {
		let keywords = this.state.tags.split(",");
		let postBody = {
			functionName: this.state.functionName,
			keyword: keywords,
			definition: this.state.definition,
			syntax: this.state.syntax,
			example: this.state.example,
			output: this.state.output,
			param: this.state.params,
			type: "custom"
		};
		try {
			let headers = {
				"Content-Type": "application/json",
				authorization: localStorage.getItem("authToken")
			};
			const response = await API.post("/api/user/post", postBody, {
				headers: headers
			});
			console.log("response", response);
			if (response.data.code !== 200) {
				toast.error(response.data.message);
			} else {
				this.setState({
					functionName: "",
					tags: "",
					definition: "",
					syntax: "",
					example: "",
					output: "",
					globalError: "",
					params: []
				});
				toast.success("Function added successfully");
			}
		} catch (ex) { }
	};
	render() {
		const { functionNameError, tagsError, definitionError, syntaxError, outputError, exampleError } = this.state.errors;
		return (
			<Fragment>
				<Header />
				<Grid container spacing={3}>
					<Grid item xs={12} md={3}>
					</Grid>
					<Grid item xs={12} md={6}>
						<div>
							<form className="form"  >
								<TextField
									required="true"
									onChange={this.onChangeHandle}
									label="Function Name"
									placeholder="array.join()"
									margin="normal"
									variant="outlined"
									name="functionName"
									id="functionName"
									autoComplete="functionName"
									autoFocus
									value={this.state.functionName}
								/>
								{functionNameError !== '' ? (<h4 className="errorMsg">{functionNameError}</h4>) : null}
								<div className='typebtn'>
									<FormControl component="fieldset">
										<FormLabel component="legend"> Funtion Type</FormLabel>
										<RadioGroup aria-label="type"
											name="functionType"
											className='typebtn'
											value={this.state.functionType}
											onChange={this.onChangeHandle}>
											<FormControlLabel value="Predefined" control={<Radio />} label="Predefined" />
											<FormControlLabel value="Custom" control={<Radio />} label="Custom" />
										</RadioGroup>
									</FormControl>
								</div>
								<TextField required
									label="Tags"
									onChange={this.onChangeHandle}
									placeholder="Tags separated by comma for example : join,array"
									value={this.state.tags}
									margin="dense"
									variant="outlined"
									name="tags"
									id="mui-theme-provider-outlined-input"
									className='margin'
								/>
								{tagsError !== '' ? (<h4 className="errorMsg">{tagsError}</h4>) : null}
								<TextField
									onChange={this.onChangeHandle}
									rows={7}
									rowsMax={7}
									label="Definition"
									variant="outlined"
									placeholder=" DEFINITION=  The join() method returns the array as a string."
									value={this.state.definition}
									margin="normal"
									name="definition"
								/>
								{definitionError !== '' ? (<h4 className="errorMsg">{definitionError}</h4>) : null}
								<TextField required
									onChange={this.onChangeHandle}
									label="Syntax"
									value={this.state.syntax}
									placeholder="array.join(separator)"
									margin="normal"
									variant="outlined"
									name="syntax"
								/>
								{syntaxError !== '' ? (<h4 className="errorMsg">{syntaxError}</h4>) : null}
								<span className='addbtn'>
									<Fab
										color="primary"
										aria-label="add"
										size="small"
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
											value={element.argument}
											name="argument"
											onChange={this.handleAddTextfield(index)}
										/>
										<TextField className="paramTex2"
											placeholder={`Discription #${index + 1}`}
											name="desc"
											value={element.desc}
											onChange={this.handleAddTextfield(index)}
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
									name="example"
									data={this.state.example}
									onChange={this.onChangeHandle}
								/>
								{exampleError !== '' ? (<h4 className="errorMsg">{exampleError}</h4>) : null}
								<br />
								<span className='editorText'>
									<b> Output </b>
								</span>
								<CKEditor
									data={this.state.output}
									name="output"
									onChange={this.onChangeHandle}
								/>
								{outputError !== '' ? (<h4 className="errorMsg">{outputError}</h4>) : null}
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
							<ToastContainer />
						</div>
					</Grid>
					<Grid item xs={12} md={3}>
					</Grid>
				</Grid>
			</Fragment>
		)
	}
}
export default DashBoard;
