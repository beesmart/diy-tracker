import { createContext } from 'react';
import { useState, useContext } from 'react';

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    jobs: [],
    setCurrentUser: () => {},
    setUserToken: () => {}
});

const tmpJobs = [
    {
        "id": 1,
        "image_url": "https:\/\/api.yoursurveys.xyz\/images\/vJutXzn02CDwdOyh.png",
        "title": "Job 1",
        "slug": "jobs1",
        "status": true,
        "priorty": "low",
        "est_cost": "100.00",
        "description": "Test desription.",
        "created_at": "2022-01-07 13:23:41",
        "updated_at": "2022-01-18 16:34:19",
        "expire_date": "2022-01-23",
        "attachments": ["https:\/\/api.yoursurveys.xyz\/images\/vJutXzn02CDwdOyh.png", "https:\/\/api.yoursurveys.xyz\/images\/vJutXzn02CDwdOyh.png"],
        "tasks": [
          {
            "id": 15,
            "type": "text",
            "title": "Task name",
            "description": null
          }
        ]
      },
      {
        "id": 2,
        "image_url": "https:\/\/api.yoursurveys.xyz\/images\/gjIHElz4aKrL0nT0.png",
        "title": "Job 2",
        "slug": "job2",
        "status": true,
        "priorty": "high",
        "est_cost": "65.50",
        "description": "Test 2.",
        "created_at": "2022-01-07 08:50:40",
        "updated_at": "2022-01-07 13:37:37",
        "expire_date": "2022-02-01",
        "attachments": ["https:\/\/api.yoursurveys.xyz\/images\/vJutXzn02CDwdOyh.png", "https:\/\/api.yoursurveys.xyz\/images\/vJutXzn02CDwdOyh.png"],
        "tasks": []
      }
]


export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState( localStorage.getItem('TOKEN') || '');
    const [jobs, setJobs] = useState( tmpJobs );

    const setUserToken = (token) => {
      if (token) {
        localStorage.setItem('TOKEN', token);
      } else {
        localStorage.removeItem('TOKEN');
      }
      _setUserToken(token);
    }
    
    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            jobs
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);