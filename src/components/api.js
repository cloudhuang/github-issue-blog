import axios from 'axios'
import config from '../../config'

export const getIssues = (page) => {
    return axios.get(`https://api.github.com/repos/` + config.username + `/` + config.repository + `/issues`, { params: { page } })
}

export const getIssue = (number) => {
    return axios.get(`https://api.github.com/repos/` + config.username + `/` + config.repository + `/issues/` + number, {})
}