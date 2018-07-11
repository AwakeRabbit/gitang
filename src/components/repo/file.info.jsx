import React from 'react'
const FileInfo = (props) => <div className={props.expanded ? 'file_info expanded' : 'file_info'} onClick={e => e.stopPropagation()}>
    <div className="body">
        <header onClick={(e) => { props.onClose(); e.stopPropagation() }}>{props.fileName}</header>
        {props.fileName.substring(props.fileName.length - 3) === '.md' ? <section className='md' dangerouslySetInnerHTML={props.content.toHtml()}></section> : <section>{formatInfo(props)}</section>}
    </div>
</div>
export default FileInfo

const formatInfo = (file) => {
    let ext = file.fileName.substring(file.fileName.length - 3)

    switch (ext) {
        case 'jpg':
        case 'png':
        case 'svg':
        case 'gif':
        case 'ico':
            return <img src={`data:image/${ext};base64,` + btoa(file.content)} />
        default:
            return file.content || 'This file is empty'

    }
}