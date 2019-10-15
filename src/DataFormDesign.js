import React from 'react';
import './App.css';
import CKEditor from "react-ckeditor-component";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';






const DataFormDesign = (props) => {
  // const documents =props.documents.map((Element, index) => {
  //     return <Element key={ index } index={ index } />
  //   });
  //   const discription = props.discription.map((Element, index) => {
  //     return <Element key={ index } index={ index } />
  //   });



  // const documents = props.parameters.map((Element, index) => {
  //     return <Element key={ index } index={ index } />
  //   });
  //   const discription = props.parameters.map((Element, index) => {
  //     return <Element key={ index } index={ index } />
  //   });


  console.log('propsssssss:::::::', props);


  return (

    <div className="App">
      <form className="form" >
        <TextField required
          onChange={props.onChangeHandle}
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
        <TextField required label="Tags"
          onChange={props.onChangeHandle}
          placeholder="join"
          defaultValue=""
          margin="normal"
          variant="outlined"
          name="tags"
        />
        <TextareaAutosize
          onChange={props.onChangeHandle}
          rowsMax={4} aria-label="maximum height"
          label="Definition"
          placeholder=" DEFINITION=  The join() method returns the array as a string." variant="outlined"
          defaultValue=""
          name="definition"
        />
        <TextField required
          onChange={props.onChangeHandle}
          label="Syntax"
          defaultValue=""
          placeholder="array.join(separator)"
          margin="normal"
          variant="outlined"
          name="syntax"
        />

        <button onClick={props.add}>Add Parameters</button>
        <div className="param">
          {/* <span className="span"> { documents }{ discription } </span> <br/> */}
        </div>



        <TextField required
          onChange={props.onChangeHandle}
          label="Parameters"
          defaultValue=""
          placeholder="separator:=Optional. The separator to be used. If omitted, the elements are separated with a comma"
          margin="normal"
          variant="outlined"
          name="params"
        />

        Example <CKEditor
          // data={this.state.data}
          onChange={props.onEditorChange} /><br />

        Output <CKEditor
          name='output'
          className="examples">
        </CKEditor><br />

        < Button
          variant="contained"
          onClick={props.onSubmit}
          size="large"
          color="primary"
          startIcon={<SaveIcon />}>
          Save
          </Button>
      </form>



      {/* <h5> try</h5>
{props.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <input
              type="text"
              placeholder={`Shareholder #${idx + 1} name`}
              value={shareholder.name}
              onChange={props.handleShareholderNameChange(idx)}
            />
            <button
              type="button"
              onClick={props.handleRemoveShareholder(idx)}
              className="small"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={props.handleAddShareholder}
          className="small"
        >
          Add Shareholder
        </button>

 */}






      {/* <Button
        onClick={() => {
          setTimeout(() => {
            textInput.current.focus();
          }, 100);
        }}
      >
        Focus TextField
      </Button>
      <TextField
        fullWidth
        required
        inputRef={textInput}
        name="firstName"
        type="text"
        placeholder="Enter Your First Name"
        label="First Name"
      /> */}

    </div>

  )
}
export default DataFormDesign;