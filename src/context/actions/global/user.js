export const setUser = (store, user) => {
    store.setState({ user });
};

export const setOrganization = (store, val) => {
    store.setState({ setOrganization: val });
};

export const setOrganizationID = (store, val) => {
    store.setState({ orgID: val });
};

export const setSpeakers = (store, val) => {
    store.setState({ setSpeakers: val });
};

export const resetUser = (store) => {
    store.setState({user: null});
};