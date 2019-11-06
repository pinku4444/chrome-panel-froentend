import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Dashboard from '../../dashboard'
import { blockStatement } from '@babel/types';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        overflow: 'scroll',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(0, 0, 3),
    },
}));

export default function Adminfunctionmodal(props) {
    console.log(props);
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.isModalOpen}
                onClose={props.handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.isModalOpen}>
                    <div className={classes.paper}>
                        <Dashboard functionData={props.functionData} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}