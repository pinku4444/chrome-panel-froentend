import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { API } from '../../utils';
import './login.css';



const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		// backgroundImage:url(""),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},

}));

export default function Login(props) {

	// checking user is logged in or not
	if(localStorage.getItem("authToken")) {
		props.history.push('/dashboard')
	}

	let schema = yup.object().shape({
		email : yup.string().email('please enter valid email').required(),
		password : yup.string().required("password is required").min(2, 'Please enter no more than 2 characters'),

	});

	const classes = useStyles(props);
	const [formData, setFormData] = useState({
		'email': '',
		'password': ''
	});
	const [isEmailError,setIsEmailError] = useState(false);
	const [emailError,seEmailError] = useState('');

	const [isPasswordError,setIsPasswordError] = useState(false);
	const [passwordError,sePasswordError] = useState('');

	const [isError,setIsError] = useState(false);
	const [error,setError] = useState('');

	useEffect(() => {
		
	}, [error])


	const formSubmitHandler = async (evt) => {
		evt.preventDefault();
		const data = {...formData};
		try {
			const loginData = await schema.validate(data,{abortEarly:false,stripUnknown:true});
			setIsEmailError(false);
			setIsPasswordError(false);
			const response = await API.post('/api/user/login',loginData);
			if(response.data.code === 401) {
				localStorage.removeItem("authToken");
				setIsError(true);
				setError(response.data.message);
			}else if(response.data.role && response.data.role === "admin"){
				localStorage.setItem("authToken",response.data.token);
				props.history.push('/admin')
			}else {
				localStorage.setItem("authToken",response.data.token);
				props.history.push('/dashboard')
			}


		}catch(ValidationError) {
			setIsEmailError(false);
			setIsPasswordError(false);
			if(ValidationError.inner !== undefined) {
				const errors = ValidationError.inner;
				errors.map((error) => {
					if(error.path === "email") {
						setIsEmailError(true);
						seEmailError(error.message)
						
					}else if(error.path === "password") {
						setIsPasswordError(true)
						sePasswordError(error.message);
					}

				})
			}
			
		}
		

	}

	const onChangeHandler = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}
	const { email, password } = formData;
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
        		</Typography>
				{isError ? (<h4 className="error">{error}</h4>) : null}
				<form onSubmit={formSubmitHandler}>
					<TextField
						onChange={onChangeHandler}
						variant="outlined"
						margin="normal"
						required={true}
						fullWidth
						value={email}
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					{isEmailError ? <span className="error">{emailError}</span> : null}
					<TextField
						onChange={onChangeHandler}
						variant="outlined"
						margin="normal"
						required={true}
						value={password}
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					{isPasswordError ? <span className="error">{passwordError}</span> : null}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
          </Button>
				</form>
			</div>
		</Container>
	);


}



