import React, { Component } from 'react';
import Header from "../../header";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import './admindashboard.scss';
import API from '../../../utils/api';

class Admindashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: ''
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
            console.log('response: ', response.data);
            if (response.data.code === 200) {
                if (response.data.count > 0) {
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
                                                        <Button variant="contained" color="primary">
                                                            Primary
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Grid>
                </Grid>

            </div>
        );

    }

};

export default Admindashboard;