import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../actions/actions'
import { RepoItem, FileItem } from '../'
import { USER_ACTIONS, ICONS, REPO_ACTIONS, SORTS } from '../../constants'

class Repo extends Component {
    constructor(props) {
        super(props)

        const text = <div className="fake_text"></div>

        this.defaultModel = {
            name: text,
            full_name: text,
            contents: [],
            readMe: text
        }
        this.props.dispatch({ type: REPO_ACTIONS.GET_REPO, repo: this.defaultModel })

        window.addEventListener('hashchange', this.checkHashChange.bind(this))
    }

    componentDidMount() {
        this.getRepo();
    }

    checkHashChange() {
        const { username, reponame } = this.props.match.params
        if (`${username}/${reponame}` != this.repoName) {
            this.getRepo();
        }
    }

    getRepo() {
        const { username, reponame } = this.props.match.params
        this.repoName = `${username}/${reponame}`
        this.props.dispatch({ type: REPO_ACTIONS.GET_REPO, repo: this.defaultModel })
        this.props.getRepo(this.repoName)
    }

    componentWillReceiveProps(nextProps) {
        if (document.querySelector('title')) document.querySelector('title').innerText = (nextProps.repo.name) + ' | GitYap'
    }

    render() {
        const { repo } = this.props;
        return (repo.owner) ? <div className="repo_info">
            <div className={repo.stargazers_count > 0 ? 'stars' : 'stars small'}>
                {repo.stargazers_count}
                <div className={repo.forks > 0 ? 'forks' : 'forks small'}>
                    {ICONS.FORK}
                    {repo.forks}</div>
            </div>
            <h1>{repo.name}
                <b>{repo.full_name}</b>
                <label>Created at <span>{new Date(repo.created_at).toDateString()}</span></label>
                <a href={repo.html_url} target="_blank">View repository on GitHub</a>
            </h1>
            <p>{repo.description}</p>
            {(repo.languages) ? <div className="languages">{Object.keys(repo.languages).map(key => <div key={key} className={`lang ${key}`}>{key}</div>)}</div> : false}
            <Link to={`/user/${repo.owner.login}`} className="user_block">
                <div className="name">by <b>{repo.owner.login}</b>
                    <img src={repo.owner.avatar_url} alt={repo.owner.login} width="50" />
                </div>
            </Link>

            <h2>Files</h2>
            <div className="file_list">
                {repo.contents.length > 0 ? repo.contents.sort(SORTS.FILE_SORT).map(i => <FileItem key={i.sha} {...i} repoName={repo.full_name} />) : 'Empty Folder'}
            </div>

            {(repo.readMe && repo.readMe.length > 0) ? <div className="readme" dangerouslySetInnerHTML={repo.readMe.toHtml()}></div> : false}


        </div> : false
    }
}

export default connect(store => ({
    user: store.user,
    repo: store.repo
}),
    dispatch => ({
        getRepo: (repoName) => dispatch(actions.getRepo(repoName)),
        dispatch: dispatch

    }))(Repo) 