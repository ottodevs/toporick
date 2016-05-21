import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import createDocument from '../store/createDocument';

import log from 'loglevel';

import DocMini from './docMini.jsx';

const DocList = ({items, onCreate}) => {

    var table = <table className="table">
        <thead>
            <tr>
                <th>Index</th>
                <th>ID</th>
                <th>Author</th>
                <th>Signatures</th>
            </tr>
        </thead>
        <tbody>
        {items.map( (doc) => {
            return <DocMini doc={doc} key={doc.idNumeric}/>;
        })}
        </tbody>
    </table>;

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Documents
                    <button className="btn btn-sm btn-default"
                            style={{marginLeft: "10px"}}
                            onClick={e => {e.preventDefault(); onCreate()}}><i className="fa fa-plus"/> Create Document</button>
                </h1>
            </div>
            <div className="col-md-12">
                {table}
            </div>
        </div>
    )
};

DocList.propTypes = {
    items: PropTypes.array.isRequired,
    onCreate: PropTypes.func.isRequired
};

const DocumentsList = connect(
    (state, ownProps) => {
        return {
            items: state.app.getIn(['docList', 'items']).toJS()
        }
    },
    (dispatch, ownProps) => {
        return {
            onCreate: () => {
                dispatch(createDocument())
            }
        }
    }
)(DocList);

export default DocumentsList