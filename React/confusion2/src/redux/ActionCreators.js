import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT, 
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Erro Comments ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())    
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post Comments!', error.message); alert('Comment error: \n' + error.message); });
}

// A thunk to fetch the dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    
    // FETCH
    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Erro Dishes ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())    
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// FETCH COMMENTS
export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Erro Comments ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// FETCH PROMOS
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Erro Promos ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});


// Assignment 4 - Fetch Leaders
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            console.log('FOI MEU CONSAGRADOR!');
            return response;
        } else {
            var error = new Error('Erro Leaders ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});


export const postFeedback = (feedback) => (dispatch) => {
    const newFeedback = Object.assign({ date: new Date().toISOString() }, feedback);

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            alert(JSON.stringify(feedback));
            return response;
        } else {
            var error = new Error('Erro Feedback POST ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())    
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post Feedback!', error.message); alert('Feedback error: \n' + error.message); });
}
