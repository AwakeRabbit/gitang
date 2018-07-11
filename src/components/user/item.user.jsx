import React from 'react'
import {Link} from 'react-router-dom'

const UserItem = (props) => <Link to={`/user/${props.login}`} className="item user">
    <div className="user_block">
        <img src={props.avatar_url} alt={props.login} />
        <div className="name"><b>{props.login}</b></div>           
        {(props.score) ? <div className="score" title="score"><label>score</label> {props.score.toFixed(0)}</div> : false}
    </div>
</Link>

export default  UserItem