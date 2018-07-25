import GitHub from 'github-api'
import { Informer, UIBlocker } from '../utils'
import { AppStorage } from './'

export default class RepoStorage extends AppStorage {
    constructor() {
        super();
    }

    
    //    dispatch({repoName: repoName})
    

    getRepo(repoName, dispatch) { 
        let g = this.getGH()
        let receivedRepo = g.getRepo(repoName)
        receivedRepo.getDetails()
            .then(result => {
                result.data.created_at = new Date(result.data.created_at).toDateString()
                dispatch(result.data)
            
                fetch(`${result.data.languages_url}?access_token=${this.token}`)
                    .then(response => {return response.json()})
                    .then(data => dispatch({ languages: data }))
                    .catch(error => dispatch({ languages: {} }))
                
        })
        .catch(error => {if (error.message.indexOf('404') > -1 && top.location.hash.indexOf('404') < 0) Informer.inform('This repo was not found')})
    
    
        receivedRepo.getContents('master', '', false)
            .then(result => {
                dispatch({ contents: result.data })
                receivedRepo.getReadme('master', false)
                    .then(result => dispatch({content: atob(result.data.content) }))
                    .catch(error => dispatch({ content: '' }))
            })
            .catch(error => { dispatch({ contents: [] }); dispatch({ readme: '' }); })
    }
}