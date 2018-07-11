import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions/actions'
import { ICONS, SORTS } from '../../constants';
import {FileItem as ConnectedFileItem, FileInfo} from '../'
class FileItem extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {expanded: false}
    }

    itemClick(...params) {
        if (this.props.contents) {
            this.setState({expanded: !this.state.expanded})
        } else {
            this.props.getContent(...params)
            this.setState({expanded: true})            
        }
    }

    render() {
        const item = {...this.props}
        return <div className={item.type} onClick={e => {this.itemClick(item.repoName, item.path, item.type); e.stopPropagation()}}>
            {item.type === 'dir' ? ICONS.FOLDER : ICONS.FILE}<b>{item.name}</b>
            {(Array.isArray(item.contents)) ? 
                <div className={this.state.expanded ? 'file_list expanded' : 'file_list'}>
                    {item.contents
                        .sort(SORTS.FILE_SORT)
                        .map(i => <ConnectedFileItem key={i.sha} {...i} repoName={item.repoName} /> )}
                </div> : (item.contents && item.contents.length > 0) ? <FileInfo 
                                    expanded={this.state.expanded} 
                                    content={item.contents}
                                    fileName={item.name} 
                                    onClose={() => this.setState({expanded: false})} /> : false}
        </div>    
    }
}

export default connect(store => ({}), dispatch => ({getContent: (repoName, path, type) => dispatch(actions.getContent(repoName, path, type))}))(FileItem)