import React, { Component } from 'react';
import Header from "../../header";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './admindashboard.scss';
import API from '../../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import Fab from "@material-ui/core/Fab";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DoneOutlineSharpIcon from '@material-ui/icons/DoneOutlineSharp';
import Adminfunctionmodal from '../adminFunctionModal'

class Admindashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: '',
            functionData: [],
            isRedirect: true
        }
    }

    handlefunctionUpdate = async (functionRow) => {
        try {
            let url = `/api/search/parameters?id=${functionRow._id}`;
            let headers = {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("authToken")
            };
            const response = await API.get(url, {
                headers: headers
            });
            if (response.data.code === 200) {
                let { data } = response.data;
                data = {
                    ...data,
                    'functionName': functionRow.functionName,
                    'keyword': functionRow.keyword,
                    'type': functionRow.type.charAt(0).toUpperCase() + functionRow.type.slice(1)
                };
                this.setState({
                    functionData: data
                }, () => {
                    this.props.history.push({
                        pathname: '/admin/update',
                        state: { 'functionData': this.state.functionData, 'functionId': functionRow._id }
                    })
                });
            }
        } catch (ex) {
        }
    };

    rejectFunctionRequest = async (functionId, index) => {
        let data = this.state.data;
        let body = {
            'id': functionId
        };
        let headers = {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("authToken")
        };
        console.log(headers, 'sfsf', body);
        const response = await API.post("/api/user/delete", body, { headers });
        console.log(response);
        if (response.data.code === 200) {
            data.splice(index, 1);
            this.setState({ 'data': data });
            toast.success("Function Removed");
        }
    }

    approveFunctionRequest = async (functionId, index) => {
        let data = this.state.data;
        let body = {
            'id': functionId
        }
        let headers = {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("authToken")
        };
        const response = await API.put("/api/user/verified", body, { headers });
        if (response.data.code === 200) {
            data.splice(index, 1);
            this.setState({ 'data': data });
            toast.success("Function Approved");
        }
    }

    async componentDidMount() {
        try {
            let headers = {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("authToken")
            };
            const response = await API.get("/api/user/getunverified", {
                headers: headers
            });
            if (response.data.code === 200) {
                if (response.data.count >= 0) {
                    this.setState({
                        data: response.data.data.user,
                        loading: false
                    })
                }
            }
        } catch (ex) {

        }
    }

    render() {
        const { data, loading, error } = this.state;
        return (
            <div>
                <Header />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className="paper">
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell >Function Name</TableCell>
                                        <TableCell >Type</TableCell>
                                        <TableCell >User</TableCell>
                                        <TableCell >Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        loading ? (<span className="loading">Loading...</span>) :
                                            data.map((row, index) => (
                                                <TableRow key={row.id}>
                                                    <TableCell >{index + 1}</TableCell>
                                                    <TableCell >{row.functionName}</TableCell>
                                                    <TableCell >{row.type}</TableCell>
                                                    <TableCell >{row.user}</TableCell>
                                                    <TableCell >
                                                        <Fab className='actionButton' onClick={() => { this.handlefunctionUpdate(row) }}>
                                                            <EditSharpIcon color="primary" />
                                                        </Fab>
                                                        <Fab className='actionButton' onClick={() => { this.approveFunctionRequest(row._id, index) }}>
                                                            <DoneOutlineSharpIcon color="primary"
                                                                className="iconbtn" />
                                                        </Fab>
                                                        <Fab className='actionButton' onClick={() => { this.rejectFunctionRequest(row._id, index) }}>
                                                            <DeleteForeverIcon
                                                                color="secondary"
                                                                className="iconbtn" />
                                                        </Fab>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                            <ToastContainer />
                        </div>
                    </Grid>
                </Grid>
            </div>
        );

    }

};

export default Admindashboard;