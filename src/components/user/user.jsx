import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/actions'
import RepoItem from '../repo/item.repo.jsx'
import UserItem from './item.user.jsx'
import { USER_ACTIONS } from '../../constants';


class User extends Component {
    constructor(props) {
        super(props)
        const text = <div className="fake_text"></div>
        this.defaultMember = {
            name: text,
            login: text,
            avatar_url: "/logo.png",
            repos: [
                { id: 1, full_name: text, name: text, description: text, stargazers_count: 0, forks: 0, owner: { login: text, avatar_url: "/logo.png" } },
                { id: 2, full_name: text, name: text, description: text, stargazers_count: 0, forks: 0, owner: { login: text, avatar_url: "/logo.png" } },
                { id: 3, full_name: text, name: text, description: text, stargazers_count: 0, forks: 0, owner: { login: text, avatar_url: "/logo.png" } }
            ],
        }

        window.addEventListener('hashchange', this.checkHashChange.bind(this))
        this.state = { following: false, activeTab: 'repos' }
    }

    componentDidMount() {
        this.getUser();
    }

    checkHashChange() {
        if (this.props.match.params.name != this.memberName) {
            this.getUser();
        }
    }

    componentWillReceiveProps(nextProps) {
        document.querySelector('title').innerText = (nextProps.member.name || nextProps.member.login || '') + ' | GitYap'
        this.setState({ following: false })
    }

    getUser() {
        this.props.dispatch({ type: USER_ACTIONS.GET_USER, member: this.defaultMember })
        this.memberName = this.props.match.params.name;
        this.setState({activeTab: 'repos'})
        this.props.getMember(this.memberName)
    }

    render() {
        const { member, user } = this.props;
        const { following, activeTab } = this.state
        let publicName = member.name || member.login || ''

return <div className="user_profile">
            {(user.isAuth && user.id !== member.id && member.id > 0) ? (member.isFollowing) ?
                <button onClick={e => { this.setState({ following: true }); this.props.unfollowMember(member.login) }} className={following ? 'white loading' : 'white'}>Unfollow</button> :
                <button onClick={e => { this.setState({ following: true }); this.props.followMember(member.login) }} className={following ? 'loading' : ''}>Follow</button>
                : false}
            <img className="user_profile_image" src={member.avatar_url} alt={member.name} />
            <h1>{member.name}<b>{member.login}</b></h1>
            <a href={member.html_url} target="_blank">View Profile on GitHub</a>
            <br style={{clear: 'both'}}/>
            <div className="tabs">
                <div className={activeTab === 'repos' ? 'tab active' : 'tab'} onClick={e => this.setState({activeTab: 'repos'})}>Repositories</div>
                <div className={activeTab === 'following' ? 'tab active' : 'tab'} onClick={e => this.setState({activeTab: 'following'})}>Following</div>
                <div className={activeTab === 'followers' ? 'tab active' : 'tab'} onClick={e => this.setState({activeTab: 'followers'})}>Followers</div>
            </div>
            <div className="list">
                {(activeTab === 'repos') ? (member.repos || []).map(i => <RepoItem key={i.id} {...i} />) : false}
                {(activeTab === 'following') ? (member.following_list || []).map(i => <UserItem key={i.id} {...i} />) : false}
                {(activeTab === 'followers') ? (member.followers_list || []).map(i => <UserItem key={i.id} {...i} />) : false}
            </div>
        </div>
    }
}

export default connect(store => ({
    user: store.user,
    member: store.member
}),
    dispatch => ({
        getMember: (memberName) => dispatch(actions.getMember(memberName)),
        followMember: (memberName) => dispatch(actions.followMember(memberName)),
        unfollowMember: (memberName) => dispatch(actions.unfollowMember(memberName)),
        dispatch: dispatch

    }))(User) 