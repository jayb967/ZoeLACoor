import React from 'react';
import useGlobalHook from '../logic'
import * as actions from '../../actions/global';

const initialState = {
    user: null,
    setOrganization: false,
    setSpeakers: [], 
    orgID: ''
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
