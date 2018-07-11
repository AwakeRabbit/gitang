import React from 'react'
import { Link } from 'react-router-dom'
import {ICONS} from '../../constants'
import '../../utils'

const RepoItem = (props) => <Link to={(props.full_name && props.full_name.length > 0) ? `/repo/${props.full_name}` : '#'} className="item repo">
    <div className={props.fork ? 'is_fork fork' : 'is_fork'} title={props.fork ? 'It\'s a fork' : `It's a repositoryu created by ${(props.owner.name || props.owner.login)}`}>
        {props.fork  ? ICONS.FORK : ICONS.OWN}
    </div>
    <h2 className="item_title">
        {props.name}
    </h2>
    <h4>{props.full_name}</h4>
    <div className="item_description">
        {(props.description && props.description.length > 0) ? (props.description.length > 300 ? props.description.substr(0, 300) + '...' : props.description) : 'No description...'}
    </div>
    <div className={props.stargazers_count > 0 ? 'stars' : 'stars small'}>
        {props.stargazers_count}
        <div className={props.forks > 0 ? 'forks' : 'forks small'}>
            <svg aria-label="forks" className="octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>

            {props.forks}
        </div>
        {(props.language) ? <div className="language">{props.language}</div> : false}
    </div>
    <div className="user_block">
        <div className="name">by <b>{props.owner.login}</b>
            <img src={props.owner.avatar_url} alt={props.owner.login} />
        </div>
    </div>
</Link>

export default RepoItem