import React, { Component } from 'react'
import { stat } from 'fs';
import DataFormDesign from './DataFormDesign';
// import CKEditor from "react-ckeditor-component";
import TextField from '@material-ui/core/TextField';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';




class DocumentInput extends React.Component {
  render() {
    return <input style={divStyle} type="TextField" placeholder="Argument"
      name={`document-${this.props.index}-document`} />;

  }

}
class DocumentInput1 extends React.Component {
  render() {
    return <input style={divStyle} type="TextField" placeholder="discription"
      name1={`document-${this.props.index}-document`} />;

  }

}
const divStyle = {
  border: '1px solid grey',
  flexdirection: 'row'

};


export default class DataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'functionName': '',
      'tags': '',
      'definition': '',
      'syntax': '',
      'params': '',
      'example': '',
      'output': '',
      documents: [],
      discription: [],
      data: '',
      parameters: [
        {
          'params': '', 'desc': ''
        },
        {}, {}, {}
      ],
      shareholders: [{
        name1: "",
        name2: ""
      }]


    }

  }
  onEditorChange = (evt) => {
    console.log('sds');
    this.setState({
      example: evt.editor.getData()
    });
  }

  handleChange(changeEvent) {
    this.setState({
      data: changeEvent.target.value
    });
  }
  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };



  onChangeHandle = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  onSubmit = (event) => {
    event.preventDefault();
    console.log('checked::::::', this.state);
  }

  focusTextInput = () => {
    this.textInput.current.focus();
  }

  add = () => {
    const documents = this.state.parameters[0].params.concat(DocumentInput);
    const discription = this.state.parameters[0].desc.concat(DocumentInput1);
    this.setState({ documents, discription });
  }
  // add = () => {
  //     const documents = this.state.definition.concat(DocumentInput);
  //     const discription = this.state.discription.concat(DocumentInput1);
  //     this.setState({ documents,discription });
  //   }





  render() {
    console.log('props:::::::', this.state);
    console.log('props data:::::::', this.state.data);

    return (
      <div>
        <DataFormDesign onChangeHandle={this.onChangeHandle}
          functionName={this.state.functionName}
          tags={this.state.tags} definition={this.state.definition}
          syntax={this.state.syntax}
          params={this.state.params}
          example={this.state.example}
          output={this.state.output}
          onSubmit={this.onSubmit}
          documents={this.state.documents}
          discription={this.state.discription}
          add={this.add}
          parameters={this.state.parameters.desc}
          parameters={this.state.parameters.params}
          onEditorChange={this.onEditorChange}
          data={this.state.data}
          handleShareholderNameChange={this.handleShareholderNameChange}
          handleAddShareholder={this.handleAddShareholder}
          handleRemoveShareholder={this.handleRemoveShareholder}
        />

        <h4>Shareholders</h4>

        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <input
              type="text"
              placeholder={`Shareholder #${idx + 1} name`}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="small"
            >
              -
    </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddShareholder}
          className="small"
        >
          Add Shareholder
</button>


        {/* <h2>Using CKEditor 4 in React</h2>
                <CKEditor
                    data="<p>try</p>"
                  
                    onChange={evt => console.log( evt ) }

                /> */}
        {/* <CKEditor
                    // data={this.state.data}
                    onChange={this.onEditorChange} /> */}
        {/* <EditorPreview data={this.state.data} /> */}

      </div>
    )
  }
}
// class EditorPreview extends Component {
//   render() {
//       return (
//           <div className="editor-preview">
//               <h2>Rendered content</h2>
//               <div dangerouslySetInnerHTML={ { __html: this.props.data } }></div>
//           </div>
//       );
//   }
// }
// EditorPreview.defaultProps = {
//   data: ''
// };

// EditorPreview.propTypes = {
//   data: PropTypes.string
// };
