const GET_REVIEWS = 'getReviews';
const ADD_REVIEW = 'addReview';
const EDIT_REVIEW = 'editReview';
const DELETE_REVIEW = 'deleteReview'

const getReviews = (productId, data) => ({
  type: GET_REVIEWS,
  productId,
  payload: data,
})

const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review
})
const editReview = (data) => ({
  type: EDIT_REVIEW,
  payload: data
})
const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  payload: review
})

export const getReviewsByProductId = (productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}/reviews`)
  if (response.ok) {
    const data = await response.json()
    if (data.errors) {
      console.log(' ')
    }
    dispatch(getReviews(productId, data))
  }
};

export const createReview = (productId, reviewData) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}/create-review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addReview(data));
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create a review")
  }

}
export const updateReview = (productId, reviewData) => async (dispatch) => {
  // console.log('REVIEW DATA: ', reviewData)
  const response = await fetch(`/api/reviews/${productId}/edit-review/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  // console.log('RESPONSE: ', response)
  if (response.ok) {
    const data = await response.json();
    // console.log('DATA: ', data)
    dispatch(editReview(data));
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to edit this review")
  }
}

export const removeReview = (productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}/delete-review`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const review = await response.json()
    dispatch(deleteReview(review));
  }
}

const initialState = {}

function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return { ...state, reviews: action.payload };
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.payload] };
    case EDIT_REVIEW:
      return { ...state, editedReview: action.payload }
    case DELETE_REVIEW:
      return { ...state, deletedReview: action.payload}
    default:
      return state;
  }
}

export default reviewsReducer
